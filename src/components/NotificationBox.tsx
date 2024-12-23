import React from "react";

const NotificationBox: React.FC<{ message: string; onClose: () => void, boxType: string }> = ({ message, onClose, boxType }) => {
    return (
        <>
            {/* Full-screen overlay to block interaction */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
                    zIndex: 9998, // Make sure the overlay is behind the notification box
                }}
                onClick={onClose} // Close notification when clicking on the overlay
            />

            {/* Notification Box */}
            <div
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the notification box
                style={{
                    position: "fixed", // Fixed position to stay in place
                    top: "50%",        // Center vertically
                    left: "50%",       // Center horizontally
                    transform: "translate(-50%, -50%)", // Adjust to exact center
                    padding: "15px",
                    backgroundColor: boxType=="error"?"  #f8d7da":"  rgb(188, 240, 201)", // Background color
                    color: boxType=="error"?"  #721c24":"  rgb(22, 70, 33)",          // Text color
                    border: boxType=="error"?"1px solid #f5c6cb":"1px solid rgb(163, 240, 182)", // Border style
                    borderRadius: "5px",      // Rounded corners
                    zIndex: 9999,             // High z-index to stay above the overlay
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Shadow effect
                    
                }}
            >
                <span>{message}</span>
                <button
                    onClick={onClose} // Close button handler
                    style={{
                        marginLeft: "10px",
                        background: "none",
                        border: "none",
                        color: boxType == "error" ? "1px solid #721c24":"1px solid rgb(11, 65, 24)",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                >
                    ✕
                </button>
            </div>
        </>
    );
};

export default NotificationBox;
