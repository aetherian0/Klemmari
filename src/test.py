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

# Initialize the Azure OpenAI client using the API key (no bearer token required)
client = AzureOpenAI(
    azure_endpoint=azure_oai_endpoint,  # Azure OpenAI endpoint from environment variable
    api_key=azure_oai_key,  # API key for Azure OpenAI authentication
    api_version="2024-05-01-preview"
)

# Define the conversation and extra body for Azure Cognitive Search integration
completion = client.chat.completions.create(
    model=azure_oai_deployment,
    messages=[
        {"role": "system", "content": "You are an AI assistant that helps people find information and answer mathematical questions. Use the provided content to answer questions when relevant."},
        {"role": "user", "content": "Tell me 1 important thing when moving to Helsinki"}
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

# Render the citations if available
content = completion.choices[0].message.content
context = completion.choices[0].message.context

for citation_index, citation in enumerate(context.get("citations", [])):
    citation_reference = f"[doc{citation_index + 1}]"
    
    # Check if 'url' is None, and handle it
    url = citation.get("url", None)
    if url is None:
        url = "#"  # Default value if URL is None, or you can choose a fallback URL

    filepath = citation.get("filepath", "Unknown file")  # Default to 'Unknown file' if filepath is missing
    title = citation.get("title", "No title")  # Default to 'No title' if title is missing
    snippet = citation.get("content", "No content")  # Default to 'No content' if content is missing
    chunk_id = citation.get("chunk_id", "Unknown part")  # Default to 'Unknown part' if chunk_id is missing

    # Safely replace the citation reference with HTML
    replaced_html = f"<a href='{url}' title='{title}\n{snippet}'>(See from file {filepath}, Part {chunk_id})</a>"
    content = content.replace(citation_reference, replaced_html)

# Print final content
print(content)
