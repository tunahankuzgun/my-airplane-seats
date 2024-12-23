import NotificationBox from '@/components/NotificationBox';
import UserForm, { UserFormData } from '@/components/UserForm';
import React, { useEffect, useRef, useState } from "react";

type SeatType = {
    id: string; // Unique identifier
    x: number; // X-coordinate
    y: number; // Y-coordinate
    width: number; // Seat width
    height: number; // Seat height
    status: "bos" | "secili" | "dolu" | "NaN"; // Seat status
};

type UserType = {
    id: number;
    name: string;
    username: string;
};

const fetchUsers = async (): Promise<UserType[]> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    return response.json();
};



const generateSeats = (): SeatType[] => {
    const seats: SeatType[] = [];
    const gapOffset = 40; // Gap height between rows //koltuklar 12e 16 aralıklar 2px e 4px koridor 20 px aralık 20px iki katı yapcam
    const corridorOffset = 40; // Gap height between rows
    var defaultSelected = 0;
    for (let rowIndex = 0; rowIndex < 19; rowIndex++) {
        for (let colIndex = 0; colIndex < 4; colIndex++) {
            seats.push({
                id: `${rowIndex * 4 + colIndex}`, // Unique identifier
                x: 120 + colIndex * 26 + (colIndex >= 2 ? corridorOffset : 0), // X-coordinate
                y: 20 + rowIndex * 36 + (rowIndex >= 4 ? gapOffset : 0), // Add gap after the 4th row
                width: 24, // Width of the seat
                height: 32, // Height of the seat
                status: defaultSelected < 10 ? "dolu" : "bos", // Default status
            });
            defaultSelected++;
        }
    }
    return seats;
};

