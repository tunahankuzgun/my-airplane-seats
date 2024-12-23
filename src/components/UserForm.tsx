import React, { forwardRef, useEffect, useState } from 'react';

export type UserFormData = {
    id: string;
    name: string;
    surname: string;
    phone: string;
    email: string;
    gender: '' | 'erkek' | 'kadın';
    birthDate: string;
    errors: {
        name: string | null;
        surname: string | null;
        phone: string | null;
        email: string | null;
        gender: string | null;
        birthDate: string | null;
    };
};

type UserFormProps = {
    onChange: (data: UserFormData) => void;
    index: number;
    dataFromSeats: UserFormData | undefined| null;

};

const UserForm = forwardRef<HTMLFormElement, UserFormProps>(({ onChange, index, dataFromSeats }, ref) => {
    const [formData, setFormData] = useState<UserFormData>({
        id:'',
        name: '',
        surname: '',
        phone: '',
        email: '',
        gender: '',
        birthDate: '',
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form verileri gönderiliyor:', formData);
    };
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div>
            <button onClick={toggleCollapse} style={{
                border: '2px solid #ccc',
                backgroundColor: '#c7c7c7'
            }}>
                <span style={{ marginLeft: '10px' }}>{index}. Yolcu</span>
                <span style={{  verticalAlign: 'middle', fontSize: '24px',marginLeft: '350px', marginRight: '10px', color:'#fff', display: 'inline-block', transform: isCollapsed ? 'rotate(0deg)' : 'rotate(90deg)' }}>{'>'}</span>
            </button>
            <div style={{ display: isCollapsed ? 'none' : 'block' }}>
                <form ref={ref} onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label>İsim: </label>
                        <input
                            style={{ margin: 0, color: "#000" }}
                            type="text"
                            name="name"
                            value={formData.name}
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
                            name="surname"
                            value={formData.surname}
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
                            name="phone"
                            value={formData.phone}
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
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {formData.errors.email && <p className="text-red-500 text-sm">{formData.errors.email}</p>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label>Cinsiyet: </label>
                        <select style={{ margin: 0, color: "#000" }} name="gender" value={formData.gender} onChange={handleChange} required>
                            <option disabled style={{ display: 'none' }} value="">Seçiniz</option>
                            <option value="erkek">Erkek</option>
                            <option value="kadın">Kadın</option>
                        </select>
                        {formData.errors.gender && <p className="text-red-500 text-sm">{formData.errors.gender}</p>}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label>Doğum Tarihi: </label>
                        <input
                            style={{ margin: 0, color: "#000" }}
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
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
