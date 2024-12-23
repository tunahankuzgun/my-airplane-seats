import React from "react";

const NotificationBox: React.FC<{ message: string; onClose: () => void, boxType: string }> = ({ message, onClose, boxType }) => {
    return (
        <>
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 9998,
                }}
                onClick={onClose}
            />

            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    padding: "15px",
                    backgroundColor: boxType=="error"?"  #f8d7da":"  rgb(188, 240, 201)",
                    color: boxType=="error"?"  #721c24":"  rgb(22, 70, 33)",
                    border: boxType=="error"?"1px solid #f5c6cb":"1px solid rgb(163, 240, 182)",
                    borderRadius: "5px",
                    zIndex: 9999,
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    
                }}
            >
                <span>{message}</span>
                <button
                    onClick={onClose}
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
