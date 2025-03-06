# Route and Endpoint

**Route** is the main entry point that handles an HTTP request in AIScript.

## Define An Endpoint

Defining an endpoint is simple and straightforward. The syntax is:

```
verb path [, verb path...] {
    // query parameters
    query {
        // parameter definitions
    }

    // request body
    body {
        // body field definitions
    }
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

```bash
$ curl http://localhost:8080/hello
Hello World
```

## Parse Query String

Use the `query` block to declare fields in the query string. You can set a default value to make a parameter optional. To access query parameters, use the `query.name` or `query["name"]` syntax.

```py
get /hello {
    query {
        @string(min_len=3, max_len=10)
        name: str = "Alice"
    }

    return "Hello, " + query.name + "!";
}
```

```bash
$ curl http://localhost:8080/hello?name=AIScript
Hello, AIScript!
```

Each field declared in the `query` block is a query parameter, with `str` indicating the parameter type.

```bash
$ curl http://localhost:8080/hello
Hello, Alice!
```

The [@string](/reference/directives#string) is a validator. AIScript will validate the query parameter and return an error if validation fails.

```bash
$ curl http://localhost:8080/hello?name=Le
{
    "error": "Invalid query parameter: name, must be between 3 and 10 characters"
}
```

:::tip
For more information about validators, see [Validator](./validator.md).
:::

## Parse Request Body

```py
post /hello {
    @json
    body {
        @string(min_len=3, max_len=10)
        name: str
    }

    return "Hello, " + body.name + "!";
}
```

```bash
$ curl -X POST -H "Content-Type: application/json" \
    -d '{"name": "AIScript"}' http://localhost:8080/hello
Hello, AIScript!
```

Each field declared in the `body` block is a request body parameter, with `str` indicating the parameter type. The [@json](/reference/directives#json) directive tells AIScript to parse the request body as JSON. Alternatively, the [@form](/reference/directives#form) directive instructs AIScript to parse the request body as form data. Access body parameters using `body.name` or `body["name"]` syntax.

```py
post /hello {
    @form
    body {
        @string(min_len=3, max_len=10)
        name: str
    }

    return "Hello, " + body.name + "!";
}
```

```bash
$ curl -X POST -H "Content-Type: application/x-www-form-urlencoded" \
    -d 'name=AIScript' http://localhost:8080/hello
Hello, AIScript!
```

## Headers and Cookies

Accessing and setting headers and cookies is straightforward using the `header` and `cookie` variables, which are request-scoped.

```py
get /hello {
    let abc = header.abc;
    let xyz = cookie.xyz;

    // Set new header
    header.test = "Test Header";
    // Modify cookie
    cookie.xyz = "changed";
    return "header: abc={abc}, cookie: xyz={xyz}";
}
```

## Request Object

```py
get /hello {
    let method = request.method;
    let url = request.url;
    let path = request.path;
    let scheme = request.scheme;
    let host = request.host;
    let port = request.port;
    return "method: {method}, url: {url}, path: {path}, scheme: {scheme}, host: {host}, port: {port}";
}
```

```bash
$ curl http://localhost:8080/hello
method: GET, url: http://localhost:8080/hello, path: /hello, scheme: http, host: localhost, port: 8000
```

## Redirect

```py
get /hello {
    return temporary_redirect("/hello2");
}

get /hello2 {
    return "Hello, World!";
}
```

## Path Parameters

```py
get /hello/<name:str> {
    return "Hello, {name}!";
}
```

## Multiple Routes

```py
get /hello, get /world {
    return "Hello, World!";
}

post /hello2 {
    return "Hello, World2!";
}
```

## Route Programming

API routes typically require more than simple text responses; they often need programming logic to handle requests. In AIScript routes, you can write any programming logic just as you would in other web frameworks.

```py
get /hello {
    query {
        value: int
    }

    if query.value > 10 {
        return "Value is greater than 10";
    } else {
        return "Value is less than or equal to 10";
    }
}
```

```bash
$ curl http://localhost:8080/hello?value=11
Value is greater than 10
```

## Query Database with SQL

```py
get /tweet/<id: int> {
    use std.db.pg;

    return pg.query("SELECT * FROM tweet WHERE id = $1", id);
}
```
