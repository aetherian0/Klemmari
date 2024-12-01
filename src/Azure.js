import { AzureOpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

export async function azure_api(userInput) {
    // Environment variables or fallback values
    const endpoint =
        process.env["AZURE_OPENAI_ENDPOINT"] ||
        "https://projbopenai.openai.azure.com/"; // Update with your endpoint if necessary
    const apiKey =
        process.env["AZURE_OPENAI_API_KEY"] ||
        "<REPLACE_WITH_YOUR_KEY_VALUE_HERE>"; // Update with your actual API key
    const apiVersion = "2024-05-01-preview";
    const deployment = "klemmari-gpt-35-turbo"; // Must match your deployment name

    const client = new AzureOpenAI({
        endpoint,
        apiKey,
        apiVersion,
        deployment,
    });

    // Making a request to the model
    const result = await client.chat.completions.create({
        messages: [
            {
                role: "system",
                content:
                    "You are an AI assistant that helps people find information.",
            },
            {
                role: "user",
                content: userInput, // Use the input passed from the user
            },
        ],
        max_tokens: 800,
        temperature: 0.7,
        top_p: 0.95,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: null,
    });

    //Log full response from the API
    //console.log("Full response from the API:", result);

    // Loop through the choices and log each one with role and content
    for (const choice of result.choices) {
        console.log("Choice message content:", choice.message.content);
        console.log("Choice message role:", choice.message.role); // This should now give the correct role
    }

    return choice.message.content;
}
