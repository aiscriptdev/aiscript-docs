# Route Keywords

In AIScript, the route handlers are defined using HTTP method keywords followed by a URL path pattern. This approach provides a clean and intuitive way to build web APIs and handle HTTP requests.

## Get

The `get` keyword defines a route handler for HTTP GET requests, which are used to retrieve data.

```rust
get /hello {
    return "Hello World!";
}
```

## Post

The `post` keyword defines a route handler for HTTP POST requests, which are typically used to create new resources.

```rust
post /products {
    body {
        name: str
        price: float
        category: str
    }

    // Validate input
    if body.price <= 0 {
        return response(status_code = 400, body = {error: "Price must be positive"});
    }

    // Create new product
    let id = db.create_product(body.name, body.price, body.category);
    return response(body = {id: id, message: "Product created"});
}
```

## Put

The `put` keyword defines a route handler for HTTP PUT requests, which are used to update existing resources.

```rust
put /products/:id {
    path {
        id: int
    }

    body {
        name: str
        price: float
        category: str
    }

    // Check if product exists
    if !db.product_exists(path.id) {
        return response(status_code = 404, body = {error: "Product not found"});
    }

    // Update product
    db.update_product(path.id, body.name, body.price, body.category);
    return {message: "Product updated"};
}
```

## Delete

The `delete` keyword defines a route handler for HTTP DELETE requests, which are used to remove resources.

```rust
delete /products/:id {
    path {
        id: int
    }

    // Check if product exists
    if !db.product_exists(path.id) {
        return response(status_code = 404, body = {error: "Product not found"});
    }

    // Delete product
    db.delete_product(path.id);
    return "Ok";
}
```

## Route

The `route` keyword allows grouping related routes under a common path prefix, creating a more organized API structure. This helps maintain cleaner code and logical resource hierarchies.

```js
route /user {
    // This handles GET /user/info
    get /info {
        return {
            version: "1.0",
            endpoints: ["GET /info", "PUT /:id"]
        };
    }

    // This handles PUT /user/:id
    put /:id {
        path {
            id: int
        }
        
        body {
            name: str
            email: str
        }
        
        // Update user with the given ID
        db.update_user(path.id, body.name, body.email);
        return {message: "User updated"};
    }
}
```

## Query

Provides access to query parameters in the URL.

```rust
get /search {
    query {
        term: str
        page: int = 1
    }

    let term = query.term;
    let page = query.page;
    return f"Searching for '{term}' on page {page}";
}
```

## Path

Contains route parameters defined with `:` in the route path.

```rust
get /users/:id/posts/:postId {
    path {
        id: str
        postId: int
    }

    let userId = path.id;
    let postId = path.postId;
    return f"Accessing post {postId} for user {userId}";
}
```

## Body

Contains the parsed request body. Automatically parsed based on Content-Type.

```rust
post /users {
    body {
        name: str
        email: str
    }

    let name = body.name;
    let email = body.email;
    // Create a new user with name and email
    return {id: create_user(name, email)};
}
```

## Header

Access request headers through the `header` object.

```rust
get /headers {
    let userAgent = header["User-Agent"];
    let contentType = header["Content-Type"];
    return f"User-Agent: {userAgent}, Content-Type: {contentType}";
}
```

## Cookie

Access cookies through the `cookie` object.

```rust
get /welcome {
    let username = cookie.username;
    if username {
        return "Welcome back, {username}!";
    } else {
        return "Welcome, guest!";
    }
}
```
