# Validator

Validators are directives that validate the value of a field, it mostly used in the route and model.

## Route validators

In most web frameworks, you need to write a lot of code to validate the request body, query string, and path parameters. For example, [webargs](https://webargs.readthedocs.io/en/latest/) in Python, [express-validator](https://express-validator.github.io/docs) in Node.js, [zod](https://github.com/colinhacks/zod) in TypeScript.

AIScript provide a simple way to validate the request body, query string, and path parameter with directives.

### Query string validators

```js
get /hello {
    query {
        @string(min=3, max=10)
        name: str
        @in(["male", "female"])
        gender: str
    }
}
```

### Request body validators

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
