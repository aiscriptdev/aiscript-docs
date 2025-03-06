
# Validator Directives

These directives validate field values in route parameters, request bodies, or model definitions.

## @string

Validates string values with various constraints.

Parameters:
- `min_len`: Minimum length of the string
- `max_len`: Maximum length of the string
- `exact_len`: Exact length the string must have
- `start_with`: String must start with this prefix
- `end_with`: String must end with this suffix

```js
post /api/register {
    @json
    body {
        @string(min_len=3, max_len=20)
        username: str,
        
        @string(min_len=8, start_with="A")
        password: str
    }
}
```

## @number

Validates numeric values against specified constraints.

Parameters:
- `min`: Minimum value
- `max`: Maximum value
- `equal`: Value must equal this number

```js
post /api/product {
    @json
    body {
        @number(min=1, max=1000)
        price: float,
        
        @number(min=0)
        quantity: int
    }
}
```

## @in

Validates that a value is one of a set of allowed values.

```js
post /api/order {
    @json
    body {
        @in(["small", "medium", "large"])
        size: str,
        
        @in([1, 2, 3, 4, 5])
        rating: int
    }
}
```

## @regex

Validates that a string matches a given regular expression pattern.

```js
post /api/register {
    @json
    body {
        @regex(r"^[a-zA-Z0-9_]+$")
        username: str,
        
        @regex(r"^\d{3}-\d{2}-\d{4}$")
        ssn: str
    }
}
```

## @format

Validates that a string conforms to a specific format.

Supported formats:
- `email`: Email address
- `url`: URL
- `uuid`: UUID
- `ipv4`: IPv4 address
- `ipv6`: IPv6 address
- `date`: Date (YYYY-MM-DD)
- `datetime`: Datetime (ISO 8601)
- `time`: Time (HH:MM:SS)
- `month`: Month (YYYY-MM)
- `week`: Week (YYYY-Www)
- `color`: HTML color code

```js
post /api/user {
    @json
    body {
        @format(type="email")
        email: str,
        
        @format(type="url")
        website: str,
        
        @format(type="date")
        birthdate: str
    }
}
```

## @array

Validates arrays against specified constraints.

Parameters:
- `min_items`: Minimum number of items
- `max_items`: Maximum number of items
- `unique`: Whether items must be unique

```js
post /api/tags {
    @json
    body {
        @array(min_items=1, max_items=5, unique=true)
        tags: array
    }
}
```

## @date

Validates that a string is a valid date in the specified format and range.

Parameters:
- `format`: Date format string (default: "YYYY-MM-DD")
- `min`: Minimum date
- `max`: Maximum date

```js
post /api/event {
    @json
    body {
        @date(format="YYYY-MM-DD", min="2023-01-01", max="2023-12-31")
        event_date: str
    }
}
```

## @not

Negates another validator, passing if the inner validator fails.

```js
post /api/product {
    @json
    body {
        @not(@in(["admin", "system"]))
        role: str
    }
}
```

## @or

Combines multiple validators with logical OR, passing if any of the inner validators pass.

```js
post /api/identifier {
    @json
    body {
        @or([
            @format(type="email"),
            @regex(r"^\d{10}$")
        ])
        identifier: str  // Can be either email or 10-digit number
    }
}
```
