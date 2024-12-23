import Seats from '@/components/Seat';
import Timer from '@/components/Timer';

export default function HomePage() {
    return(<div>
      <Timer />
      <div style={{
          display: 'flex',
          flexDirection: 'column',  // Stack elements vertically
          justifyContent: 'center', // Vertically center all content
          alignItems: 'center',     // Horizontally center all content
          margin: 0
      }}>
      <Seats />
        <svg width={110} height={50} stroke="#a6a6a6" strokeWidth="1" rx="3" xmlns="http://www.w3.org/2000/svg">
          <rect
            width={10}
            height={15}
            fill="#383838"
            x={5} // İlk dikdörtgenin konumu
          />
          <text
            x={10} // Yatayda metnin ortalanması için x koordinatı
            y={25} // Dikdörtgenin altına konumlandırmak için y koordinatı
            textAnchor="middle" // Metni yatayda ortalar
            fontSize="10" // Yazı boyutu
            color= "#000"// Yazı rengi
          >
            Dolu
          </text>
          <rect
            width={10}
            height={15}
            fill="#EFCE64"
            x={45} // İkinci dikdörtgenin konumu (ilk dikdörtgenin sağında)
          />
          <text
            x={50} // Yatayda metnin ortalanması için x koordinatı
            y={25} // Dikdörtgenin altına konumlandırmak için y koordinatı
            textAnchor="middle" // Metni yatayda ortalar
            fontSize="10" // Yazı boyutu
            color= "#000" // Yazı rengi
          >
            Seçili
          </text>
          <rect
            width={10}
            height={15}
            fill="#F2F2F2"
            x={90} // Üçüncü dikdörtgenin konumu (ikinci dikdörtgenin sağında)
          />
          <text
            x={95} // Yatayda metnin ortalanması için x koordinatı
            y={25} // Dikdörtgenin altına konumlandırmak için y koordinatı
            textAnchor="middle" // Metni yatayda ortalar
            fontSize="10" // Yazı boyutu
            color="#0000" // Yazı rengi
          >
            Boş
          </text>
        </svg>
      </div>
    </div>);

}
