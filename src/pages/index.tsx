import Seats from '@/components/Seat';
import Timer from '@/components/Timer';

export default function HomePage() {
    return(<div>
      <Timer />
      <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 0
      }}>
      <Seats />
        <svg width={110} height={50} stroke="#a6a6a6" strokeWidth="1" rx="3" xmlns="http://www.w3.org/2000/svg">
          <rect
            width={10}
            height={15}
            fill="#383838"
            x={5}
          />
          <text
            x={10}
            y={25}
            textAnchor="middle"
            fontSize="10"
            color= "#000"
          >
            Dolu
          </text>
          <rect
            width={10}
            height={15}
            fill="#EFCE64"
            x={45}
          />
          <text
            x={50}
            y={25}
            textAnchor="middle"
            fontSize="10"
            color= "#000"
          >
            Seçili
          </text>
          <rect
            width={10}
            height={15}
            fill="#F2F2F2"
            x={90}
          />
          <text
            x={95}
            y={25}
            textAnchor="middle"
            fontSize="10"
            color="#0000"
          >
            Boş
          </text>
        </svg>
      </div>
    </div>);

}
