# std.db.pg

The `std.db.pg` module provides functions for interacting with PostgreSQL databases, including executing queries, handling transactions, and mapping results to objects.

## Core Functions

## query(sql: string, ...bindings: any)

Executes a SQL query and returns the results as an array of objects.

**Parameters**:
- `sql`: The SQL query string
- `bindings`: Optional parameters to bind to the query

**Return Type**: `Array<Object>`

**Example**:
```rust
use std.db.pg;

let results = pg.query("SELECT * FROM users WHERE age > $1", 18);
// Returns an array of objects representing the query results
```

## query_as(class: Class, sql: string, ...bindings: any)

Executes a SQL query and maps the results to instances of the specified class.

**Parameters**:
- `class`: The class to map results to
- `sql`: The SQL query string
- `bindings`: Optional parameters to bind to the query

**Return Type**: `Array<Instance>`

**Example**:
```rust
use std.db.pg;

class User {
    id: number;
    name: string;
    age: number;
}

let users = pg.query_as(User, "SELECT * FROM users WHERE age > $1", 18);
// Returns an array of User instances
```

## begin_transaction()

Starts a new database transaction. Returns a Transaction object that provides methods for executing queries within the transaction.

**Return Type**: `Transaction`

**Example**:
```rust
use std.db.pg;

let tx = pg.begin_transaction();
// Returns a Transaction object
```

## Transaction Methods

The following methods are available on Transaction objects returned by `begin_transaction()`.

### query(sql: string, ...bindings: any)

Executes a SQL query within the transaction and returns the results as an array of objects.

**Parameters**:
- `sql`: The SQL query string
- `bindings`: Optional parameters to bind to the query

**Return Type**: `Array<Object>`

**Example**:
```rust
use std.db.pg;

let tx = pg.begin_transaction();
let results = tx.query("SELECT * FROM users WHERE age > $1", 18);
```

### query_as(class: Class, sql: string, ...bindings: any)

Executes a SQL query within the transaction and maps the results to instances of the specified class.

**Parameters**:
- `class`: The class to map results to
- `sql`: The SQL query string
- `bindings`: Optional parameters to bind to the query

**Return Type**: `Array<Instance>`

**Example**:
```rust
use std.db.pg;

class User {
    id: number;
    name: string;
    age: number;
}

let tx = pg.begin_transaction();
let users = tx.query_as(User, "SELECT * FROM users WHERE age > $1", 18);
```

### commit()

Commits the transaction, saving all changes made within the transaction.

**Return Type**: `nil`

**Example**:
```rust
use std.db.pg;

let tx = pg.begin_transaction();
// Execute queries...
tx.commit();
```

### rollback()

Rolls back the transaction, discarding all changes made within the transaction.

**Return Type**: `nil`

**Example**:
```rust
use std.db.pg;

let tx = pg.begin_transaction();
// Execute queries...
tx.rollback();
```

## Usage Examples

### Basic Query Example

```rust
use std.db.pg;

// Simple query
let users = pg.query("SELECT * FROM users WHERE age > $1", 18);

// Iterate through results
for user in users {
    print(user.name);
}
```

### Transaction Example

```rust
use std.db.pg;

// Start transaction
let tx = pg.begin_transaction();

// Update user balance
tx.query("UPDATE users SET balance = balance - $1 WHERE id = $2", 100, 123);

// Insert transaction record
tx.query("INSERT INTO transactions (user_id, amount) VALUES ($1, $2)", 123, -100);

// Commit if successful
tx.commit();
```

### Typed Query Example

```rust
use std.db.pg;

// Define user class
class User {
    id: number;
    name: string;
    email: string;
}

// Query users and map to class
let users = pg.query_as(User, "SELECT * FROM users WHERE active = true");

// Access typed properties
for user in users {
    print(`${user.name} <${user.email}>`);
}
```

### Parameter Binding Example

```rust
use std.db.pg;

// Query with different parameter types
let results = pg.query(
    "SELECT * FROM users WHERE name = $1 AND age > $2 AND active = $3",
    "John",  // string
    25,      // number
    true     // boolean
);
```

### Array Parameter Example

```rust
use std.db.pg;

// Query with array parameter
let user_ids = [1, 2, 3, 4];
let users = pg.query("SELECT * FROM users WHERE id = ANY($1)", user_ids);
```

### Date Parameter Example

```rust
use std.db.pg;

// Query with date parameter
let users = pg.query(
    "SELECT * FROM users WHERE created_at > $1",
    "2023-01-01"  // Date string in YYYY-MM-DD format
);
```
