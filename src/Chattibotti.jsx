import React, { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "./Chattibotti.css";

function ChatWindow() {
    const [messages, setMessages] = useState([
        {
            message: "Hello! How can I help you today?",
            sentTime: "just now",
            sender: "AI Bot",
        },
    ]);

    // Tracks the status of the checkbox
    const [isChecked, setIsChecked] = useState(true);

    // Change the value of isChecked
    const handleCheckBoxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleSend = async (text) => {
        if (text.trim() === "") return;

        const userMessage = {
            message: text,
            sentTime: new Date().toLocaleTimeString(),
            sender: "User",
        };

        // Update the chat with the user's message
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            // Send user input to the Flask API
            const response = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text, usePdfData: isChecked }),
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            const aiMessage = {
                message: data.response,
                sentTime: new Date().toLocaleTimeString(),
                sender: "AI Bot",
            };

            // Update the chat with the AI's response
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
        } catch (error) {
            console.error("Error fetching AI response:", error);

            // Display error message in chat
            const errorMessage = {
                message: "Sorry, something went wrong. Please try again later.",
                sentTime: new Date().toLocaleTimeString(),
                sender: "AI Bot",
            };

            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
    };

    return (
        <>
            <div
                style={{
                    height: "600px",
                    width: "450px",
                    margin: "20px auto",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
            >
                <MainContainer>
                    <ChatContainer>
                        <MessageList>
                            {messages.map((msg, index) => (
                                <Message
                                    key={index}
                                    model={msg}
                                    style={{
                                        borderRadius: "10px",
                                        marginBottom: "10px",
                                    }}
                                />
                            ))}
                        </MessageList>
                        <MessageInput
                            placeholder="Type your message here"
                            onSend={handleSend}
                            style={{
                                borderRadius: "20px",
                                marginTop: "10px",
                            }}
                        />
                    </ChatContainer>
                </MainContainer>
            </div>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={isChecked}
                        onChange={handleCheckBoxChange}
                    />
                }
                label="Use PDF data"
            />
        </>
    );
}

export default ChatWindow;
