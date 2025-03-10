# Response

The `Response` object in AIScript represents an HTTP response and provides control over status codes, headers, cookies, and the response body.

## Constructor

### response()

Creates a new Response object with customizable properties.

#### Syntax

```js
response(status_code=<number>, body=<any>, headers=<object>, cookies=<object>)
```

#### Parameters

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `status_code` | Number | HTTP status code (100-599) | 200 |
| `body` | Any | Response body (can be string, object, array, etc.) | nil |
| `headers` | Object | HTTP headers as key-value pairs | {} |
| `cookies` | Object | Cookies as key-value pairs | {} |

#### Returns

A new `Response` object.

#### Example

```js
let response = response(
    status_code=200,
    body={"message": "Success"},
    headers={"Content-Type": "application/json"},
    cookies={"session": "abc123"}
);
```

#### Exceptions

- Throws an error if `status_code` is not between 100 and 599
- Throws an error if `headers` is not an object
- Throws an error if `cookies` is not an object

## Properties

### response.status_code

The HTTP status code of the response.

#### Type

Number

#### Example

```js
let response = response(status_code=404);
print(response.status_code);  // 404
```

### response.body

The body content of the response.

#### Type

Any (string, object, array, number, boolean, nil)

#### Example

```js
let response = response(body="Hello World");
print(response.body);  // "Hello World"
```

### response.headers

HTTP headers to be sent with the response.

#### Type

Object (key-value pairs)

#### Example

```js
let response = response(headers={"Content-Type": "text/plain"});
print(response.headers["Content-Type"]);  // "text/plain"
```

### response.cookies

Cookies to be set in the response.

#### Type

Object (key-value pairs)

#### Example

```js
let response = response(cookies={"user": "john"});
print(response.cookies["user"]);  // "john"
```

## Helper Functions

### temporary_redirect()

Creates a response with a 307 Temporary Redirect status and the specified target URL.

#### Syntax

```js
temporary_redirect(target=<string>)
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `target` | String | The URL to redirect to |

#### Returns

A `Response` object with status code 307 and appropriate headers.

#### Example

```js
return temporary_redirect(target="/new-location");
```

### permanent_redirect()

Creates a response with a 308 Permanent Redirect status and the specified target URL.

#### Syntax

```js
permanent_redirect(target=<string>)
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `target` | String | The URL to redirect to |

#### Returns

A `Response` object with status code 308 and appropriate headers.

#### Example

```js
return permanent_redirect(target="/new-permanent-location");
```

## Common Status Codes

For convenience, here are common HTTP status codes you might use:

| Code | Description |
|------|-------------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 405 | Method Not Allowed |
| 409 | Conflict |
| 422 | Unprocessable Entity |
| 429 | Too Many Requests |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

## Usage Examples

### JSON Response

```js
get /api/data {
    return response(
        status_code=200,
        body={"id": 123, "name": "Example"},
        headers={"Content-Type": "application/json"}
    );
}
```

### Error Response

```js
get /protected {
    if !is_authenticated() {
        return response(
            status_code=401,
            body={"error": "Authentication required"},
            headers={"WWW-Authenticate": "Basic"}
        );
    }
    
    // Continue with authenticated access
}
```

### File Download

```js
get /download {
    return response(
        body=file_content,
        headers={
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=\"document.pdf\"",
            "Content-Length": str(file_size)
        }
    );
}
```

### Setting Cookies

```js
post /login {
    return response(
        status_code=200,
        body={"status": "logged_in"},
        cookies={
            "session": "abc123",
        }
    );
}
```

### No Content Response

```js
delete /api/resource/:id {
    path {
        id: str
    }
    
    delete_resource(id);
    return response(status_code=204);  // No content
}
```