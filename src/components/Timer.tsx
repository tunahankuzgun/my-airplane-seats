import React, { useEffect, useState } from "react";

const Timer: React.FC = () => {
    const [isIdle30, setIsIdle30] = useState(false); // 30-second warning
    const [isIdle45, setIsIdle45] = useState(false); // 45-second timeout
    const idle30Timeout = 30000; // 30 seconds for testing
    const idle45Timeout = 45000; // 45 seconds for testing

    // **UseRefs for timers to persist across renders**
    let timeout30 : NodeJS.Timeout;
    let timeout45 : NodeJS.Timeout;
    let timerActive = false;

    // **Clears all timers and resets states**
    const resetIdleTimer = () => {
        if(timerActive){
            if (timeout30) clearTimeout(timeout30);
            if (timeout45) clearTimeout(timeout45);
    
            setIsIdle30(false);
            setIsIdle45(false);

            // Remove event listeners
            window.removeEventListener("mousemove", resetIdleTimer);
            window.removeEventListener("keydown", resetIdleTimer);
            window.removeEventListener("click", resetIdleTimer);
    
            timerActive=false;
        }
    };

    // **Starts the idle timer**
    const startIdleTimer = () => {
        if(!timerActive){
            // Attach event listeners to detect user activity
            window.addEventListener("mousemove", resetIdleTimer);
            window.addEventListener("keydown", resetIdleTimer);
            window.addEventListener("click", resetIdleTimer);
    
            // Start timers initially
            timeout30 = setTimeout(() => setIsIdle30(true), idle30Timeout);
            timeout45 = setTimeout(() => setIsIdle45(true), idle45Timeout);
            timerActive=true;
        }

    };

    // **Handles timeout action**
    const handleNoAction = () => {
        localStorage.removeItem("selectedSeats"); // Clear selected seats
        localStorage.removeItem("userFormData"); // Clear form data
        window.location.reload();
    };

    useEffect(() => {
        // Timer to check `localStorage.selectedSeats` every 500ms
        const interval = setInterval(() => {
            if(!timerActive){
                const selectedSeats = localStorage.getItem("selectedSeats");
                if((selectedSeats && JSON.parse(selectedSeats).length > 0)) {
                    startIdleTimer(); // Stop timer if no seats are selected
                }
            }
            
        }, 500); // Check every 500ms
    
        // Cleanup: Clear interval and timers when the component unmounts
        return () => {
            clearInterval(interval);
            resetIdleTimer(); // Also stop idle timers
        };
    }, []); // Runs only once on mount

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
