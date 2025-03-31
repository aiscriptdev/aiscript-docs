# AI

> For AI observability, please refer to [observability](./observability.md).

```toml
[ai.openai]
api_key = "YOUR_API_KEY"
# optional, default is the official OpenAI API endpoint
api_endpoint = "YOUR_API_ENDPOINT"
model = "gpt-4"

[ai.deepseek]
api_key = "YOUR_API_KEY"
# optional, default is the official DeepSeek API endpoint
api_endpoint = "YOUR_API_ENDPOINT"
model = "deepseek-chat"

[ai.anthropic]
api_key = "YOUR_API_KEY"
# optional, default is the official Anthropic API endpoint
api_endpoint = "YOUR_API_ENDPOINT"
model = "claude-3-5-sonnet-latest"
```