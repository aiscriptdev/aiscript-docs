# Request

Each route handler receives a `request` object that contains information about the incoming HTTP request.

## request.method

Returns the HTTP method of the request (GET, POST, PUT, DELETE, etc.)

```rust
get /echo {
    return f"Method: {request.method}";  // Returns "Method: GET"
}
```

## request.url

Returns the complete URL of the request.

```rust
get /info {
    return f"URL: {request.url}";  // Might return "URL: https://example.com/info?key=value"
}
```

## request.path

Returns the path portion of the URL.

```rust
get /path/info {
    return f"Path: {request.path}";  // Returns "Path: /path/info"
}
```

## request.scheme

Returns the scheme of the request (http or https).

```rust
get /scheme {
    return f"Scheme: {request.scheme}";  // Returns "Scheme: https" for secure requests
}
```

## request.host

Returns the host from the request.

```rust
get /host {
    return f"Host: {request.host}";  // Might return "Host: example.com"
}
```

## request.port

Returns the port number of the request.

```rust
get /port {
    return f"Port: {request.port}";  // Might return "Port: 443" for HTTPS
}
```
