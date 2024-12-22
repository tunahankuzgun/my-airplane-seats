import React, { useEffect, useState } from "react";

const Timer: React.FC = () => {
    const [isIdle30, setIsIdle30] = useState(false); // 30 saniye uyarısı için
    const [isIdle45, setIsIdle45] = useState(false); // 45 saniye uyarısı için
    const idle30Timeout = 30000; // 30 saniye
    const idle45Timeout = 45000; // 45 saniye

    const handleNoAction = () => {
        localStorage.removeItem("selectedSeats"); // Seçimleri temizle
        window.location.reload();
    }
    useEffect(() => {
        let timeout30: NodeJS.Timeout;
        let timeout45: NodeJS.Timeout;
        const resetIdleTimer = () => {
            clearTimeout(timeout30);
            clearTimeout(timeout45);
            setIsIdle30(false);
            setIsIdle45(false);
            timeout45 = setTimeout(() => setIsIdle45(true), idle45Timeout);
            timeout30 = setTimeout(() => setIsIdle30(true), idle30Timeout);
        };
        window.addEventListener("mousemove", resetIdleTimer);
        window.addEventListener("keydown", resetIdleTimer);
        window.addEventListener("click", resetIdleTimer);
        timeout30 = setTimeout(() => setIsIdle30(true), idle30Timeout);
        timeout30 = setTimeout(() => setIsIdle45(true), idle45Timeout);
        return () => {
            clearTimeout(timeout30);
            clearTimeout(timeout45);
            window.removeEventListener("mousemove", resetIdleTimer);
            window.removeEventListener("keydown", resetIdleTimer);
            window.removeEventListener("click", resetIdleTimer);
        };
    }, []);
    return (
        <div>
            {isIdle30 && (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "white",
                        border: "1px solid black",
                        padding: "20px",
                        zIndex: 1000,
                    }}
                >
                    <p style={{ margin: 0, color: "#000" }}>İşleme devam etmek istiyor musunuz?</p>
                </div>
            )}
            {isIdle45 && (() => {handleNoAction(); return null; })()}
        </div>
    );
};

export default Timer;
