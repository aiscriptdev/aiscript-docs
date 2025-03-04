# response

The builtin `response` functions to create HTTP response objects with various configurations.

## response(status_code: number, body: any, headers: object, cookies: object)

Creates a new Response instance with the given status code, body, headers, and cookies.

**Parameters**:
- `status_code`: The HTTP status code (default is 200).
- `body`: The response body, which can be any value.
- `headers`: An object representing the HTTP headers.
- `cookies`: An object representing the cookies.

**Return Type**: `Response`

**Example**:
```rust
let res = response(status_code=200, body="Hello, World!", headers={}, cookies={});
```

## temporary_redirect(target: string)

Creates a temporary redirect (307) response with the specified target URL.

**Parameters**:
- `target`: The URL to redirect to.

**Return Type**: `Response`

**Example**:
```rust
let res = temporary_redirect(target="/new-url");
```

## permanent_redirect(target: string)

Creates a permanent redirect (308) response with the specified target URL.

**Parameters**:
- `target`: The URL to redirect to.

**Return Type**: `Response`

**Example**:
```rust
let res = permanent_redirect(target="/new-url");
```