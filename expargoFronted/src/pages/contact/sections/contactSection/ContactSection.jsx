import React from 'react'
import style from "./ContactSection.module.scss"
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";

const ContactSection = () => {
  return (
    <div className={style.contact}>
      <div className={style.container}>
        <h2>ƏLAQƏ</h2>
        <span>Expargo (Expert MMC) ilə əlaqə qurmaq və məlumat almaq üçün
          aşağıdakı əlaqə üsullarından istifadə edə bilərsiniz.</span>
        <div className={style.cards}>
          <div className={style.card}>
            <img src="https://expargo.com/assets/icon/contact-icon-1.svg" alt="" />
            <strong>Bizə zəng edin</strong>
            <span>(012) 210 00 85</span>
            <p>Çağrı mərkəzinin iş saatları
              Həftəiçi: 10:00-18:00 | Şənbə: 10:00-16:00</p>
          </div>
          <div className={style.card}>
            <img src="https://expargo.com/assets/icon/contact-icon-2.svg" alt="" />
            <strong>Email göndərin</strong>
            <span>info@expargo.com</span>
            <p>24 saat ərzində sorğularınızı
              göndərə bilərsiniz</p>
          </div>
              <div className={style.card}>
            <img src="https://expargo.com/assets/icon/contact-icon-3.svg" alt="" />
            <strong>Sosial Media</strong>
            <a href="https://www.facebook.com/expargo.az/"><FaInstagram /><span>expargo.az</span></a>
            <a href="https://www.instagram.com/expargo.az/"><FaFacebookF /><span>expargo.az</span></a>
            <div className={style.line}>

            </div>
          </div>
                        <div className={style.card}>
            <img src="https://expargo.com/assets/icon/contact-icon-4.svg" alt="" />
            <strong>Müştəri xidmətləri</strong>
            <a href="https://www.google.com/maps/place/EXPARGO+-+28+May+(Kargo)/@40.3794163,49.8546204,17z/data=!3m1!4b1!4m5!3m4!1s0x40307d1227607ab7:0x9a57b16206776b50!8m2!3d40.3794163!4d49.8568091?shorturl=1"> <p>28 May Filialı  28 May küçəsi 17B. (“ABB” ilə üzbəüz)</p> </a>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ContactSection
