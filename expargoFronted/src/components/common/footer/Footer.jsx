// src/components/footer/Footer.jsx
import React, { useState } from 'react';
import style from './Footer.module.scss';
import { FaPhone } from 'react-icons/fa6';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

const Footer = ({ variant = 'default' }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (country) => {
    setSelectedCountry((prev) => (prev === country ? null : country));
  };

  return (
    <div className={clsx(style.footer, {
      [style.light]: variant === 'light',
      [style.commercial]: variant === 'commercial',
    })}>
      <div className={style.container}>
        <div className={`${style.location} ${selectedCountry ? style.expanded : ''}`}>
          <img src="https://expargo.com/assets/img/expargo_logo.png" alt="Expargo Logo" />
          <p className={style.order}>Xaricdən sifarişlərin sərfəli çatdırılması</p>
          <h5>Expert MMC</h5>
          <p>28 May küçəsi 17B. (“ABB” ilə üzbəüz)</p>
          <p className={style.index}>Bakı, AZ1014, Nəsimi rayonu</p>
          <p>Həftəiçi: 10:00-20:00</p>
          <p className={style.time}>Şənbə: 10:00-16:00</p>
          <p><FaPhone /> +994 (12) 210 00 85</p>
          <h5>
            For International inquiries:
            <img src="https://expargo.com/assets/img/flags/tr.png" alt="TR" className={style.tr} onClick={() => handleSelect('tr')} />
            <img src="https://expargo.com/assets/img/flags/uk.png" alt="UK" className={style.uk} onClick={() => handleSelect('uk')} />
          </h5>

          <div className={style.expargoInfo}>
            {selectedCountry === 'uk' && (
              <p className={style.expargoLtd}>
                Expargo Ltd<br />
                Company number 12938751<br />
                275 New North Road,<br />
                Islington Suite 1006,<br />
                London, UK, N1 7AA
              </p>
            )}
            {selectedCountry === 'tr' && (
              <p className={style.expargoNakliye}>
                Expargo Trading Nakliyat<br />
                Uluslararası Ticaret LTD ŞTİ<br />
                Liman mah. 27 sok.<br />
                Çiftçioğlu apt. No: 15/2,<br />
                Konyaaltı, Antalya, Türkiye
              </p>
            )}
          </div>
        </div>

        <div className={style.links}>
          <div className={style.linksCard}>
            <h4>Digər linklər</h4>
            <p>Əsas səhifə</p>
            <p>Korporativ</p>
            <p>Necə işləyir?</p>
            <p>Xidmət şəbəkəsi</p>
            <p>Şərtlər & Qaydalar</p>
            <p>Gizlilik Siyasəti</p>
          </div>
          <div className={style.linksCard}>
            <p>Tariflər</p>
            <p>Xəbərlər</p>
            <p>İstifadəçi paneli</p>
            <p>Mağazalar</p>
            <p>FAQ</p>
          </div>
          <div className={style.linksCard}>
            <h4>Bizi izləyin</h4>
            <div className={style.logo}>
              <a href="https://www.instagram.com/expargo.az/"><img src="https://expargo.com/assets/icon/instagram.svg" alt="Instagram" /></a>
              <a href="https://www.facebook.com/expargo.az/"><img src="https://expargo.com/assets/icon/facebook.svg" alt="Facebook" /></a>
              <a href="https://t.me/expargocom"><img src="https://expargo.com/assets/icon/telegram.svg" alt="Telegram" /></a>
              <a href="https://www.youtube.com/channel/UCe_MaSXkAcIB7Y6k5tqegAw"><img src="https://expargo.com/assets/icon/youtube.svg" alt="YouTube" /></a>
              <a href="https://www.tiktok.com/@expargo.az?_t=8Z8WgrcF4k5&_r=1"><img src="https://expargo.com/assets/icon/tiktok.svg" alt="TikTok" /></a>
            </div>
            <h4>Mobil tətbiq</h4>
            <div className={style.img}>
              <a href="https://apps.apple.com/tr/app/expargo-s%C9%99rf%C9%99li-kargo/id1542055522">
                <img src="https://expargo.com/assets/img/app-store-badge.svg" alt="App Store" />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.expargo.courier">
                <img src="https://expargo.com/assets/img/google-play-badge.svg" alt="Google Play" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={style.line}></div>

      <div className={style.login}>
        <div className={style.btn}>
          <button onClick={() => navigate('/login')}>Daxil ol</button>
          <button onClick={() => navigate('/signup')}>Qeydiyyat</button>
        </div>
        <p>© Copyright 2018-2025, Bütün hüquqlar qorunur.</p>
      </div>
    </div>
  );
};

export default Footer;
