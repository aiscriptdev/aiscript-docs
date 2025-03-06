# Project

Building web applications is rarely a single-file endeavor. AIScript provides a structured project system to help you organize your code efficiently.

## Creating a New Project

Let's create a new project with the AIScript CLI:

```bash
$ aiscript new my-project
```

This command creates a new project named `my-project` in the current directory.

```bash
$ cd my-project

$ tree
my-project
├── lib/
├── migrations/
├── routes/
└── project.toml
```

## Project Structure

AIScript follows the **"convention over configuration"** principle. This means that by following standard directory structures, you can minimize the amount of configuration needed. The default project structure is as follows:

### project.toml

The `project.toml` file is a **TOML** configuration file for your project:

```toml
[project]
name = "my-project"
description = "My project"
version = "0.1.0"

[apidoc]
enabled = true
type = "redoc"
path = "/redoc"

[network]
host = "0.0.0.0"
port = 8000
```

You can configure project metadata, API documentation settings, network options, and more. For detailed configuration options, see [Configuration Reference](/reference/configuration/general).

### routes/

The `routes` directory contains route definition files. Each file in this directory can define multiple routes:

```
routes/
├── auth.ai        # Authentication routes
├── users.ai       # User management routes
└── products.ai    # Product routes
```

Example route file (`routes/users.ai`):

```js
get /api/users {
    // Return all users
}

get /api/users/<id:int> {
    // Return user by ID
}

post /api/users {
    // Create a new user
}
```

### lib/

The `lib` directory contains reusable library code. You can organize your application logic into modules that can be imported by your routes:

```
lib/
├── auth.ai        # Authentication utilities
├── db.ai          # Database helpers
└── validation.ai  # Validation functions
```

Example library file (`lib/auth.ai`):

```js
fn validate_token(token: str) -> bool {
    // Token validation logic
    return true;
}

fn get_user_from_token(token: str) -> object {
    // Extract user information from token
    return { id: 1, name: "John" };
}
```

Using library code in routes:

```js
// routes/auth.ai
use lib.auth;

post /api/login {
    // Login logic
}

get /api/profile {
    let token = header.Authorization;
    if !auth.validate_token(token) {
        return response(status_code=401, body={"error": "Invalid token"});
    }
    
    let user = auth.get_user_from_token(token);
    return user;
}
```

### migrations/

The `migrations` directory contains SQL migration files for database schema changes:

```
migrations/
├── 001_create_users.sql
├── 002_create_products.sql
└── 003_add_user_roles.sql
```

Example migration file (`migrations/001_create_users.sql`):

```sql
-- Up migration
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Project Commands

The AIScript CLI provides several commands to manage your project:

```bash
# Start the development server
$ aiscript serve

# Run migrations
$ aiscript migrate up

# Roll back migrations
$ aiscript migrate down

```

For more information, refer to the [Command Reference](/reference/cli).

## Environment Variables

AIScript supports environment variables for configuration. Create a `.env` file in your project root:

```
# .env
DATABASE_URL=postgres://user:password@localhost/mydb
JWT_SECRET=your-secret-key
PORT=8080
```

Access environment variables in your code:

```js
let port = $PORT;
let db_url = $DATABASE_URL;
```

## Project Configuration

The `project.toml` file supports various configuration options:

### General Configuration

```toml
[project]
name = "my-project"
description = "My awesome project"
version = "1.0.0"
```

### Network Configuration

```toml
[network]
host = "0.0.0.0"
port = 8080
```

### Database Configuration

```toml
[database]
url = "postgres://user:password@localhost/mydb"
pool_size = 10
```

### API Documentation

```toml
[apidoc]
enabled = true
type = "swagger"
path = "/docs"
title = "My API"
version = "1.0.0"
```

### Middleware Configuration

```toml
[middleware]
global = ["lib/middleware.ai:logger", "lib/middleware.ai:error_handler"]

[middleware.cors]
allowed_origins = ["http://localhost:3000"]
allowed_methods = ["GET", "POST", "PUT", "DELETE"]
```

## Project Structure Best Practices

1. **Route Organization**: Group related routes in the same file (e.g., `users.ai` for all user-related routes).
2. **Modular Code**: Extract reusable logic to the `lib` directory.
3. **Environment Configuration**: Use environment variables for configuration that changes between environments.
4. **Migration Versioning**: Number migrations sequentially to ensure they're applied in the correct order.
5. **Middleware Separation**: Define middleware in dedicated files for clarity.

By following these conventions and best practices, you can build well-organized, maintainable AIScript applications that scale with your needs.