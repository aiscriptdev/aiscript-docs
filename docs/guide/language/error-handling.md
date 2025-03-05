# Error Handling

AIScript provides a robust and elegant error handling system inspired by modern languages like Rust and Zig, while maintaining simplicity for developers. This approach allows you to write code that explicitly handles potential failures without resorting to exception hierarchies or complex try-catch blocks.

## Error Types

In AIScript, errors are represented using enums with a special `!` suffix:

```js
enum FileError! {
    NotFound,
    PermissionDenied,
    InvalidFormat(str),
}
```

This syntax clearly communicates that an enum is meant to represent error cases.

## Declaring Functions with Error Types

Functions that can fail should declare their potential error types in the return signature using the pipe (`|`) operator:

```js
fn read_file(path: str) -> str | FileError! {
    // Implementation that might fail...
}
```

This return type specifies that the function returns either a string or a `FileError!`.

## Raising Errors

Use the `raise` keyword to signal an error from a function:

```js
fn read_file(path: str) -> str | FileError! {
    if !file_exists(path) {
        raise FileError!::NotFound;
    }
    
    if !has_permission(path) {
        raise FileError!::PermissionDenied;
    }
    
    let content = read_file_contents(path);
    if !is_valid_format(content) {
        raise FileError!::InvalidFormat("Invalid file format");
    }
    
    return content;
}
```

## Handling Errors

AIScript provides three main ways to handle errors:

### 1. Using the Error Handler Syntax

The error handler syntax uses the pipe (`|`) operator followed by a code block:

```js
let content = read_file("config.json") |err| {
    match err {
        FileError!::NotFound => {
            print("File not found, using default config");
            return "{}";  // Default empty config
        },
        FileError!::PermissionDenied => {
            print("Permission denied, please check file permissions");
            return "{}";
        },
        FileError!::InvalidFormat(msg) => {
            print("Invalid file format: {msg}");
            return "{}";
        }
    }
};

// content is guaranteed to be a string here
print("Config loaded: {content}");
```

The error handler receives the error as a parameter and must return a value of the same type as the success case.

### 2. Using the Propagation Operator (`?`)

For functions that might fail with similar error types, you can use the `?` operator to immediately return errors to the caller:

```js
fn load_configuration() -> object | FileError! {
    let file_content = read_file("config.json")?;  // Propagate error
    let config = parse_json(file_content)?;  // Propagate error
    return config;
}

// Usage
let config = load_configuration() |err| {
    print("Error loading configuration: {err}");
    return {}; // Default empty config
};
```

When a function call with `?` returns an error, the current function immediately returns with that error.

### 3. Match on Result Types

For more complex error handling logic, you can match on result types explicitly:

```js
fn process_file() -> str | FileError! {
    let result = read_file("data.txt");
    
    match result {
        str content => {
            // Process the content
            return "Processed: {content}";
        },
        FileError!::NotFound => {
            // Handle specific error
            raise FileError!::NotFound;
        },
        FileError! err => {
            // Handle any other error from FileError
            print("Error: {err}");
            raise err;
        }
    }
}
```

## Creating Custom Error Types

Create custom error types to represent domain-specific failures:

```js
enum ValidationError! {
    InvalidEmail(str),
    InvalidPassword {
        reason: str,
        score: int,
    },
    MissingField(str),
}

fn validate_user(user: object) -> bool | ValidationError! {
    if !user.email {
        raise ValidationError!::MissingField("email");
    }
    
    if !is_valid_email(user.email) {
        raise ValidationError!::InvalidEmail(user.email);
    }
    
    if !user.password {
        raise ValidationError!::MissingField("password");
    }
    
    let password_score = calculate_password_strength(user.password);
    if password_score < 50 {
        raise ValidationError!::InvalidPassword {
            reason: "Password too weak",
            score: password_score,
        };
    }
    
    return true;
}
```

## Combining Multiple Error Types

Functions can declare multiple potential error types:

```js
enum DatabaseError! {
    ConnectionFailed,
    QueryFailed(str),
}

fn save_user(user: object) -> bool | ValidationError! | DatabaseError! {
    // First validate the user
    validate_user(user)?;
    
    // Then attempt to save to database
    if !db_connected() {
        raise DatabaseError!::ConnectionFailed;
    }
    
    let result = db_insert("users", user);
    if !result.success {
        raise DatabaseError!::QueryFailed(result.message);
    }
    
    return true;
}
```

## Converting Between Error Types

You can convert between error types to provide more context:

```js
fn register_user(user_data: object) -> object | ValidationError! | DatabaseError! {
    let validated = validate_user(user_data)?;
    
    try {
        return db_create_user(validated);
    } catch (db_error) {
        // Convert database error to a more user-friendly error
        if db_error is DatabaseError!::ConnectionFailed {
            print("Database connection issue, please try again later");
            raise DatabaseError!::ConnectionFailed;
        }
        
        // Add context to the error
        raise DatabaseError!::QueryFailed("User registration failed: {db_error}");
    }
}
```

## Error Handling in Web APIs

AIScript's error handling is particularly useful for web APIs:

```js
enum ApiError! {
    NotFound(str),
    Unauthorized,
    BadRequest(str),
    InternalError,
}

get /users/:id {
    // Path parameters
    let user_id = params.id;
    
    // Try to get user from database
    let user = db.get_user(user_id) |err| {
        match err {
            DatabaseError!::ConnectionFailed => {
                return response(500, { error: "Database connection failed" });
            },
            _ => {
                return response(404, { error: "User not found" });
            }
        }
    };
    
    // Return user data
    return response(200, { user });
}
```

## Error Context and Debugging

Add context to errors to make debugging easier:

```js
enum AppError! {
    OperationFailed {
        operation: str,
        cause: str,
        context: object,
    }
}

fn process_data(data: array) -> array | AppError! {
    try {
        return transform_data(data);
    } catch (error) {
        // Add context to the error
        raise AppError!::OperationFailed {
            operation: "transform_data",
            cause: "{error}",
            context: {
                data_length: len(data),
                data_sample: data.slice(0, 5),
                timestamp: now(),
            }
        };
    }
}
```

## Best Practices

1. **Be specific with error types**: Create domain-specific error types for different categories of errors
2. **Provide meaningful error information**: Include relevant details in error variants
3. **Handle errors close to their source**: When possible, handle errors where you have the context to do so
4. **Use the `?` operator for error propagation**: It makes code cleaner when functions call other functions that might fail
5. **Consider using default values**: For non-critical errors, providing sensible defaults can improve resilience

AIScript's error handling system strikes a balance between robustness and simplicity. By making errors explicit in function signatures and providing elegant ways to handle them, it helps you write more reliable and maintainable code.