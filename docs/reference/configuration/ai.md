# AI

> For AI observability, please refer to [observability](./observability.md).

AIScript supports multiple AI providers:

- **OpenAI**: Cloud-based models including GPT-4 and GPT-3.5
- **DeepSeek**: Efficient and powerful models 
- **Anthropic**: Claude models for advanced reasoning
- **Ollama**: 100+ local models from various providers running on your own hardware

## Configuration

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

# Ollama - Local models
[ai.ollama]
api_endpoint = "http://localhost:11434/v1"  # Default Ollama endpoint
model = "llama3.2"  # or any other model installed in your Ollama instance
```

## Using Ollama

[Ollama](https://ollama.ai/) allows you to run local AI models on your own hardware. To use Ollama with AIScript:

1. **Install Ollama** from [ollama.ai](https://ollama.ai/)
2. **Pull your desired models** (e.g., `ollama pull llama3.2`)
3. **Make sure Ollama is running** locally
4. **Configure AIScript** to use Ollama as shown above or by setting the `OLLAMA_API_ENDPOINT` environment variable

### Available Models

Ollama provides access to 100+ models ranging from small 135M parameter models to massive 671B parameter models, including:

- **Llama family**: `llama3.2`, `llama3.1`, `codellama`
- **DeepSeek models**: `deepseek-r1`, `deepseek-v3`, `deepseek-coder`
- **Specialized models**: `phi3`, `gemma2`, `qwen2.5`, `mistral`
- **And many more**: See the [full list of available models](https://ollama.com/search)

### Environment Variables

You can also configure Ollama using environment variables:

```bash
export OLLAMA_API_ENDPOINT="http://localhost:11434/v1"
```