from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from openai import AzureOpenAI
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# Allow only requests from frontend (http://localhost:5173)
CORS(app, origins="http://localhost:5173")

@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        # Load environment variables from .env file
        load_dotenv()

        azure_oai_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
        azure_oai_key = os.getenv("AZURE_OPENAI_API_KEY")  # Use API key
        azure_oai_deployment = os.getenv("DEPLOYMENT_NAME")
        azure_search_endpoint = os.getenv("AZURE_SEARCH_ENDPOINT")
        azure_search_key = os.getenv("AZURE_SEARCH_KEY")
        azure_search_index = os.getenv("AZURE_SEARCH_INDEX")

        required_vars = [
            "AZURE_OPENAI_ENDPOINT",
            "AZURE_OPENAI_API_KEY",
            "DEPLOYMENT_NAME",
            "AZURE_SEARCH_ENDPOINT",
            "AZURE_SEARCH_KEY",
            "AZURE_SEARCH_INDEX",
        ]

        # Check if all environment variables are set
        for var in required_vars:
            if not os.getenv(var):
                raise EnvironmentError(f"Missing required environment variable: {var}")

        # Initialize Azure OpenAI client using API key authentication
        client = AzureOpenAI(
            base_url=azure_oai_endpoint,  # Azure OpenAI endpoint
            api_key=azure_oai_key,  # API key for authentication
            api_version="2024-05-01-preview"  # API version
        )

        # Parse the user's question from the request
        data = request.get_json()
        text = data.get("message", "")

        # Configure the data source (Azure Cognitive Search)
        extension_config = {
            "data_sources": [
                {
                    "type": "azure_search",
                    "parameters": {
                        "endpoint": azure_search_endpoint,
                        "index_name": azure_search_index,
                        "authentication": {
                            "type": "system_assigned_managed_identity"  # Can be changed based on your authentication method
                        }
                    }
                }
            ]
        }

        # Send request to Azure OpenAI with the extension for Azure Cognitive Search
        response = client.chat.completions.create(
            model=azure_oai_deployment,
            messages=[
                {"role": "system", "content": "You are an AI assistant that helps people find information and answer mathematical questions. Use the provided content to answer questions when relevant. Always respond in the user's language (Finnish or English)."},
                {"role": "user", "content": text}
            ],
            extra_body=extension_config  # Attach the data sources
        )

        #print(response)
        #print(response.choices)
        #print(response.choices[0].message.content)

        # Check if a response was retrieved
        if not response.choices or not response.choices[0].message.content:
            return jsonify({"response": "I'm sorry, I couldn't retrieve the context. Please try rephrasing your question."})

        ai_response = response.choices[0].message.content
        return jsonify({"response": ai_response})

    except Exception as ex:
        return jsonify({"error": str(ex)}), 500

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
