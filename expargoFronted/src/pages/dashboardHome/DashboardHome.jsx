// src/pages/dashboardHome/DashboardHome.jsx
import React, { useEffect } from 'react';
import { TbPointFilled } from "react-icons/tb";
import { useSelector, useDispatch } from 'react-redux';
import {
    setCountry,
    setPrecinct,
    setWeight,
    calculatePrice
} from '../../redux/reducers/CalculatorSlice';
import { IoHomeOutline } from "react-icons/io5";
import { GoPackage } from "react-icons/go";
import { LuMessageSquareMore } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa6";
import { PiBellRingingBold } from "react-icons/pi";

import style from './DashboardHome.module.scss';
import { TbLogout } from "react-icons/tb";
import { IoIosNotificationsOutline } from "react-icons/io";
import ExpargoMenu from '../loginPage/sections/expargoMenu/ExpargoMenu';
import { FiPlusCircle, FiCopy, FiMap } from 'react-icons/fi';
import { BiDollar } from 'react-icons/bi';
import { IoIosArrowForward } from 'react-icons/io';
import { IoPricetagsOutline, IoNewspaperOutline } from 'react-icons/io5';
import { LuPhone } from 'react-icons/lu';
import { FaRegCircleQuestion, FaManatSign, FaTurkishLiraSign } from 'react-icons/fa6';
import map from './images/map.png';
import sms from './images/sms.png';
import kargo from './images/kargo.png';
import taxiGo from './images/taxiGo.png';
import print from './images/print.png';
import { PiUserCircleThin } from "react-icons/pi"; import { fetchNews } from '../../redux/reducers/NewsSlice';
import { useNavigate } from 'react-router-dom';
const DashboardHome = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // user-i burada useSelector ilə təyin et
    const user = useSelector(state => state.auth.user);
    const copyUserInfo = (user) => {
        if (!user) return;

        const fullText = `
ID: ${user.customId}
Ad: ${user.name}
Soyad: ${user.surname}
Ünvan: ${user.address}
Tarif: Standart Tarif
  `.trim();

        navigator.clipboard.writeText(fullText)
            .then(() => {
                alert("İstifadəçi məlumatları kopyalandı ✅");
            })
            .catch((err) => {
                console.error("Kopyalama xətası:", err);
                alert("Kopyalama zamanı xəta baş verdi ❌");
            });
    };


    // calculator state-lər
    const {
        prices,
        country,
        precinct,
        weight,
        totalPriceManat,
        totalPriceDollar
    } = useSelector(state => state.calculator);
    const { newsList } = useSelector(state => state.news);
    useEffect(() => {
        dispatch(fetchNews());
    }, [dispatch]);
    // user dəyişdikdə konsola yaz
    useEffect(() => {
        console.log('user changed:', user);
    }, [user]);

    // Hər dəyişiklikdə kalkulyasiyanı çağır
    // useEffect(() => {
    //     dispatch(calculatePrice());
    // }, [dispatch, country, precinct, weight]);

    // Kalkulyator eventləri
    const handleCountryChange = e => dispatch(setCountry(e.target.value));
    const handlePrecinctChange = e => dispatch(setPrecinct(e.target.value));
    const handleWeightChange = e => dispatch(setWeight(e.target.value));

    const precinctOptions = prices[country] ? Object.keys(prices[country]) : [];

    return (
        <div className={style.dashboardHome}>

            <ExpargoMenu className={style.menu}/>
            <header>
                <div className={style.headerContainer}>
                   <img src="https://dash.expargo.com/assets/img/expargo_white_header_logo.png" alt="" />
                   <div className={style.logIcon}>
                     <TbLogout />
                     <IoIosNotificationsOutline />
                   </div>
                </div>
            </header>
            <div className={style.container}>
                <div className={style.news}>
                    {newsList.map((newsItem) => (
                        <div
                            key={newsItem._id}
                            className={style.newsCard}
                            onClick={() => navigate(`/news/${newsItem._id}`)}  // Burada yönləndirmə var
                        >
                            {newsItem.image && (
                                <img src={newsItem.image} alt={newsItem.title} className={style.newsImage} />
                            )}
                            <p>{newsItem.title.slice(0, 13)}...</p>
                        </div>
                    ))}
                </div>

                <div className={style.userInformation}>
                    <div className={style.informationContainer}>
                        <PiUserCircleThin className={style.user} />
                        <div className={style.userContainer}>
                            {user
                                ? <p>{user.customId} <TbPointFilled /> {user.name}  {user.surname}</p>
                                : <p>Xahiş olunur daxil olun.</p>}
                            <div className={style.line}></div>
                            <span>{user.address}</span>
                            < div className={style.line}></div>
                            <span>Standart Tarif</span>
                            <div className={style.line}></div>
                        </div>
                        <FiCopy
                            className={style.copy}
                            onClick={() => copyUserInfo(user)}
                        />


                        <IoIosArrowForward className={style.arrow} />
                    </div>
                    <h5>Filial və tarif paketinizi dəyişmək üçün sağdakı oxa klikləyin.</h5>
                </div>

                {/* Balans bölməsi */}
                <div className={style.homeCards}>
                    <div className={style.balance}>
                        <h2>Balans</h2>
                        <div className={style.card}>
                            <div className={style.image}>
                                <img src="https://expargo.com/assets/img/flags/usa.svg" alt="USD" />
                            </div>
                            <h3>USD</h3>
                            <p><FiPlusCircle /> <BiDollar className={style.money} /> 0</p>
                        </div>
                        <div className={style.line} />
                        <div className={style.card}>
                            <div className={style.image}>
                                <img src="https://expargo.com/assets/img/flags/igdir.svg" alt="TRY" />
                            </div>
                            <h3>TRY</h3>
                            <p><FiPlusCircle /> <FaTurkishLiraSign className={style.money} /> 0</p>
                        </div>
                        <div className={style.line} />
                        <div className={style.card}>
                            <div className={style.image}>
                                <img src="https://dash.expargo.com/assets/img/flags/squares/az.svg" alt="AZN" />
                            </div>
                            <h3>AZN</h3>
                            <p><FiPlusCircle /> <FaManatSign className={style.money} /> 0</p>
                        </div>
                        <p>USD - beynəlxalq daşınma, AZN - Daxili Karqo ödənişləri üçün nəzərdə tutulub. Aldığınız xidmətə müvafiq balans artırmanız xahiş olunur.</p>
                    </div>

                    {/* Xarici ünvanlar */}
                   <div className={style.myForeigAdresses}>
    <h2>Xarici ünvanlarım</h2>
    {['Türkiyə', 'ABŞ', 'Iğdır'].map(loc => (
        <div
            key={loc}
            className={style.adressCard}
            onClick={() => navigate('/location')} // Yönləndirmə buradadır
        >
            <img
                src={`https://expargo.com/assets/img/flags/${loc === 'ABŞ' ? 'usa' : 'igdir'}.svg`}
                alt={loc}
            />
            <div className={style.line} />
            <h3>{loc}</h3>
            <IoIosArrowForward />
        </div>
    ))}
</div>


                    {/* Kalkulyator */}
                    <div className={style.calculator}>
                        <h2>Daşınma qiymətini hesabla</h2>

                        <div className={style.field}>
                            <select id="country-select" value={country} onChange={handleCountryChange}>
                                {Object.keys(prices).map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        <div className={style.field}>
                            <select id="precinct-select" value={precinct} onChange={handlePrecinctChange}>
                                {precinctOptions.map(p => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                        </div>

                        <div className={style.field}>
                            <input
                                id="weight-input"
                                type="number"
                                min="0"
                                step="0.1"
                                placeholder="Çəki (kq)"
                                value={weight}
                                onChange={handleWeightChange}
                            />
                        </div>

                        <button className={style.resultButton}>
                            ${totalPriceDollar}  <TbPointFilled /> {totalPriceManat} ₼
                        </button>
                        <div className={style.line}></div>
                    </div>
                </div>

                {/* Sürətli keçidlər & digər bölmələr */}
                {/* <div className={style.links}>
                    <div className={style.fastLinks}>
                        <h2>Sürətli keçidlər</h2>
                        <div className={style.cards}>
                            {[map, kargo, print, taxiGo, sms].map((img, idx) => (
                                <div key={idx} className={style.card}>
                                    <img src={img} alt="" />
                                    <p>{['Daxili kargo', 'Ekspress', 'Çap xidməti', 'TaxiGo', 'Onay Kodu'][idx]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={style.other}>
                        <div className={style.text}>
                            <h2>Digər</h2>
                        </div>
                        <div className={style.otherContainer}>
                            {[
                                { icon: FiMap, label: 'Xidmət şəbəkəsi' },
                                { icon: IoPricetagsOutline, label: 'Tariflər' },
                                { icon: LuPhone, label: 'Əlaqə' },
                                { icon: FaRegCircleQuestion, label: 'FAQ' },
                                { icon: IoNewspaperOutline, label: 'Xəbərlər' },
                            ].map((item, idx) => (
                                <div key={idx} className={style.otherCard}>
                                    <div className={style.icon}> <item.icon /></div>
                                    <p>{item.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div> */}
            </div>
            <footer>
                <div className={style.footerContainer}>
                            <ul>
                              <li><a href="#" onClick={() => navigate('/dashboardHome')}><IoHomeOutline /> Əsas səhifə</a></li>
                              <div className={style.line}></div>
                    
                              <li><a href="#" onClick={() => navigate('/packages')}><GoPackage /> Bağlamalar</a></li>
                              <div className={style.line}></div>
                    
                              <li><a href="#" onClick={() => navigate('/all-tickets')}><LuMessageSquareMore /> Müraciətlər</a></li>
                              <div className={style.line}></div>
                    
                              <li><a href="#" onClick={() => navigate('/profile')}><FaRegUser /> Profil</a></li>
                              <div className={style.line}></div>
                    
                              <li><a href="#" onClick={() => navigate('/notifications')}><PiBellRingingBold /> Bildirişlər</a></li>
                              <div className={style.line1}></div>
                            </ul>
                </div>
            </footer>
        </div>
    );
};

export default DashboardHome;
