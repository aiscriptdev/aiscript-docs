# OpenAPI and Docs

AIScript provides automatic OpenAPI documentation generation from your route definitions with zero configuration. This feature creates comprehensive API documentation including type information, validation rules, and examples derived directly from your code.

## Basic Documentation

The simplest way to document your API is through docstrings. In AIScript, you can use triple-quoted strings (`"""..."""`) to provide documentation for routes and their parameters:

```py
post /api/chat {
    """
    Chat API endpoint
    
    Sends a message to the chat service and returns a response.
    """

    body {
        """The message to be sent to the chat service"""
        message: str,
    }

    return "Input: " + body.message + "!";
}
```

## Documenting Routes

Each route can have a detailed description:

```py
get /api/users {
    """
    List all users
    
    Returns a paginated list of all users in the system.
    Results can be filtered by role or status.
    """
    
    query {
        @number(min=1)
        """Page number for pagination"""
        page: int = 1,
        
        @number(min=1, max=100)
        """Number of items per page"""
        limit: int = 20
    }
    
    // Route implementation
}
```

## Documenting Parameters

You can document query parameters, path parameters, and request body fields:

### Query Parameters

```py
get /api/products {
    query {
        """Filter products by category"""
        category: str,
        
        """Sort order (asc or desc)"""
        @in(["asc", "desc"])
        sort: str = "asc",
        
        """Minimum price filter"""
        @number(min=0)
        min_price: float
    }
}
```

### Path Parameters

```py
get /api/users/<id:int> {
    """
    Get user by ID
    
    Retrieves detailed information about a specific user.
    
    Parameters:
      id: The unique identifier of the user
    """
    
    // Route implementation
}
```

### Request Body

```py
post /api/products {
    @json
    body {
        """Product name (must be unique)"""
        @string(min_len=3, max_len=100)
        name: str,
        
        """Detailed product description"""
        description: str,
        
        """Product price in USD"""
        @number(min=0.01)
        price: float,
        
        """Product categories (at least one required)"""
        @array(min_items=1)
        categories: array
    }
}
```

## Response Documentation

You can document the responses a route might return:

```py
get /api/orders/<id:int> {
    """
    Get order details
    
    Retrieves the details of a specific order.
    
    Responses:
      200: Successful operation
      404: Order not found
      403: Unauthorized access
    """
    
    // Route implementation
}
```

## Auto-Generated Documentation

AIScript automatically generates OpenAPI documentation based on your route definitions. This documentation includes:

1. All routes and their HTTP methods
2. Request parameters (query, path, body)
3. Validation rules applied to parameters
4. Data types for all parameters and responses
5. Docstrings as descriptions
6. Documentation specific to each parameter

## Accessing Documentation

By default, AIScript makes your API documentation available at `/redoc` and the OpenAPI specification at `/openapi.json`. You can customize these paths in your project configuration:

```toml
# project.toml

[apidoc]
enabled = true
type = "redoc"
path = "/redoc"
```

AIScript's documentation UI support **Swagger UI** and **Redoc**.

## Tags and Grouping

You can use tags to group related endpoints in the documentation:

```py
@docs(tag = "Users")
get /api/users {
    """List all users"""
}

@docs(tag = "Users")
get /api/users/<id:int> {
    """Get user by ID"""
}

@docs(tag = "Users")
get /api/products {
    """List all products"""
}
```

## Hiding Endpoints

You can exclude specific endpoints from documentation:

```py
@docs(hidden=true)
get /internal/metrics {
    """This endpoint won't appear in documentation"""
}
```

## Benefits

Automatic OpenAPI documentation in AIScript offers several benefits:

1. **Zero configuration**: Documentation is generated automatically from your code
2. **Always up-to-date**: Documentation updates whenever your code changes
3. **Complete type information**: All parameter types are accurately reflected
4. **Validation rules included**: All validators are documented
5. **Interactive testing**: Test endpoints directly from the documentation UI
6. **Client generation**: Use the OpenAPI spec to generate client libraries in various languages

AIScript's built-in documentation system ensures your API is well-documented with minimal effort, making it easier for both you and your API consumers to understand and use your services.