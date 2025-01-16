import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import ConfirmationPopup from "./ConfirmationPopup";
import "./Chattibotti.css";

function ChatWindow({ language, setLanguage, theme, setTheme }) {
    const navigate = useNavigate();

    const [messages, setMessages] = useState([
        {
            message:
                language === "fi"
                    ? "Hei! Miten voin auttaa?"
                    : "Hello! How can I help you today?",
            sentTime: "just now",
            sender: "AI Bot",
        },
    ]);

    const [isChecked, setIsChecked] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [pendingAction, setPendingAction] = useState(null);
    const [popupMessage, setPopupMessage] = useState("");

    const handleCheckBoxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const handleConfirm = () => {
        if (pendingAction) {
            const { action, data } = pendingAction;

            if (action === "toggle_theme" && data.theme) {
                setTheme(data.theme);
            } else if (action === "toggle_language" && data.language) {
                setLanguage(data.language);
            } else if (action === "redirect" && data.url) {
                navigate(data.url);
            }

            setPendingAction(null);
        }
        setShowPopup(false);
    };

    const handleCancel = () => {
        setPendingAction(null);
        setShowPopup(false);
    };

    const handleSend = async (text) => {
        if (text.trim() === "") return;

        const userMessage = {
            message: text,
            sentTime: new Date().toLocaleTimeString(),
            sender: "User",
        };

        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            const response = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text, usePdfData: isChecked }),
            });

            const data = await response.json();
            console.log(data);

            if (data.action) {
                let confirmMessage = "";
                if (data.action === "toggle_theme") {
                    confirmMessage =
                        language === "fi"
                            ? "Haluatko vaihtaa teeman?"
                            : "Do you want to change the theme?";
                } else if (data.action === "toggle_language") {
                    confirmMessage =
                        language === "fi"
                            ? "Haluatko vaihtaa kieltä?"
                            : "Do you want to change the language?";
                } else if (data.action === "redirect") {
                    confirmMessage =
                        language === "fi"
                            ? "Haluatko siirtyä uudelle sivulle?"
                            : "Do you want to navigate to a new page?";
                }

                setPopupMessage(confirmMessage);
                setPendingAction({ action: data.action, data });
                setShowPopup(true);
                return;
            }

            const aiMessage = {
                message:
                    data.response ||
                    (language === "fi"
                        ? "Toiminto suoritettu onnistuneesti."
                        : "Action performed successfully."),
                sentTime: new Date().toLocaleTimeString(),
                sender: "AI Bot",
            };

            setMessages((prevMessages) => [...prevMessages, aiMessage]);
        } catch (error) {
            console.error("Error fetching AI response:", error);
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
                            style={{ borderRadius: "20px", marginTop: "10px" }}
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
                label={language === "fi" ? "Käytä PDF dataa" : "Use PDF data"}
            />

            {showPopup && (
                <ConfirmationPopup
                    message={popupMessage}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
        </>
    );
}

export default ChatWindow;
