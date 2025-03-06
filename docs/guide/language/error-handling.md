# Error Handling

AIScript provides a robust and elegant error handling system inspired by modern languages like Rust and Zig, while maintaining simplicity for developers. This approach allows you to write code that explicitly handles potential failures without resorting to exception hierarchies or complex try-catch blocks.

## Error Types

In AIScript, errors are represented using enum or class with a special `!` suffix:

```js
enum FileError! {
    NotFound,
    PermissionDenied,
    InvalidFormat,
}

class SyntaxError! {
    message: str,
    line: int,
}
```

This syntax clearly communicates that an enum or class is meant to represent error cases.

## Declaring Functions with Error Types

Functions that can fail should declare their potential error types in the return signature using the pipe (`|`) operator:

```rust
fn read_file(path: str) -> str | FileError! {
    // Implementation that might fail...
}
```

This return type specifies that the function returns either a string or a `FileError!`.

```rust
fn read_file(path: str) -> str | FileError! | IoError! {
}
```

For multiple error types, use the`|` to seperate them.

## Raising Errors

Use the `raise` keyword to signal an error from a function:

```rust
fn read_file(path: str) -> str | FileError! {
    if !file_exists(path) {
        raise FileError!::NotFound;
    }
    
    if !has_permission(path) {
        raise FileError!::PermissionDenied;
    }
    
    let content = read_file_contents(path);
    if !is_valid_format(content) {
        raise FileError!::InvalidFormat;
    }
    
    return content;
}
```

## Handling Errors

AIScript provides three main ways to handle errors:

### Error Handler

The error handler syntax uses the pipe (`|err|`) syntax followed by a code block:

```rust
let content = read_file("config.json") |err| {
    match err {
        FileError!::NotFound => {
            print("File not found, using default config");
            "{}"  // Default empty config
        },
        FileError!::PermissionDenied => {
            print("Permission denied, please check file permissions");
            "{}"
        },
        FileError!::InvalidFormat => {
            print("Invalid file format");
            "{}"
        }
    }
};

// content is guaranteed to be a string here
print("Config loaded:", content");
```

The error handler receives the error as a parameter and must return a value of the same type as the success case.

### Error Propagation

For functions that might fail with similar error types, you can use the `?` operator to immediately return errors to the caller:

```rust
fn load_configuration() -> str | FileError! {
    let file_content = read_file("config.json")?;  // Propagate error
    let config = parse_json(file_content)?;  // Propagate error
    return config;
}

// Usage
let config = load_configuration() |err| {
    print("Error loading configuration: {err}");
    {} // Default empty config
};
```

When a function call with `?` returns an error, the current function immediately returns with that error.

## Best Practices

1. **Be specific with error types**: Create domain-specific error types for different categories of errors
2. **Provide meaningful error information**: Include relevant details in error variants
3. **Handle errors close to their source**: When possible, handle errors where you have the context to do so
4. **Use the `?` operator for error propagation**: It makes code cleaner when functions call other functions that might fail
5. **Consider using default values**: For non-critical errors, providing sensible defaults can improve resilience

AIScript's error handling system strikes a balance between robustness and simplicity. By making errors explicit in function signatures and providing elegant ways to handle them, it helps you write more reliable and maintainable code.