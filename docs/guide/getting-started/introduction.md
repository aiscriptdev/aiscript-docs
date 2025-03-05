# Introduction

AIScript is a combination of interpreter programming language and web framework both written in Rust dedicated to help people build AI applications effortlessly. The language syntax learn from Python, JavaScript and Rust, combine its good parts and designed to be easy to learn and use.

:::warning
`AIScript` is in early development, please do not use it in production yet.
:::

## Programming Language

As a programming language, AIScript write it interpreter from scratch.

- Function is the first class citizen and object oriented programming paradigm
- Builtin AI primitive, including prompt, ai function, and agent
- Dynamic typing with limited static type checking
- Buitlin data validation like Python's [Pydantic](https://docs.pydantic.dev/latest/)
- Simple and elegant error handling, inspired from Rust, Golang and Zig
- Rich standard library backed by Rust's standard library and ecosystems underneath
- Garbage collection

## Web Framework

- Elegant and intuitive route DSL
- Auto params validation
- Auto generate OpenAPI schema and docs
- Backed by Rust's best practices, use [axum](https://github.com/tokio-rs/axum) and [sqlx](https://github.com/launchbadge/sqlx) underneath, 
- Rust's axum performance but with Python's flask-like syntax
- Buitlin database modules ([`std.db.pg`](/std/db/pg) and [`std.db.redis`](/std/db/redis))
- Buitlin auth and social login
- Battery-included features with simple configuration to enable them

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

You can open [http://localhost:8080/redoc](http://localhost:8080/redoc) to see the API docs.

![](/guide/open-api.png)