from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv
from openai import AzureOpenAI
from flask_cors import CORS
import json

app = Flask(__name__)

# Allow only requests from frontend (http://localhost:5173)
CORS(app, origins="http://localhost:5173")


@app.route("/api/chat", methods=["POST"])
def chat():
    try:
        # Load environment variables from .env file
        load_dotenv()

        # Get environment variables for Azure services
        azure_oai_endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
        azure_oai_key = os.getenv("AZURE_OPENAI_API_KEY")
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

        # Initialize the Azure OpenAI client using the API key
        client = AzureOpenAI(
            azure_endpoint=azure_oai_endpoint,  # Azure OpenAI endpoint from environment variable
            api_key=azure_oai_key,  # API key for Azure OpenAI authentication
            api_version="2024-05-01-preview",
        )

        # Parse the user's question from the request
        data = request.get_json()
        text = data.get("message", "")  # Get the message from the request
        USE_OWN_DATA = data.get(
            "usePdfData", False
        )  # Flag to check if using custom data

        with open(
            "src/default_prompt.json",
            "r",
        ) as default_prompt:
            prompt_data = json.load(default_prompt)

        # Define the base messages
        messages = [
            {
                "role": "system",
                "content": prompt_data["content"],
            },
            {"role": "user", "content": text},  # User input
        ]

        # Define the extra_body for Azure Cognitive Search if using own data
        extra_body = (
            {
                "data_sources": [
                    {
                        "type": "azure_search",
                        "parameters": {
                            "endpoint": azure_search_endpoint,
                            "index_name": azure_search_index,
                            "authentication": {
                                "type": "api_key",  # Using the API key for authentication in Azure Search
                                "key": azure_search_key,  # Azure Cognitive Search API key
                            },
                        },
                    }
                ]
            }
            if USE_OWN_DATA
            else None
        )

        # Make the API call
        response = client.chat.completions.create(
            model=azure_oai_deployment,
            max_tokens=500,
            temperature=0.6,
            messages=messages,
            extra_body=extra_body,  # Include extra_body only if USE_OWN_DATA is True
        )

        # Log token usage
        print(
            f"Tokens used: {response.usage.total_tokens}\nUse PDF data: {USE_OWN_DATA}"
        )

        # Ensure that the response has 'choices' and the message content
        if response and hasattr(response, "choices") and len(response.choices) > 0:
            # Access the first choice and then the message content
            ai_response = response.choices[0].message.content
            try:
                parsed_response = json.loads(ai_response)
                if "action" in parsed_response:
                    return jsonify(parsed_response)
            except Exception as ex:
                print(ex)
        else:
            ai_response = "I'm sorry, I couldn't retrieve a valid response."

        return jsonify({"response": ai_response})

    except Exception as ex:
        return jsonify({"error": str(ex)}), 500


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
