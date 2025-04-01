# Response

In AIScript, the `Response` object provides a flexible way to control HTTP responses from your routes. This object gives you complete control over status codes, response bodies, headers, and cookies.

## Basic Usage

The most basic way to create a response is to simply return a value from a route:

```js
get /hello {
    return "Hello, World!";
}
```

AIScript automatically converts this to a proper HTTP response with status code 200 and the appropriate content type.

## Creating Custom Responses

For more control, use the `Response` constructor:

```js
get /api/user {
    return response(
        status_code=200,
        body={"id": 1, "name": "Alice"},
        headers={"X-API-Version": "1.0"},
        cookies={"session": "abc123"}
    );
}
```

The `Response` constructor accepts the following parameters:

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `status_code` | Number | HTTP status code (100-599) | 200 |
| `body` | Any | Response body (can be string, object, array, etc.) | nil |
| `headers` | Object | HTTP headers as key-value pairs | {} |
| `cookies` | Object | Cookies as key-value pairs | {} |

## Status Codes

You can set any valid HTTP status code:

```js
get /not-found {
    return response(
        status_code=404,
        body="Resource not found"
    );
}

get /error {
    return response(
        status_code=500,
        body="Internal server error"
    );
}
```

## Response Body

The response body can be of any type:

```js
// String response
get /text {
    return response(body="Plain text response");
}

// JSON response (object automatically serialized to JSON)
get /json {
    return response(body={
        "id": 123,
        "name": "Product",
        "price": 29.99
    });
}

// Array response
get /array {
    return response(body=[1, 2, 3, 4, 5]);
}
```

## Headers

Set custom HTTP headers:

```js
get /api/data {
    return response(
        body={"data": "value"},
        headers={
            "Content-Type": "application/json",
            "X-API-Version": "2.0",
            "Cache-Control": "max-age=3600"
        }
    );
}
```

## Cookies

Set cookies in the response:

```js
get /login {
    return response(
        body="Login successful",
        cookies={
            "session": "abc123",
            "user": "john",
            "preferences": "dark-mode"
        }
    );
}
```

## Redirects

AIScript provides convenient functions for creating redirect responses:

### Temporary Redirect (307)

```js
get /old-page {
    return temporary_redirect(target="/new-page");
}
```

### Permanent Redirect (308)

```js
get /outdated {
    return permanent_redirect(target="/updated");
}
```

## Advanced Examples

### Conditional Response

```js
get /api/users/:id {
    path {
        id: str
    }
    
    use std.db.pg;
    
    let user = pg.query("SELECT * FROM users WHERE id = $1", path.id);
    
    if user == nil {
        return response(
            status_code=404,
            body={"error": "User not found"}
        );
    }
    
    return response(
        status_code=200,
        body=user,
        headers={"X-User-Id": str(id)}
    );
}
```

### File Download

```js
get /download {
    use std.io;
    
    let file_content = io.read_file("path/to/document.pdf");
    
    return response(
        body=file_content,
        headers={
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=\"document.pdf\""
        }
    );
}
```

### CORS Support

```js
get /api/data {
    return response(
        body={"message": "API data"},
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
    );
}
```

## Error Responses

AIScript automatically generates appropriate error responses for validation failures and exceptions, but you can also create custom error responses:

```js
get /api/resource {
    if !authorized() {
        return response(
            status_code=401,
            body={"error": "Unauthorized access"}
        );
    }
    
    if !resource_exists() {
        return response(
            status_code=404,
            body={"error": "Resource not found"}
        );
    }
    
    // Continue with normal processing...
}
```
