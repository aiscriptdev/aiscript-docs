# Route

**Route** is the main entrypoint that handles an HTTP request. All routes are defined in the `routes` directory.

## Define a route

Define a route is simple and straightforward. The syntax is:

```
verb path [(arg1: type1, arg2: type2, ...)] {

}
```

The `verb` is the HTTP method:

| Verb | Description |
| --- | --- |
| `get` | GET request |
| `post` | POST request |
| `put` | PUT request |
| `delete` | DELETE request |
| `head` | HEAD request |

The `path` is the URL path.

```py
get /hello {
    return "Hello World";
}
```

```
$ curl http://localhost:8080/hello
Hello World
```

## Parse query string

```py
get /hello {
    query {
        @string(min_len=3, max_len=10)
        name: str = "Alice"
    }

    return "Hello, {name}!";
}
```

```bash
$ curl http://localhost:8080/hello?name=AIScript
Hello, AIScript!
```

Each field declared in the `query` block is a query parameter, the `str` is the type of the query parameter. You can also specify a default value for the query parameter.

```bash
$ curl http://localhost:8080/hello
Hello, Alice!
```

The `@string` is a validator. AIScript will validate the query parameter and return an error if the validation fails.

```bash
$ curl http://localhost:8080/hello?name=WS
{
    "error": "Invalid query parameter: name, must be between 3 and 10 characters"
}
```

## Parse request body

```js
post /hello {
    @json
    body {
        @string(min_len=3, max_len=10)
        name: str
    }

    return "Hello, {name}!";
}
```

```
$ curl -X POST -H "Content-Type: application/json" \
    -d '{"name": "AIScript"}' http://localhost:8080/hello
Hello, AIScript!
```

Each field declared in the `body` block is a request body parameter, the `str` is the type of the request body parameter. The `@json` directive tells AIScript to parse the request body as JSON. Another directive is `@form`, it tells AIScript to parse the request body as form data.

```py
post /hello {
    @form
    body {
        @string(min_len=3, max_len=10)
        name: str
    }

    return "Hello, {name}!";
}
```

```
$ curl -X POST -H "Content-Type: application/x-www-form-urlencoded" \
    -d 'name=AIScript' http://localhost:8080/hello
Hello, AIScript!
```

## Header and cookie

Access and set header and cookie is easy.

```py
get /hello {
    let abc = header.abc;
    let xyz = cookie.xyz;

    # set new header
    header.test = "Test Header";
    # modify cookie
    cookie.xyz = "{xyz} v2";
    return "header: abc={abc}, cookie: xyz={xyz}";
}
```

## Request object

```py
get /hello {
    let method = request.method;
    let url = request.url
    let path = request.path
    let scheme = request.scheme
    let host = request.host
    let port = request.port
    return "method: {method}, url: {url}, path: {path}, scheme: {scheme}, host: {host}, port: {port}"
}
```

```
$ curl http://localhost:8080/hello
method: GET, url: http://localhost:8080/hello, path: /hello, scheme: http, host: localhost, port: 8000
```

## Redirect

```py
get /hello {
    return temporaly_redirect("/hello2")
}
```

## Path parameter

```py
get /hello/<name:str> {
    return "Hello, {name}!";
}
```

## Multiple routes

```rust
get /hello {
    return "Hello, World!";
}

post /hello2 {
    return "Hello, World2!";
}
```

## Route programming

API routes normally never a simple text response, it often need programming logic to handle the request. In AIScript route, you can write any programming logic in the route just like other web frameworks in ohter languages.

```rust
get /hello {
    query {
        value: int
    }

    if value > 10 {
        return "Value is greater than 10";
    else {
        return "Value is less than or equal to 10";
    }
}
```

```
$ curl http://localhost:8080/hello?value=11
Value is greater than 10
```

## Query database with SQL

```py
get /tweet/<id: int> {
    use std.db.pg;

    return pg.query("SELECT * FROM tweet WHERE id = $1", id);
}
```

