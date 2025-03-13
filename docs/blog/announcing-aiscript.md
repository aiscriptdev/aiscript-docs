# Announcing AIScript and How I Built It

![](/aiscript-social-image.png)

I'm excited to share **AIScript**, a new programming language I've been developing over the past few months. AIScript is designed specifically for web development in the AI era, with AI capabilities as first-class language features, and an intuitive route DSL and directive design. In my [Why AIScript](/blog/why-aiscript) post, I shared why I developed this new language; this post focuses on what AIScript is and how I developed it.

## What is AIScript?

AIScript is a unique combination of an interpreted programming language and web framework, both written in Rust, designed to help developers build AI applications effortlessly. The language syntax draws inspiration from Python, JavaScript, and Rust, combining their strengths to create something that's intuitive, powerful, and easy to use. 

```js
$ export OPENAI_API_KEY=<your-openai-api-key>
$ cat web.ai
get / {
    """An api to ask LLM"""

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
Listening on http://localhost:8080

$ curl http://localhost:8080
{
    "error": "Missing required field: question"
}

$ curl http://localhost:8080?question=Hi
{
    "error": "Field validation failed: question: String length is less than the minimum length of 3"
}

$ curl http://localhost:8080?question=What is the capital of France?
{
    "answer": "The capital of France is Paris."
}
```

The [Introduction](/guide/getting-started/introduction) page provides more details about AIScript.

## How I Built AIScript

My initial impression was that creating a programming language would be difficult and require relentless effort and energy. I learned some compiler concepts in university CS courses but still had no concrete idea how to create a language from scratch. I believe most people share this feeling.

When I decided to develop AIScript, I began by searching for compiler books and YouTube videos. The [Dragon Book](https://en.wikipedia.org/wiki/Compilers:_Principles,_Techniques,_and_Tools) is commonly recommended, but after reading it, I found it too academic for beginners. I rarely recommend it if you're new to language development like I was. Then I discovered an excellent book called [Crafting Interpreters](https://craftinginterpreters.com/) by Robert Nystrom. This book guided me into the interpreter world, and I learned to write a Rust version of the [Lox language](https://craftinginterpreters.com/the-lox-language.html) which I open-sourced on [GitHub](https://github.com/Folyd/lox-lang). I also learned about *Pratt parsing* from Crafting Interpreters to handle expressions, an elegant and easy-to-understand method for expression parsing. Matklad has a great [article](https://matklad.github.io/2020/04/13/simple-but-powerful-pratt-parsing.html) explaining this approach.

![](https://craftinginterpreters.com/image/header.png)

Since many concepts in Crafting Interpreters are derived from the Lua interpreter, I also purchased a book to learn about Lua's implementation. During this time, I discovered two outstanding projects: [Piccolo](https://github.com/kyren/piccolo), a Rust implementation of the Lua VM, and [gc-arena](https://github.com/kyren/gc-arena), an incremental garbage collector written in safe Rust. I spent considerable time diving into both projects and learned a great deal. This gave me a fundamental understanding of interpreter development within about a month.

I then began writing AIScript from scratch, basing some code on my Lox implementation and using gc-arena for garbage collection. However, I soon realized that Crafting Interpreters' single-pass architecture, while offering good performance for parsing and compilation, made static type checking and advanced optimization difficult. To address this, I collaborated with Claude to help me [migrate from a single-pass to a two-pass architecture](https://github.com/aiscriptdev/aiscript/pull/1). Through this process, I discovered that Claude excels at writing interpreters, which led me to instruct Claude to help implement the remaining components of the AIScript interpreter.

I've had a fantastic collaboration with Claude in implementing the AIScript interpreter. Not only did Claude help me write boilerplate code, but it also served as an exceptional interpreter teacher. When I was uncertain about the best implementation method, I would ask how CPython, Ruby, or other languages implement similar features, and Claude would provide detailed explanations that helped me make informed decisions. Without Claude's assistance, I definitely would have struggled to complete the first version of AIScript in just four months!

## Final Thoughts

I'm deeply grateful to Claude for being my interpreter teacher. I believe anyone following a similar path can also create their own interpreter language with relative ease. Building a programming language has been one of the most educational experiences of my development career. I hope AIScript can help bridge the gap between traditional web development and AI capabilities, making powerful AI features accessible to more developers.

Lastly and most importantly, AIScript is open source and available on [GitHub](https://github.com/aiscriptdev/aiscript). Hope you give it a try and welcome contributions from the community, whether it's submitting bug reports, suggesting features, improving documentation, or contributing code. 

Thanks for reading!