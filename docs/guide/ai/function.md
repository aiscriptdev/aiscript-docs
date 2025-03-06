# AI Functions

AI Functions enable you to encapsulate AI capabilities into reusable code blocks, making your AI-powered applications more modular and maintainable. In AIScript, AI functions are defined using the `ai fn` syntax, allowing you to create functions that leverage language models directly within your code.

## Basic Syntax

An AI function is defined using the `ai` keyword followed by a regular function declaration:

```rust
ai fn function_name(parameter1: type, parameter2: type) -> return_type {
    // Function body with AI capabilities
}
```

The `ai` prefix allows the function to use AI-specific features like the `prompt` keyword, and it also signals to the AIScript runtime that this function may require LLM access.

:::warning

You can not use `prompt` outside the non-ai function.

```rust
fn analyze_sentiment(text: str) -> float {
    // [line 3] Error at 'prompt': Can't prompt outside of ai function or root script.
    let sentiment = prompt "Analyze the sentiment of this text and return a score between -1 and 1: {text}";
    return float(sentiment);
}
```

:::

## Example: Sentiment Analysis

Here's a basic example of an AI function that analyzes sentiment in text:

```rust
ai fn analyze_sentiment(text: str) -> float {
    let sentiment = prompt "Analyze the sentiment of this text and return a score between -1 and 1: {text}";
    return float(sentiment);
}

// Use the AI function
let review = "This product is amazing! Best purchase ever!";
let score = analyze_sentiment(review);
print(score); // 0.9
```

## Error Handling in AI Functions

Since AI functions often involve network operations and third-party services, it's good practice to include error handling:

```rust
ai fn generate_summary(text: str) -> str | NetworkError! {
    let summary = prompt "Summarize this text in 2-3 sentences: {text}" ?;
    return summary;
}

// Using the function with error handling
let article = "...long article text...";
let summary = generate_summary(article) |err| {
    print("Failed to generate summary: {err}");
    return "Summary unavailable";
};
```

## AI Function Configuration

You can customize the behavior of AI functions by configuring prompt parameters:

```rust
ai fn generate_ideas(topic: str, count: int = 3) -> str {
    let ideas = prompt {
        input: "Generate {count} creative ideas about {topic}",
        temperature: 0.9,  // Higher creativity
        max_tokens: 300
    };
    return ideas;
}
```

## Best Practices

1. **Descriptive Function Names**: Choose names that clearly indicate the function's purpose, like `classify_text()` or `generate_summary()`.

2. **Explicit Return Types**: Always specify the return type for clarity and to enable better error handling.

3. **Input Validation**: Validate parameters before sending them to the language model to prevent errors.

4. **Prompt Engineering**: Craft clear, specific prompts within your AI functions to get consistent results.

5. **Response Processing**: Always process and validate the raw responses from the language model before returning them.

6. **Error Handling**: Implement proper error handling for network issues, API failures, and unexpected responses.

7. **Documentation**: Add comments to explain what the function does, expected inputs, and potential limitations.

## Performance Considerations

- AI functions incur latency due to network calls to LLM providers
- Use caching for frequently used AI function results when appropriate
- Consider batching related AI operations together to minimize API calls
- Be aware of token usage and associated costs

## Limitations

- AI functions rely on external API services and are affected by their availability
- Results from LLMs may vary over time or with different model versions
- Complex parsing of LLM outputs may sometimes be unreliable due to model variability

AI functions are a powerful way to incorporate AI capabilities into your AIScript applications while maintaining clean, modular code that separates AI logic from your application logic.