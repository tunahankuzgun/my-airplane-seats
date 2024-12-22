import React, { forwardRef, useEffect, useState } from 'react';

// Form veri tipi
export type UserFormData = {
    id: string;
    isim: string;
    soyisim: string;
    telefon: string;
    eposta: string;
    cinsiyet: '' | 'erkek' | 'kadın';
    dogumTarihi: string;
    errors: {
        name: string | null;
        surname: string | null;
        phone: string | null;
        email: string | null;
        gender: string | null;
        birthDate: string | null;
      };
};

// Props tipi
type UserFormProps = {
    onChange: (data: UserFormData) => void; // Submit işlemi
    sıra: number;
    dataFromSeats: UserFormData | undefined| null;

};

// Form Bileşeni
const UserForm = forwardRef<HTMLFormElement, UserFormProps>(({ onChange, sıra, dataFromSeats }, ref) => {
    // Form verileri
    const [formData, setFormData] = useState<UserFormData>({
        id:'',
        isim: '',
        soyisim: '',
        telefon: '',
        eposta: '',
        cinsiyet: '', // Varsayılan boş değer
        dogumTarihi: '',
        errors: {
            name: null,
            surname: null,
            phone: null,
            email: null,
            gender: null,
            birthDate: null
          }
    });

    useEffect(() => {
        if (dataFromSeats) {
            setFormData(dataFromSeats);
        }
      }, [dataFromSeats]);


    // Değişiklikleri izler
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        onChange({
            ...formData,
            [name]: value,
        });
    };

    // Form Submit işlemi
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Sayfanın yenilenmesini engelle
        console.log('Form verileri gönderiliyor:', formData);
        //onSubmit(formData); // Üst bileşene verileri gönder
    };
    const [isCollapsed, setIsCollapsed] = useState(true); // State to track collapse status

    // Toggle the collapse state
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div>
            <button onClick={toggleCollapse}>
                {isCollapsed ? sıra+ '. Yolcu      >' : sıra+'. Yolcu      v'}
            </button>
            <div style={{ display: isCollapsed ? 'none' : 'block' }}>
                <form ref={ref} onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label>İsim: </label>
                        <input
                          style={{ margin: 0, color: "#000" }}
                            type="text"
                            name="isim"
                            value={formData.isim}
                            onChange={handleChange}
                            required
                        />
                        {formData.errors.name && <p className="text-red-500 text-sm">{formData.errors.name}</p>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column'}}>
                        <label>Soyisim: </label>
                        <input
                         style={{ margin: 0, color: "#000" }}
                            type="text"
                            name="soyisim"
                            value={formData.soyisim}
                            onChange={handleChange}
                            required
                        />
                        {formData.errors.surname && <p className="text-red-500 text-sm">{formData.errors.surname}</p>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column'}}>
                        <label>Telefon: </label>
                        <input
                         style={{ margin: 0, color: "#000" }}
                            type="tel"
                            name="telefon"
                            value={formData.telefon}
                            onChange={handleChange}
                            required
                        />
                        {formData.errors.phone && <p className="text-red-500 text-sm">{formData.errors.phone}</p>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column'  }}>
                        <label>E-posta: </label>
                        <input
                             style={{ margin: 0, color: "#000" }}
                            type="email"
                            name="eposta"
                            value={formData.eposta}
                            onChange={handleChange}
                            required
                        />
                        {formData.errors.email && <p className="text-red-500 text-sm">{formData.errors.email}</p>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label>Cinsiyet: </label>
                        <select style={{ margin: 0, color: "#000" }} name="cinsiyet" value={formData.cinsiyet} onChange={handleChange} required>
                            <option disabled style={{ display: 'none' }} value="">Seçiniz</option>
                            <option value="erkek">Erkek</option>
                            <option value="kadın">Kadın</option>
                        </select>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label>Doğum Tarihi: </label>
                        <input
                            style={{ margin: 0, color: "#000" }}
                            type="date"
                            name="dogumTarihi"
                            value={formData.dogumTarihi}
                            onChange={handleChange}
                            required
                        />
                        {formData.errors.birthDate && <p className="text-red-500 text-sm">{formData.errors.birthDate}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
});

export default UserForm;
