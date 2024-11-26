// src/ChatWindow.js
import React, { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react";

function ChatWindow() {
    const [messages, setMessages] = useState([
        {
            message: "Hello! How can I help you today?",
            sentTime: "just now",
            sender: "AI Bot",
        },
    ]);

    // Function to simulate AI response (replace this with real API call later)
    const getAIResponse = (userMessage) => {
        // Simple AI simulation: responds with a predefined answer based on user input
        if (userMessage.toLowerCase().includes("hello")) {
            return "Hi there! How can I assist you today?";
        }
        return "I'm sorry, I didn't quite understand that. Could you please clarify?";
    };

    const handleSend = (text) => {
        if (text.trim() === "") return;

        // User's message
        const userMessage = {
            message: text,
            sentTime: new Date().toLocaleTimeString(),
            sender: "You",
        };

        setMessages((prevMessages) => [...prevMessages, userMessage]);

        // Simulate AI response after a short delay
        setTimeout(() => {
            const aiMessage = {
                message: getAIResponse(text),
                sentTime: new Date().toLocaleTimeString(),
                sender: "AI Bot",
            };

            setMessages((prevMessages) => [...prevMessages, aiMessage]);
        }, 1000); // Simulating a 1-second delay for AI response
    };

    return (
        <div
            style={{
                position: "relative",
                height: "500px",
                width: "400px",
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
                                    backgroundColor:
                                        msg.sender === "AI Bot"
                                            ? "transparent"
                                            : "#0084ff",
                                    color:
                                        msg.sender === "AI Bot"
                                            ? "#333"
                                            : "white",
                                    alignSelf:
                                        msg.sender === "AI Bot"
                                            ? "flex-start"
                                            : "flex-end",
                                    borderRadius: "10px",
                                    padding: "10px",
                                    maxWidth: "80%",
                                    wordBreak: "break-word",
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
    );
}

export default ChatWindow;
