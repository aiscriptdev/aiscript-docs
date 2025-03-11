# Announcing AIScript

![](/aiscript-social-image.png)

After months of collaboration with Claude, I'm excited to announce the open-source release of **AIScript** - a new programming language designed from the ground up for the age of AI.

## Why Create Another Programming Language?

Some might ask: "In an era where AI can write code for us, why build a new programming language?" The answer is precisely *because* AI is so good at code generation.

Most mainstream languages were designed decades ago, when concepts like LLMs and agents weren't on anyone's radar. AIScript is different - it makes AI primitives first-class citizens in the language itself. With AIScript, features like `prompt`, `ai` functions, and `agent` are keywords, not libraries or packages.

## Language + Web Framework: A Unified Approach

AIScript takes a unique approach by combining a programming language with a web framework. This means:

```javascript
$ export OPENAI_API_KEY=<your-openai-api-key>
$ cat web.ai
get / {
    """An api to ask LLM"""

    query {
        """the question to ask"""
        @string(min_len=3, max_len=100)
        question: str
    }

    // `ai` and `prompt` are keywords
    ai fn ask(question: str) -> str {
        let answer = prompt question;
        return answer;
    }
    
    let answer = ask(query.question);
    return { answer };
}

$ aiscript serve web.ai
Listening on http://localhost:8080
```

One command to run a web API - no framework decisions, no dependency hell, just results.

## Features That Stand Out

### AI First-Class Citizens

```javascript
// Simple prompting
let answer = prompt "Why is the sky blue?";

// With configuration
let detailed_answer = prompt "Explain quantum physics" => {
    model: "claude-3.7",
    temperature: 0.8,
};

// AI Functions
ai fn generate_story(topic: str) -> str {
    return prompt f"Write a short story about {topic}";
}

// Multi-Agent Systems
agent Researcher {
    instructions: "You are a research assistant...",
    model: "gpt-4o",

    fn search_web(query: str) -> str {
        """
        Search the web for information about a topic.
        """
        // Implementation
        return "search results";
    }
}
```

### Built-in Data Validation

Data validation is built right into the language, inspired by Python's Pydantic:

```javascript
class User {
    @string(min_len=3, max=20)
    name: str,
    @number(min=18)
    age: int,
    @in(["male", "female", "other"])
    gender: str = "other",
}

let user = User("Jo", 17, "male") |err| {
    print("Validation error:", err);
    // Validation error: name length is less than minimum
};
```

### Batteries Included

AIScript includes ready-to-use features that would normally require additional packages, configuration, and expertise:

```javascript
// JWT Auth with a single decorator
@auth
post /chat {
    // Protected endpoint code
}

// Social Login
@sso(provider="google")
get /auth/google {
    let url = sso.authority_url();
    return temporary_redirect(target=url);
}
```

## Designed for the AI Generation Workflow

In the industrial era, we didn't manufacture cars from raw materials - we assembled them from pre-built components. Similarly, in the AI era, code generation works best when AI can compose high-level components rather than writing everything from scratch.

This philosophy aligns with Anthropic's Model Context Protocol (MCP) approach. Just as MCP provides a standardized way to connect AI models to different data sources and tools (like a "USB-C port for AI applications"), AIScript provides standardized high-level abstractions for web development. Both aim to simplify integrations and establish best practices for working with LLMs.

With AIScript, AI only needs to generate a few tokens to achieve what would otherwise require writing dozens of lines of boilerplate code from scratch. The language provides pre-built integrations that plug directly into your application's needs, similar to how MCP offers pre-built integrations for LLMs.

## Technical Highlights

AIScript combines the best ideas from multiple languages with modern web development patterns:

- **Syntax inspired by JavaScript, Python, and Rust**
- **Rust-powered interpreter** for excellent performance
- **Error handling with propagation operators** (`|err|` blocks and `?` operator)
- **Axum and SQLx integration** for industry-standard backend performance
- **Automatic OpenAPI documentation** generation
- **Built-in database modules** (`std.db.pg` and `std.db.redis`)
- **Elegant route DSL** for painless endpoint definition
- **Automatic request validation** with helpful error messages

## Join the AI-Native Development Revolution

In the new era of AI-assisted development, we need tools designed specifically for this workflow. Code generation will increasingly rely on high-level abstractions rather than writing every line from scratch. AIScript aims to be the language that bridges traditional programming with AI capabilities.

It represents a fundamental shift in how we think about web development:

- **AI first, not AI bolted-on**: Built from the ground up for the age of AI
- **Convention over configuration**: Sensible defaults, minimal boilerplate
- **Best practices built-in**: Web development patterns encoded in the language itself
- **Developer happiness**: Intuitive syntax and streamlined workflows

## Try AIScript Today

AIScript is ready for experimentation! Visit [github.com/aiscriptdev/aiscript](https://github.com/aiscriptdev/aiscript) to get started, and explore the full documentation at [aiscript.dev](https://aiscript.dev).

This is just the beginning of our journey to redefine web development for the AI era. We're excited to see what you'll build with it!