const Seat: React.FC = () => {
    const [seats, setSeats] = useState<SeatType[]>(generateSeats());
    const [users, setUsers] = useState<UserType[]>([]);
    const [hoveredSeat, setHoveredSeat] = useState<SeatType | null>(null);
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [doluSeats, setDoluSeats] = useState<string[]>([]);
    const [doluSeatUsers, setDoluSeatUsers] = useState<UserFormData[]>([]);

    useEffect(() => {
        const savedUsers = localStorage.getItem("users");
        if (savedUsers) {
            // Parse the saved users and update the state
            setUsers(JSON.parse(savedUsers));
        } else {
            // Fetch users if not available in localStorage
            fetchUsers().then((fetchedUsers) => {
                setUsers(fetchedUsers);
                localStorage.setItem("users", JSON.stringify(fetchedUsers));
            });
        }
    }, []);

    useEffect(() => {
        const savedSelectedSeats = localStorage.getItem("selectedSeats");
        if (savedSelectedSeats) {
            setSelectedSeats(JSON.parse(savedSelectedSeats)); // Seçimleri yükle
            setSeats((prevSeats) =>
                prevSeats.map((seat) =>
                    JSON.parse(savedSelectedSeats).includes(seat.id)
                        ? { ...seat, status: "secili" }
                        : seat
                )
            );
        }
    }, []);

    useEffect(() => {
        const savedDoluSeats = localStorage.getItem("doluSeats");
        if (savedDoluSeats) {
            setDoluSeats(JSON.parse(savedDoluSeats)); // Seçimleri yükle
            setSeats((prevSeats) =>
                prevSeats.map((seat) =>
                    JSON.parse(savedDoluSeats).includes(seat.id)
                        ? { ...seat, status: "dolu" }
                        : seat
                )
            );
        }
    }, []);

    useEffect(() => {
        const savedDoluSeatUsers = localStorage.getItem("doluSeatUsers");
        if (savedDoluSeatUsers) {
            setDoluSeatUsers(JSON.parse(savedDoluSeatUsers)); // Seçimleri yükle
        }
    }, []);

    useEffect(() => {
        const userFormData = localStorage.getItem("userFormData");
        if (userFormData) {
            setFormDataList(JSON.parse(userFormData)); // Seçimleri yükle
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats));
    }, [selectedSeats]);

    const handleSeatHover = (seat: SeatType | null) => {
        seat?.status == "dolu" ? setHoveredSeat(seat) : setHoveredSeat(null);
    };

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [boxType, setBoxType] = useState("error");

    const handleSeatClick = (seatId: string) => {
        const seatToClick = seats.find((seat) => seat.id === seatId);
        const prevSelected = seats.filter((seat) => seat.status === "secili").map((seat) => seat.id);
        const currentSelectedCount = prevSelected.length;
        const statToBe = seatToClick?.status === "bos" ? "secili" : seatToClick?.status === "secili" ? "bos" : seatToClick?.status;
        var devam = true;
        if (seatToClick == undefined || statToBe == undefined) {
            return;
        }
        if (statToBe === "dolu") {
            setShowNotification(true);
            setNotificationMessage("Seçtiğiniz koltuk dolu!");
            devam = false;
            return;
        }
        if (seatToClick?.status === "bos" && currentSelectedCount >= 3) {
            setShowNotification(true);
            setNotificationMessage("En fazla 3 koltuk için seçim yapabilirsiniz!");
            devam = false;
            return;
        }
        if (devam) {
            setSeats((prevSeats) =>
                prevSeats.map((seat) =>
                    seat.id === seatId
                        ? { ...seat, status: statToBe }
                        : seat
                )
            );
        }
        if (devam) {
            const id = seatToClick.id;
            let updated = prevSelected;
            if (statToBe === "secili") {
                updated.push(id);
            } else if (statToBe === "bos") {
                updated = prevSelected.filter((iid) => iid !== id);
                setFormDataList(((prev)=>prev.filter((fd)=>fd.id !== id)));
            }
            setSelectedSeats(updated);
        }
    };
    // Form için referans
    const formRef = useRef<HTMLFormElement | null>(null);

    // Buton Tıklama İşlemi
    const [formDataList, setFormDataList] = useState<UserFormData[]>([]);

    const handleFormChange = (id: string, data: UserFormData) => {
        setFormDataList((prev) => {
            // Önce mevcut verileri kontrol et
            const index = prev.findIndex((item) => item.id === id);
            // Yeni veriyi oluştur
            const updated = {
                id: id,
                isim: data.isim,
                soyisim: data.soyisim,
                telefon: data.telefon,
                eposta: data.eposta,
                cinsiyet: data.cinsiyet,
                dogumTarihi: data.dogumTarihi,
                errors: {
                    name: null,
                    surname: null,
                    phone: null,
                    email: null,
                    gender: null,
                    birthDate: null
                  }
            };
            // Eğer ID varsa, güncelle
            if (index !== -1) {
                const newList = [...prev];
                newList[index] = updated;
                return newList; // Yeni referans döndür
            } else {
                // ID yoksa ekle
                return [...prev, updated]; // Yeni referans döndür
            }
        });
    };

    useEffect(() => {
        localStorage.setItem("userFormData", JSON.stringify(formDataList));
    }, [formDataList]);

    const validateForm = (form: UserFormData) => {
        const errors = {
            name: form.isim && form.isim.trim().length > 0 ? null : 'İsim boş olamaz.',
            surname: form.soyisim && form.soyisim.trim().length > 0 ? null : 'Soyisim boş olamaz.',
            phone: form.telefon && form.telefon.trim().length > 0 && /^[0-9]{10}$/.test(form.telefon) ? null : 'Geçersiz telefon numarası.',
            email: form.eposta && form.eposta.trim().length > 0 && /\S+@\S+\.\S+/.test(form.eposta) ? null : 'Geçersiz e-posta adresi.',
            gender: form.cinsiyet && form.cinsiyet.trim().length > 0 ? null : 'Cinsiyet seçimi yapılmalıdır.',
            birthDate: form.dogumTarihi && form.dogumTarihi.trim().length > 0 ? null : 'Doğum tarihi boş olamaz.'
        };
        return errors;
    };

    const handleSubmitButtonClick = () => {
        if(formDataList == null || formDataList.length==0 || selectedSeats.length>formDataList.length){
            setShowNotification(true);
            setNotificationMessage("Kişi bilgileri eksik. Lütfen tüm alanları doldurunuz.");
            return;
        }
        let newSeats: string[] = []; // Explicitly typing newSeats
        let newUsers: UserFormData[] = []; // Explicitly typing newUsers, can be a more specific type if needed
    
        formDataList.forEach((e,index) => {
            const errors = validateForm(e);
            if (e == null || Object.values(errors).some((error) => error !== null)) {
                // Correct the trim() method
                let updateWithErrors = e;
                updateWithErrors.errors = errors;
                const newForms = [...formDataList];
                newForms[index] = updateWithErrors;
                setFormDataList(newForms);
                setShowNotification(true);
                setNotificationMessage((Number(e.id) + 1) + " numaralı koltuk için " + (selectedSeats.indexOf(e.id) + 1) + ". Yolcu bilgileri eksik ya da hatalı. Lütfen tüm alanları doldurunuz.");
                newSeats.push("-1");
            } else {
                newSeats.push(e.id);
                newUsers.push(e);
            }

        });

        if(!newSeats.includes("-1")&&newSeats.length>0 && newUsers.length>0){
            setDoluSeats((prev) => [...prev, ...newSeats]);
            setDoluSeatUsers((prev) => [...prev, ...newUsers]);
            setSelectedSeats([]); // Reset selected seats after updating
            setFormDataList([]);//reset form data
            setBoxType("success");
            setShowNotification(true);
            setNotificationMessage("Rezervasyon işlemleri başarılı!");
            window.location.reload();
        }
    };

    useEffect(() => {
        localStorage.setItem("doluSeats", JSON.stringify(doluSeats));
    }, [doluSeats]);

    useEffect(() => {
        localStorage.setItem("doluSeatUsers", JSON.stringify(doluSeatUsers));
    }, [doluSeatUsers]);


    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Handle mouse move event
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        setMousePosition({ x: clientX, y: clientY });
    };


    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}
        onMouseMove={handleMouseMove}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 850" width="400" height="600">
                {seats.map((seat) => (
                    <rect
                        key={seat.id}
                        x={seat.x}
                        y={seat.y}
                        width={seat.width}
                        height={seat.height}
                        fill={seat.status === "bos" ? "#F2F2F2" : seat.status === "dolu" ? " #383838" : "#EFCE64"}
                        stroke="#a6a6a6"
                        strokeWidth="1"
                        rx="3"
                        onMouseEnter={() => handleSeatHover(seat)}
                        onMouseLeave={() => handleSeatHover(null)}
                        onClick={() => handleSeatClick(seat.id)}
                    />
                    
                ))}
            </svg>
            {showNotification && (
                <NotificationBox
                    message={notificationMessage}
                    onClose={() => setShowNotification(false)} // Close notification
                    boxType={boxType}
                />
            )}
            {hoveredSeat && (
                <div
                    style={{
                        position: "fixed",
                        top: mousePosition.y+5,
                        left: mousePosition.x+5,
                        background: "#ffffff",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        pointerEvents: "none",
                    }}
                >
                    <h4 style={{ margin: 0, color: "#000" }}>
                    <span style={{ fontWeight: "bold" }}>Koltuk:</span> {parseInt(hoveredSeat.id) + 1}
                    </h4>
                    {users.length > 0 && parseInt(hoveredSeat.id)<10? (
                        <>
                            <p style={{ margin: 0, color: "#000" }}>
                                <strong>İsim Soyisim:</strong>
                            </p>
                            <p style={{ margin: 0, color: "#000" }}>
                                {users[parseInt(hoveredSeat.id) % users.length]?.name}
                            </p>
                        </>
                    ) : doluSeats.includes(hoveredSeat.id)?(
                        <>
                            <p style={{ margin: 0, color: "#000" }}>
                            <strong>İsim Soyisim:</strong>
                            </p>
                            <p style={{ margin: 0, color: "#000" }}>
                            {doluSeatUsers.filter(e=>e.id===hoveredSeat.id).pop()?.isim + " "+ doluSeatUsers.filter(e=>e.id===hoveredSeat.id).pop()?.soyisim}
                            </p>
                        </>
                    ):(
                        <p>Loading...</p>
                    )}
                </div>
            )}
            {/* Display Selected Seats */}
            <div style={{ marginTop: "20px", textAlign: "center" }}>
                {selectedSeats.length > 0 ? (
                    <>
                        <ul style={{marginBottom: '100px' }}>
                            {selectedSeats.map((seat) => (
                                <div key={seat} style={{marginBottom: '10px' }}>
                                    {formDataList.filter(e => e.id === seat) ? (
                                        // Eğer seat ile eşleşen formData varsa
                                        <UserForm
                                            dataFromSeats={formDataList.filter(e => e.id === seat).pop()}
                                            ref={formRef}
                                            sıra={selectedSeats.indexOf(seat) + 1}
                                            onChange={(data) => handleFormChange(seat, data)}
                                        />
                                    ) : (
                                        // Eğer seat ile eşleşen formData yoksa yeni bir form render et
                                        <UserForm
                                        dataFromSeats={null}
                                            ref={formRef}
                                            sıra={selectedSeats.indexOf(seat) + 1}
                                            onChange={(data) => handleFormChange(seat, data)}
                                        />
                                    )}
                                </div>
                            ))}

                        </ul>
                        <div>
                            <button style={{
                                border: '2px solid #ccc',
                                backgroundColor: '#c7c7c7',
                            }} onClick={handleSubmitButtonClick}>
                                <span style={{ marginLeft: '140px',  marginRight: '140px', fontSize: '20px', lineHeight: '50px'}}>İşlemleri Tamamla</span></button>
                                {showNotification && (
                                    <NotificationBox
                                        message={notificationMessage}
                                        onClose={() => setShowNotification(false)}
                                        boxType={boxType} // Close notification
                                    />
                                )}
                        </div>
                        <h4 style={{
                                border: '2px solid #ccc',
                                backgroundColor: '#c9c9c9',
                                marginTop: '20px',
                                lineHeight:'100px',
                                marginLeft:'-40px',
                                marginRight:'-40px'
                            }}>
                            <div style={{ display: 'flex',  justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginLeft: '40px' }}>
                                    {selectedSeats.map((seat) => (
                                    <div key={seat} style={{
                                        width: '20px',
                                        height: '35px',
                                        backgroundColor: '#EFCE64',
                                        marginRight: '5px',
                                        alignItems: 'center', // Dikey hizalama
                                        justifyContent: 'center', // Yatay hizalama
                                        color: 'black', // Metin rengi siyah
                                        textAlign: 'center', // Metni ortalamak
                                        lineHeight: '35px', // Metni dikeyde ortalar (yükseklik ile aynı olmalı)
                                        border: '0.5px solid rgb(197, 169, 169)' // Border with width, style, and color
                                    }}>{(Number(seat) + 1)}</div>
                                ))}
                                </div>
                                <div style={{ justifyContent: 'flex-end'  }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px',justifyContent: 'flex-end', marginBottom:'-80px'}}>
                                        {selectedSeats.length} x
                                        <div style={{
                                            width: '10px',
                                            height: '10px',
                                            backgroundColor: '#EFCE64',
                                        }}></div>
                                    </div>
                                    {selectedSeats.length * 1000} TL
                                </div>
                            </div>
                        </h4>
                    </>
                ) : (
                    <p>No seats selected.</p>
                )}
            </div>
        </div>
    );
};

export default Seat;
