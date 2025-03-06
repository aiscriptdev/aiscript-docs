# Route Directives

These directives are applied to route declarations to modify their behavior.

## @json

Specifies that the route expects and parses JSON request bodies.

```js
post /api/users {
    @json
    body {
        name: str,
        email: str
    }

    // Process body as JSON
    return "Created user: " + body.name;
}
```

## @form

Specifies that the route expects and parses form data (`application/x-www-form-urlencoded` or `multipart/form-data`).

```js
post /api/contact {
    @form
    body {
        name: str,
        message: str
    }

    // Process body as form data
    return "Received message from: " + body.name;
}
```

## @auth

Requires authentication for the route. Can specify roles or permissions.

```js
@auth
get /api/profile {
    // Only authenticated users can access
    return "Your profile data";
}

@auth(roles=["admin"])
get /api/users {
    // Only admins can access
    return "All users data";
}
```

## @basic_auth

Enables HTTP Basic Authentication for the route.

```js
@basic_auth(realm="Admin Area")
get /admin/dashboard {
    // Only users with valid basic auth credentials can access
    return "Admin dashboard";
}
```

## @sso

Enables Single Sign-On authentication for the route.

```js
@sso(provider="google")
get /dashboard {
    // User must be authenticated via Google SSO
    return "Welcome, " + user.name;
}
```

## @docs

Provides documentation and metadata for OpenAPI generation.

Parameters:

- **deprecated**: Marks a route as deprecated
- **tag**: Assigns the route to a specific tag group in documentation
- **hidden**: Excludes the route from documentation

```js
@docs(deprecated=true)
get /api/users {
    // This route is deprecated
    return "Users list";
}

@docs(tag="Authentication")
post /api/login {
    // This route will be grouped under "Authentication" in docs
    return "Login successful";
}

@docs(hidden=true)
get /internal/metrics {
    // This route won't appear in documentation
    return "Internal metrics";
}
```
