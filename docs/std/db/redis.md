# std.db.redis

The `std.db.redis` module provides functions for interacting with Redis databases, including direct command execution and pipeline operations.

## Core Functions

### cmd(command: string, ...args: any)

Executes a Redis command and returns the result.

**Parameters**:
- `command`: The Redis command string (e.g., "SET mykey value")
- `args`: Optional additional arguments for the command

**Return Type**: `any` (depends on Redis command)

**Example**:
```rust
use std.db.redis;

// Set a key
redis.cmd("SET mykey somevalue");

// Get a key
let value = redis.cmd("GET mykey");
print(value); // "somevalue"

// Get list elements
let lists = redis.cmd("LRANGE mylist 0 -1");
print(lists); // Array of list elements
```

### pipeline()

Creates a new Redis pipeline for executing multiple commands atomically.

**Return Type**: `Pipeline` object

**Pipeline Methods**:
- `cmd(command: string, ...args: any)` - Adds a command to the pipeline
- `exec()` - Executes all commands in the pipeline
- `discard()` - Discards the pipeline without executing

**Example**:
```rust
use std.db.redis;

// Create pipeline
let p = redis.pipeline();

// Add commands
p.cmd("SET k1 v1");
p.cmd("SET k2 v2");
p.cmd("GET k1");

// Execute pipeline
let results = p.exec();
print(results); // ["OK", "OK", "v1"]

// Alternatively, discard pipeline
// p.discard();
```

## Usage Examples

### Basic Key Operations
```rust
use std.db.redis;

// Set and get values
redis.cmd("SET username alice");
let name = redis.cmd("GET username");
print(name); // "alice"

// Increment counter
redis.cmd("INCR counter");
let count = redis.cmd("GET counter");
print(count); // "1"
```

### List Operations
```rust
use std.db.redis;

// Push to list
redis.cmd("RPUSH mylist item1");
redis.cmd("RPUSH mylist item2");

// Get all list items
let items = redis.cmd("LRANGE mylist 0 -1");
print(items); // ["item1", "item2"]
```

### Hash Operations
```rust
use std.db.redis;

// Set hash fields
redis.cmd("HSET user:1000 name Alice age 30");

// Get hash field
let name = redis.cmd("HGET user:1000 name");
print(name); // "Alice"

// Get all hash fields
let user = redis.cmd("HGETALL user:1000");
print(user); // {"name": "Alice", "age": "30"}
```

### Set Operations
```rust
use std.db.redis;

// Add to set
redis.cmd("SADD myset item1");
redis.cmd("SADD myset item2");

// Get set members
let members = redis.cmd("SMEMBERS myset");
print(members); // ["item1", "item2"]
```

### Pipeline Example
```rust
use std.db.redis;

// Create pipeline
let p = redis.pipeline();

// Add multiple commands
p.cmd("SET user:1:name Alice");
p.cmd("SET user:1:age 30");
p.cmd("GET user:1:name");

// Execute and get results
let results = p.exec();
print(results); // ["OK", "OK", "Alice"]
```

### Error Handling
```rust
use std.db.redis;

try {
    // Attempt invalid command
    redis.cmd("INVALIDCOMMAND");
} catch (e) {
    print(`Redis error: ${e.message}`);
}
```

### Transaction Example
```rust
use std.db.redis;

// Start transaction
redis.cmd("MULTI");

// Add commands
redis.cmd("SET key1 value1");
redis.cmd("SET key2 value2");

// Execute transaction
let results = redis.cmd("EXEC");
print(results); // ["OK", "OK"]
```

### Expiration Example
```rust
use std.db.redis;

// Set key with expiration
redis.cmd("SET mykey value EX 60"); // Expires in 60 seconds

// Check TTL
let ttl = redis.cmd("TTL mykey");
print(ttl); // 60 (or less, depending on when checked)
```

### Complex Pipeline
```rust
use std.db.redis;

// Create pipeline for user registration
let p = redis.pipeline();

// Add user data
p.cmd("HSET user:1000 name Alice age 30 email alice@example.com");

// Add to users set
p.cmd("SADD users 1000");

// Get all user data
p.cmd("HGETALL user:1000");

// Execute pipeline
let results = p.exec();
print(results); // [1, 1, {"name": "Alice", "age": "30", "email": "alice@example.com"}]
```

### Sorted Set Operations
```rust
use std.db.redis;

// Add to sorted set
redis.cmd("ZADD myzset 1 item1");
redis.cmd("ZADD myzset 2 item2");

// Get sorted set members
let members = redis.cmd("ZRANGE myzset 0 -1");
print(members); // ["item1", "item2"]
```

### Pub/Sub Example
```rust
use std.db.redis;

// Publish message
redis.cmd("PUBLISH mychannel 'Hello World'");

// Note: Subscribe would be handled in a separate process
// redis.cmd("SUBSCRIBE mychannel");
```