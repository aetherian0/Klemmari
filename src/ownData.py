from flask import Flask, request, jsonify
import os
import json
from dotenv import load_dotenv
from openai import AzureOpenAI
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# Allow only requests from frontend (http://localhost:5173)
CORS(app, origins="http://localhost:5173")

@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        # Load environment variables
        load_dotenv()
        azure_oai_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
        azure_oai_key = os.getenv("AZURE_OPENAI_API_KEY")
        azure_oai_deployment = os.getenv("DEPLOYMENT_NAME")
        azure_search_endpoint = os.getenv("AZURE_SEARCH_ENDPOINT")
        azure_search_key = os.getenv("AZURE_SEARCH_KEY")
        azure_search_index = os.getenv("AZURE_SEARCH_INDEX")

        # Initialize Azure OpenAI client
        client = AzureOpenAI(
            base_url=f"{azure_oai_endpoint}/openai/deployments/{azure_oai_deployment}/extensions",
            api_key=azure_oai_key,
            api_version="2023-09-01-preview"
        )

        # Parse the user's question from the request
        data = request.get_json()
        text = data.get("message", "")

        # Configure data source
        extension_config = dict(dataSources=[{
            "type": "AzureCognitiveSearch",
            "parameters": {
                "endpoint": azure_search_endpoint,
                "key": azure_search_key,
                "indexName": azure_search_index,
            }
        }])

        # Send request to Azure OpenAI
        response = client.chat.completions.create(
            model=azure_oai_deployment,
            temperature=0.7,
            max_tokens=800,
            messages=[
                {"role": "system", "content": "You are an AI assistant that helps people find information."},
                {"role": "user", "content": text}
            ],
            extra_body=extension_config
        )

        # Extract response content
        ai_response = response.choices[0].message.content
        return jsonify({"response": ai_response})

    except Exception as ex:
        return jsonify({"error": str(ex)}), 500

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
