import React, { useState, useEffect } from 'react';
import style from './Location.module.scss';
import { IoIosArrowBack } from "react-icons/io";
import { LuCopy } from "react-icons/lu";
import ExpargoMenu from '../../loginPage/sections/expargoMenu/ExpargoMenu';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Location = () => {
    const [selectedCountry, setSelectedCountry] = useState('turkey'); // default Turkey
    const [selectedCity, setSelectedCity] = useState('');
    const navigate = useNavigate();

    // Redux-dan user məlumatını götürürük
    const user = useSelector(state => state.auth.user);

    // Türkiyə seçildikdə default olaraq İstanbul açıq olsun
    useEffect(() => {
        if (selectedCountry === 'turkey') {
            setSelectedCity('istanbul');
        }
    }, [selectedCountry]);

    // Kopyalama funksiyası
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => alert("Məlumat kopyalandı ✅"))
            .catch(() => alert("Xəta baş verdi ❌"));
    };

    const handleCountryClick = (country) => {
        setSelectedCountry(country);
        if (country !== 'turkey') setSelectedCity('');
    };

    const handleCityClick = (city) => {
        setSelectedCity(city);
    };

    if (!user) {
        return (
            <div className={style.location}>
                <ExpargoMenu />
                <div className={style.locationContainer}>
                    <h2 onClick={() => navigate(-1)}><IoIosArrowBack /> Xarici Ünvanlarım</h2>
                    <p>İstifadəçi məlumatları mövcud deyil.</p>
                </div>
            </div>
        );
    }

    // User məlumatlarını ünvanlara uyğun şəkildə yerləşdiririk
    // Məsələn burada user-dən ad, email, telefon kimi məlumatları çəkirik

    const cityData = {
        istanbul: [
            { label: 'Ad Soyad', value: user.name || '–' },
            { label: 'Eposta adresi', value: user.email || '–' },
            { label: 'Adres başlığı', value: 'EXPARGO / DEPO' },
            { label: 'Şehir', value: 'İstanbul' },
            { label: 'Cep №', value: '0 531 726 3762' },
            { label: 'Ülke', value: 'Türkiye' },
            { label: 'Adres', value: 'EXP1317146, Güzelyurt mah. 2128. Sokak Depo no: 4/i EXP1317146' },
            { label: 'Mahalle/Semt', value: 'Güzelyurt mah.' },
            { label: 'İlçe', value: 'Esenyurt' },
            { label: 'TC No', value: '3810935102 və ya 11111111111' },
            { label: 'Posta kodu', value: '34515' },
        ],
        igdir: [
            { label: 'Ad Soyad', value: user.name || '–' },
            { label: 'Eposta adresi', value: user.email || '–' },
            { label: 'Adres başlığı', value: 'EXPARGO / DEPO' },
            { label: 'Şehir', value: 'Iğdır' },
            { label: 'Cep №', value: '0 531 726 3762'  },
            { label: 'Ülke', value: 'Türkiye' },
            { label: 'Adres', value: 'EXP1317146, Güzelyurt mah. 2128. Sokak Depo no: 4/i EXP1317146' },
            { label: 'Mahalle/Semt', value: 'Bağlar mah.' },
            { label: 'İlçe', value: 'Merkez' },
            { label: 'TC No', value:' 11111111111 ' },
            { label: 'Posta kodu', value: '76000' },
        ],
        usa: [
            { label: 'Full name', value: user.name || '–' },
            { label: 'Address Line 1', value: '1620 Johnson Way - EXP1317146' },
            { label: 'Address Line 2', value: 'EXPARGO - EXP1317146' },
            { label: 'City / Town', value: 'New Castle' },
            { label: 'Province / State / Region', value: 'USA - Note: No Weekend Delivery!' },
            { label: 'Zip / Postal code', value: '19720' },
            { label: 'Phone number', value:  '+1 (302) 533-8222' },
        ]
    };

    return (
        <div className={style.location}>
            <ExpargoMenu />
            <div className={style.locationContainer}>
                <h2 onClick={() => navigate(-1)}><IoIosArrowBack /> Xarici Ünvanlarım</h2>
                <div className={style.container}>
                    {/* Country selection */}
                    <div className={style.btnContainer}>
                        <div className={style.btnTop}>
                            <button
                                className={selectedCountry === 'turkey' ? style.active : ''}
                                onClick={() => handleCountryClick('turkey')}
                            >
                                Türkiyə
                            </button>
                            <button
                                className={selectedCountry === 'usa' ? style.active : ''}
                                onClick={() => handleCountryClick('usa')}
                            >
                                ABŞ
                            </button>
                        </div>
                    </div>

                    {/* City buttons only for Turkey */}
                    {selectedCountry === 'turkey' && (
                        <div className={style.btnBox}>
                            <button
                                className={selectedCity === 'istanbul' ? style.active : ''}
                                onClick={() => handleCityClick('istanbul')}
                            >
                                İstanbul
                            </button>
                            <button
                                className={selectedCity === 'igdir' ? style.active : ''}
                                onClick={() => handleCityClick('igdir')}
                            >
                                Iğdır
                            </button>
                        </div>
                    )}

                    <div className={style.infoContainer}>
                        {/* İstanbul */}
                        {selectedCountry === 'turkey' && selectedCity === 'istanbul' && (
                            <div className={style.istanbul}>
                                <div className={style.istanbulContainer}>
                                    {cityData.istanbul.map(({ label, value }, i) => (
                                        <div key={i} className={style.card}>
                                            <div className={style.info}>
                                                <p>{label}</p><span>{value}</span>
                                            </div>
                                            <LuCopy onClick={() => handleCopy(value)} />
                                        </div>
                                    ))}
                                </div>
                                <div className={style.text}>
                                    <p>Qeyd:</p>
                                    <span>Daha sərfəli tariflər üçün, aşağıdakı EXPARGO Iğdır ünvanından istifadə edə bilərsiniz:</span>
                                    <span>İl: IĞDIR</span>
                                    <span>İlce: MERKEZ</span>
                                    <span>Mahalle: BAĞLAR</span>
                                    <span>Adres: Bağlar mah.36. Sokak Ferdi apartmanı.No: 19/B.</span>
                                    <span>Sifariş zamanı Expargo ID kodunuzu qeyd etməyi unutmayın!</span>
                                </div>
                            </div>
                        )}

                        {/* Iğdır */}
                        {selectedCountry === 'turkey' && selectedCity === 'igdir' && (
                            <div className={style.igdir}>
                                <div className={style.igdirContainer}>
                                    {cityData.igdir.map(({ label, value }, i) => (
                                        <div key={i} className={style.card}>
                                            <div className={style.info}>
                                                <p>{label}</p><span>{value}</span>
                                            </div>
                                            <LuCopy onClick={() => handleCopy(value)} />
                                        </div>
                                    ))}
                                </div>
                                <div className={style.text}>
                                    <p>Qeyd:</p>
                                    <span>Sifariş verərkən ID kodunuzu çatdırılma ünvanında açıq aşkar qeyd etdiyinizə əmin olun.</span>
                                    <span>Trendyolda Iğdır ünvanını əlavə edərkən Expargoya məxsus 0 549 383 6782 telefon nömrəsi ilə SMS onay təsdiqini etdiyinizdən əmin olun. Əks halda bağlamanızın çatdırılmasında problemlər yaşanacaqdır</span>
                                </div>
                            </div>
                        )}

                        {/* ABŞ */}
                        {selectedCountry === 'usa' && (
                            <div className={style.abs}>
                                <div className={style.absContainer}>
                                    {cityData.usa.map(({ label, value }, i) => (
                                        <div key={i} className={style.card}>
                                            <div className={style.info}>
                                                <p>{label}</p><span>{value}</span>
                                            </div>
                                            <LuCopy onClick={() => handleCopy(value)} />
                                        </div>
                                    ))}
                                </div>
                                <div className={style.text}>
                                    <p>Qeyd:</p>
                                    <span>Amazon və digər ABŞ mağazalarından sifariş verərkən həftəsonu çatdırılmadan imtina etməyiniz xahiş olunur. Xarici anbarda Şənbə günləri qeyri iş günüdür. Telefonların çatdırılmasına icazə verilmir!</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Location;
