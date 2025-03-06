# Validator

Validators are directives that validate the value of a field, most commonly used in routes.

## Route Validators

In most web frameworks, you need to write a lot of code to validate request bodies, query strings, and path parameters. Examples include [webargs](https://webargs.readthedocs.io/en/latest/) in Python, [express-validator](https://express-validator.github.io/docs) in Node.js, and [zod](https://github.com/colinhacks/zod) in TypeScript.

AIScript provides a simple way to validate request components using directives.

### Query String Validators

```js
get /hello {
    query {
        @string(min_len=3, max_len=10)
        name: str
        
        @in(["male", "female"])
        gender: str
    }
}
```

### Request Body Validators

```js
post /hello {
    @json // or use @form to validate form data
    body {
        @regex(r"^\d{4}-\d{2}-\d{2}$")
        birthdate: str
        
        @format(type="email")
        email: str
    }
}
```

## Built-in Validators

AIScript provides several built-in validators for common validation scenarios, for the full list of validators, see [Validator Reference](/reference/directives#validators).

### String Validators

```js
@string(min_len=3, max_len=20)
username: str

@regex(r"^[a-zA-Z0-9_]+$")
alphanumeric: str

@format(type="email")
email: str

@format(type="url")
website: str
```

### Numeric Validators

```js
@number(min=18, max=100)
age: int

@number(gt=0)
positive_value: float
```

### Collection Validators

```js
@array(min_len=1, max_len=5)
tags: array

@in(["admin", "user", "guest"])
role: str
```

### Date Validators

```js
@date(format="YYYY-MM-DD")
birthdate: str

@date(min="2022-01-01", max="2022-12-31")
event_date: str
```

## Custom Error Messages

You can provide custom error messages for validation failures:

```js
@string(min_len=8, error="Password must be at least 8 characters")
password: str

@in(["USD", "EUR", "GBP"], error="Currency must be one of USD, EUR, or GBP")
currency: str
```

## Combining Validators

Multiple validators can be applied to a single field:

```js
@string(min_len=3)
@regex(r"^[a-zA-Z0-9_]+$", error="Username can only contain letters, numbers, and underscores")
username: str
```

## Validation Response

When validation fails, AIScript automatically returns an appropriate HTTP response with detailed error information:

```json
{
  "error": "Validation Error",
  "details": [
    {
      "field": "username",
      "message": "String must be at least 3 characters long"
    },
    {
      "field": "address.zipcode",
      "message": "Must match pattern ^\d{5}$"
    }
  ]
}
```

## Advanced Usage

### Combining Multiple Validators

Multiple validators can be applied to a single field for complex validation scenarios:

```js
post /api/user {
    @json
    body {
        @string(min_len=3, max_len=20)
        @regex(r"^[a-zA-Z0-9_]+$")
        username: str,
        
        @string(min_len=8)
        @not(@in(["password", "12345678"]))
        password: str
    }
}
```

### Custom Error Messages

Most validators accept an `error` parameter for custom error messages:

```js
post /api/register {
    @json
    body {
        @string(min_len=3, error="Username must be at least 3 characters")
        username: str,
        
        @format(type="email", error="Please provide a valid email address")
        email: str
    }
}
```

### Conditional Validation

Use the `@or` directive for conditional validation:

```js
post /api/payment {
    @json
    body {
        payment_type: str,
        
        @or([
            @and([
                @equal(field="payment_type", value="credit_card"),
                @regex(r"^\d{16}$")
            ]),
            @and([
                @equal(field="payment_type", value="paypal"),
                @format(type="email")
            ])
        ])
        payment_details: str
    }
}
```

By using validators, AIScript helps you build robust applications with clear data validation rules, reducing boilerplate code and ensuring consistent validation throughout your application.