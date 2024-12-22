import React from "react";

const AirplaneLayout: React.FC = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 500"
        width="300"
        height="500"
      >
        {/* Airplane Body */}
        <rect x="110" y="0" width="80" height="500" fill="#e6e6e6" />
        {/* Left Wings */}
        <polygon points="110,100 50,200 110,300" fill="#cccccc" />
        {/* Right Wings */}
        <polygon points="190,100 250,200 190,300" fill="#cccccc" />
        {/* Tail */}
        <polygon points="110,450 150,500 190,450" fill="#cccccc" />
        {/* Seats */}
        {[...Array(12)].map((_, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {[...Array(4)].map((_, colIndex) => (
              <rect
                key={`${rowIndex}-${colIndex}`}
                x={120 + colIndex * 20}
                y={20 + rowIndex * 40}
                width="15"
                height="30"
                fill="#d9d9d9"
                stroke="#a6a6a6"
                strokeWidth="1"
                rx="3"
              />
            ))}
          </React.Fragment>
        ))}
      </svg>
    </div>
  );
};

export default AirplaneLayout;