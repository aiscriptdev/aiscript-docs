# Middleware

Middleware in AIScript provides a powerful way to process HTTP requests and responses. Middleware functions are executed in a sequence, allowing you to modify requests, validate authentication, log activities, and more before a route handler is invoked.

## CORS

Controls Cross-Origin Resource Sharing settings.

```toml
# project.toml

[middleware.cors]
allowed_origins = ["http://localhost:3000", "https://example.com"]
allowed_methods = ["GET", "POST", "PUT", "DELETE"]
allowed_headers = ["Content-Type", "Authorization"]
allow_credentials = true
max_age = 86400
```

### Options

| Option              | Type    | Description                                               | Default                                       |
| ------------------- | ------- | --------------------------------------------------------- | --------------------------------------------- |
| `allowed_origins`   | Array   | List of origins that are allowed to access the resource   | `["*"]`                                       |
| `allowed_methods`   | Array   | HTTP methods allowed                                      | `["GET", "POST", "PUT", "DELETE", "OPTIONS"]` |
| `allowed_headers`   | Array   | HTTP headers allowed                                      | `["Content-Type", "Authorization"]`           |
| `allow_credentials` | Boolean | Indicates if cookies can be included in requests          | `false`                                       |
| `max_age`           | Number  | How long the results of a preflight request can be cached | `86400` (24 hours)                            |

## Rate Limit

Limits the number of requests a client can make within a specified time period.

```toml
# project.toml

[middleware.rate_limit]
limit = 100
window = 60  # in seconds
message = "Too many requests, please try again later."
```

### Options

| Option          | Type   | Description                                                             | Default               |
| --------------- | ------ | ----------------------------------------------------------------------- | --------------------- |
| `limit`         | Number | Maximum number of requests allowed                                      | `100`                 |
| `window`        | Number | Time window in seconds                                                  | `60`                  |
| `message`       | String | Message to return when rate limit is exceeded                           | `"Too many requests"` |
| `key_extractor` | String | Function to extract the rate limit key (e.g., "ip", "header:X-API-Key") | `"ip"`                |

## Body Limit

Limits the size of request bodies.

```toml
# project.toml

[middleware.body_limit]
limit = "1mb"
```

### Options

| Option  | Type   | Description                                         | Default |
| ------- | ------ | --------------------------------------------------- | ------- |
| `limit` | String | Maximum size of request body (e.g., "1mb", "500kb") | `"1mb"` |

## Timeout

Sets a timeout for handling requests.

```toml
# project.toml

[middleware.timeout]
duration = 5000  # in milliseconds
message = "Request timeout"
```

### Options

| Option     | Type   | Description                           | Default             |
| ---------- | ------ | ------------------------------------- | ------------------- |
| `duration` | Number | Timeout in milliseconds               | `5000`              |
| `message`  | String | Message to return when timeout occurs | `"Request timeout"` |

## Compression

Compresses response bodies.

```toml
# project.toml

[middleware.compression]
level = 6  # compression level (1-9)
threshold = 1024  # minimum size to compress
```

### Options

| Option      | Type   | Description                       | Default                                                              |
| ----------- | ------ | --------------------------------- | -------------------------------------------------------------------- |
| `level`     | Number | Compression level (1-9)           | `6`                                                                  |
| `threshold` | Number | Minimum size in bytes to compress | `1024`                                                               |
| `types`     | Array  | Content types to compress         | `["text/plain", "text/html", "application/json", "application/xml"]` |

## Security Headers

Adds security-related HTTP headers to responses.

```toml
# project.toml

[middleware.security_headers]
xss_protection = "1; mode=block"
content_security_policy = "default-src 'self'"
```

### Options

| Option                    | Type   | Description                          | Default                        |
| ------------------------- | ------ | ------------------------------------ | ------------------------------ |
| `xss_protection`          | String | X-XSS-Protection header value        | `"1; mode=block"`              |
| `content_type_options`    | String | X-Content-Type-Options header value  | `"nosniff"`                    |
| `frame_options`           | String | X-Frame-Options header value         | `"SAMEORIGIN"`                 |
| `content_security_policy` | String | Content-Security-Policy header value | `"default-src 'self'"`         |
| `referrer_policy`         | String | Referrer-Policy header value         | `"no-referrer-when-downgrade"` |
