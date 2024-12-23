import React, { useEffect, useState } from "react";

const Timer: React.FC = () => {
    const [isIdle30, setIsIdle30] = useState(false);
    const [isIdle45, setIsIdle45] = useState(false);
    const idle30Timeout = 30000;
    const idle45Timeout = 45000;

    let timeout30 : NodeJS.Timeout;
    let timeout45 : NodeJS.Timeout;
    let timerActive = false;

    const resetIdleTimer = () => {
        if(timerActive){
            if (timeout30) clearTimeout(timeout30);
            if (timeout45) clearTimeout(timeout45);
    
            setIsIdle30(false);
            setIsIdle45(false);

            window.removeEventListener("mousemove", resetIdleTimer);
            window.removeEventListener("keydown", resetIdleTimer);
            window.removeEventListener("click", resetIdleTimer);
    
            timerActive=false;
        }
    };

    const startIdleTimer = () => {
        if(!timerActive){
            window.addEventListener("mousemove", resetIdleTimer);
            window.addEventListener("keydown", resetIdleTimer);
            window.addEventListener("click", resetIdleTimer);
    
            timeout30 = setTimeout(() => setIsIdle30(true), idle30Timeout);
            timeout45 = setTimeout(() => setIsIdle45(true), idle45Timeout);
            timerActive=true;
        }

    };

    const handleNoAction = () => {
        localStorage.removeItem("selectedSeats");
        localStorage.removeItem("userFormData");
        window.location.reload();
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if(!timerActive){
                const selectedSeats = localStorage.getItem("selectedSeats");
                if((selectedSeats && JSON.parse(selectedSeats).length > 0)) {
                    startIdleTimer();
                }
            }
            
        }, 500);
        return () => {
            clearInterval(interval);
            resetIdleTimer();
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
            {isIdle45 && (() => { handleNoAction(); return null; })()}
        </div>
    );
};

export default Timer;
