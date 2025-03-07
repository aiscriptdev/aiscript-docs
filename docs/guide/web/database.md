# Database

AIScript provides native database integration with type-safe queries and comprehensive drivers for several database systems. This chapter covers how to use the database modules to interact with PostgreSQL, SQLite, and Redis.

## Connection Configuration

Database connections are configured in your project's `project.toml` file:

```toml
[database.postgresql]
url = "postgresql://username:password@localhost:5432/mydb"

[database.sqlite]
url = "sqlite://my_database.db"

[database.redis]
url = "redis://localhost:6379"
password = "optional_password"
```

## PostgreSQL Integration

The PostgreSQL module provides a robust interface for working with PostgreSQL databases.

### Basic Queries

```rust
// Import postgres module from std library
use std.db.pg;

// Simple query with a parameter
let result = pg.query("SELECT * FROM users WHERE id = $1;", 42);
print(result);

// Insert data and return the inserted row
let new_language = pg.query(
    "INSERT INTO languages (name, created_year) VALUES($1, $2) RETURNING id, name;", 
    "AIScript", 2024
);
print(new_language); // [{id: 1, name: "AIScript"}]
```

### Type-Safe Queries with Classes

AIScript allows mapping query results to typed objects for type-safe data access:

```rust
use std.db.pg;

// Define a class representing the database table
class Language {
    id: int,
    name: str,
    created_year: int
}

// Query results are mapped to Language instances
let languages = pg.query_as(Language, "SELECT id, name, created_year FROM languages WHERE created_year > $1;", 2000);

// Now languages is an array of Language objects
print(languages);
```

### Transactions

AIScript supports database transactions for executing multiple operations atomically:

```rust
use std.db.pg;

// Begin a transaction
let tx = pg.begin_transaction();

// Execute multiple operations within the transaction
tx.query("INSERT INTO users (name, email) VALUES($1, $2);", "Alice", "alice@example.com") |err| {
    print(f"Transaction failed: {err}");
    tx.rollback();
    return;
};
tx.query("INSERT INTO user_roles (user_id, role) VALUES(LASTVAL(), 'admin');") |err| {
    print(f"Transaction failed: {err}");
    tx.rollback();
    return;
};

// Commit the transaction if all operations succeed
tx.commit();

print("Transaction successed");
```

<!-- ### Prepared Statements

For queries that are executed frequently, prepared statements improve performance:

```rust
use std.db.pg;

// Create a prepared statement
let stmt = pg.prepare("SELECT * FROM products WHERE category = $1 AND price < $2;");

// Execute with different parameters
let electronics = stmt.execute("electronics", 1000);
let clothing = stmt.execute("clothing", 50);
``` -->

## SQLite Integration

SQLite provides a lightweight database solution that doesn't require a separate server.

### Basic SQLite Operations

```rust
use std.db.sqlite;

// Create a table
sqlite.query("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, title TEXT, content TEXT);");

// Insert data
sqlite.query("INSERT INTO notes (title, content) VALUES($1, $2);", "Meeting Notes", "Discuss new features");

// Query data
let notes = sqlite.query("SELECT * FROM notes;");
print(notes);
```

### SQLite Transactions

```rust
use std.db.sqlite;

let tx = sqlite.begin_transaction();

tx.query("INSERT INTO notes (title, content) VALUES($1, $2);", "Note 1", "Content 1") |err| {
    print(f"Transaction failed: {err}");
    tx.rollback();
    return;
};
tx.query("INSERT INTO notes (title, content) VALUES($1, $2);", "Note 2", "Content 2") |err| {
    print(f"Transaction failed: {err}");
    tx.rollback();
    return;
};

tx.commit();
print("Transaction failed");
```

## Redis Integration

The Redis module provides access to Redis data structures and operations.

### Basic Redis Commands

```rust
use std.db.redis;

// Set a key
redis.cmd("SET user:1 Alice");

// Get a key
let user = redis.cmd("GET user:1");
print(user); // "Alice"

// Working with hash data
redis.cmd("HSET user:2 name Bob age 30 email bob@example.com");
let name = redis.cmd("HGET user:2 name");
let all_fields = redis.cmd("HGETALL user:2");
print(name); // "Bob"
print(all_fields); // {name: "Bob", age: "30", email: "bob@example.com"}
```

### Redis Pipelines

Redis pipelines allow sending multiple commands in a single round-trip, improving performance:

```rust
use std.db.redis;

// Create a pipeline
let p = redis.pipeline();

// Add commands to the pipeline
p.cmd("SET counter 1");
p.cmd("INCR counter");
p.cmd("INCR counter");
p.cmd("GET counter");

// Execute all commands in one round-trip
let results = p.exec();
print(results); // ["OK", 2, 3, "3"]
```

### Redis Lists

```rust
use std.db.redis;

// Work with lists
redis.cmd("LPUSH mylist A B C");
redis.cmd("RPUSH mylist D E F");
let list = redis.cmd("LRANGE mylist 0 -1");
print(list); // ["C", "B", "A", "D", "E", "F"]
```

### Redis Sets

```rust
use std.db.redis;

// Work with sets
redis.cmd("SADD myset apple banana orange");
redis.cmd("SADD anotherset banana kiwi");
let intersection = redis.cmd("SINTER myset anotherset");
print(intersection); // ["banana"]
```
