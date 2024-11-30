import os
from openai import AzureOpenAI
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Access environment variables
endpoint = os.getenv("ENDPOINT_URL")
deployment = os.getenv("DEPLOYMENT_NAME")
subscription_key = os.getenv("AZURE_OPENAI_API_KEY")

# Initialize Azure OpenAI client with key-based authentication
client = AzureOpenAI(
    azure_endpoint=endpoint,
    api_key=subscription_key,
    api_version="2024-05-01-preview",
)

# Prepare the initial chat prompt
chat_prompt = [
    {
        "role": "system",
        "content": "You are an AI assistant that helps people find information."
    }
]

# Add a user question to the chat prompt
user_prompt = input("Write your question here: ")
chat_prompt.append({"role": "user", "content": str(user_prompt)})

# Generate the completion
completion = client.chat.completions.create(
    model=deployment,
    messages=chat_prompt,
    max_tokens=800,
    temperature=0.7,
    top_p=0.95,
    frequency_penalty=0,
    presence_penalty=0,
    stop=None,
    stream=False
)

# Extract the response message content using dot notation
reply = completion.choices[0].message.content

# Extract token usage
token_usage = completion.usage

print("ChatGPT's reply:", reply)
print("Token usage:", token_usage)
