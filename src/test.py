import os
from openai import AzureOpenAI
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get environment variables for Azure services
azure_oai_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
azure_oai_key = os.getenv("AZURE_OPENAI_API_KEY")
azure_oai_deployment = os.getenv("DEPLOYMENT_NAME")
azure_search_endpoint = os.getenv("AZURE_SEARCH_ENDPOINT")
azure_search_key = os.getenv("AZURE_SEARCH_KEY")
azure_search_index = os.getenv("AZURE_SEARCH_INDEX")

# Check if the required environment variables are set
required_vars = [
    "AZURE_OPENAI_ENDPOINT",
    "AZURE_OPENAI_API_KEY",
    "DEPLOYMENT_NAME",
    "AZURE_SEARCH_ENDPOINT",
    "AZURE_SEARCH_KEY",
    "AZURE_SEARCH_INDEX",
]

for var in required_vars:
    if not os.getenv(var):
        raise EnvironmentError(f"Missing required environment variable: {var}")

# Initialize the Azure OpenAI client using the API key
client = AzureOpenAI(
    azure_endpoint=azure_oai_endpoint,  # Azure OpenAI endpoint from environment variable
    api_key=azure_oai_key,  # API key for Azure OpenAI authentication
    api_version="2024-05-01-preview"
)

user_input = input("Write your question here: ")

# Define the conversation and extra body for Azure Cognitive Search integration
completion = client.chat.completions.create(
    model=azure_oai_deployment,
    max_tokens=500,
    temperature=0.7,
    messages = [
    {"role": "system", "content": "You are an AI assistant capable of solving simple mathematical operations (like addition, subtraction, multiplication, etc.) directly, as well as providing information based on available data."},
    {"role": "user", "content": user_input}
    ],
    extra_body={
        "data_sources": [
            {
                "type": "azure_search",
                "parameters": {
                    "endpoint": azure_search_endpoint,
                    "index_name": azure_search_index,
                    "authentication": {
                        "type": "api_key",  # Using the API key for authentication in Azure Search
                        "key": azure_search_key  # Azure Cognitive Search API key
                    }
                }
            }
        ]
    }
)

# Output the response in a readable format
print(completion.model_dump_json(indent=2))