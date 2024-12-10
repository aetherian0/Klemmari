import React from "react";
import "./ConfirmationPopup.css";

function ConfirmationPopup({ message, onConfirm, onCancel }) {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <p>{message}</p>
                <button onClick={onConfirm}>Yes</button>
                <button onClick={onCancel}>No</button>
            </div>
        </div>
    );
}

export default ConfirmationPopup;
