# Introduction

AIScript is a unique combination of interpreter programming language and web framework, both written in Rust, designed to help developers build AI applications effortlessly. The language syntax draws inspiration from Python, JavaScript, and Rust, combining their strengths to create something that's intuitive, powerful, and easy to use.

:::warning
`AIScript` is in early development. Please do not use it in production yet.
:::

## Programming Language

As a programming language, AIScript is built with a custom interpreter from the ground up:

- Functions are first-class citizens with support for object-oriented programming paradigms
- Built-in AI primitives, including prompt, AI functions, and agent capabilities
- Dynamic typing system with targeted static type checking for improved safety
- Built-in data validation similar to Python's [Pydantic](https://docs.pydantic.dev/latest/)
- Simple yet powerful error handling, inspired by Rust, Go, and Zig
- Rich standard library leveraging Rust's ecosystem underneath
- Automatic garbage collection for memory management

## Web Framework

AIScript isn't just a language—it's a complete web development solution:

- Elegant and intuitive route DSL for defining endpoints
- Automatic parameter validation with clear error messages
- Automatic OpenAPI schema and documentation generation
- Built on Rust's best practices, using [axum](https://github.com/tokio-rs/axum) and [sqlx](https://github.com/launchbadge/sqlx) under the hood
- Combines Rust's axum performance with Python's Flask-like simplicity
- Built-in database modules ([`std.db.pg`](/std/db/pg) and [`std.db.redis`](/std/db/redis))
- Built-in authentication and social login capabilities
- Battery-included features easily enabled through simple configuration

## How AIScript works

```javascript
$ export OPENAI_API_KEY=<your-openai-api-key>

$ cat web.ai
get / {
    """A api to ask LLM"""

    query {
        """the question to ask"""
        @string(min_len=3, max_len=100) // validate params with builtin directive @string
        question: str
    }

    // `ai` and `prompt` are keywords
    ai fn ask(question: str) -> str {
        let answer = prompt question;
        return answer;
    }

    // use query.name or query["name"] to access query parameter
    let answer = ask(query.question);
    return { answer };
}

$ aiscript serve web.ai
Listening on http://localhost:8000

$ curl http://localhost:8000
{
    "error": "Missing required field: question"
}

$ curl http://localhost:8000?question=Hi
{
    "error": "Field validation failed: question: String length is less than the minimum length of 3"
}

$ curl http://localhost:8000?question=What is the capital of France?
{
    "answer": "The capital of France is Paris."
}
```

You can open [http://localhost:8080/redoc](http://localhost:8080/redoc) to see the automatically generated API documentation.

![](/guide/open-api.png)