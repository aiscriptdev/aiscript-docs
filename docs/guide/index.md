# AIScript

```rust
// Define a function that takes a prompt and returns a response
fn generate_response(prompt: string) -> string {
    // Call the AI model to generate a response
    let response = ai.generate({
        model: "gpt-4",
        prompt: prompt,
        max_tokens: 100
    });
    
    return response;
}

// Example usage
let result = generate_response("Tell me a joke");
print(result);
```