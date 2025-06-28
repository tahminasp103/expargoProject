import React, { useState, useEffect } from 'react';
import style from './AutoDeclaration.module.scss';
import digital from '../images/digital.svg';
import gelal from '../images/gelal.svg';
import icaze from '../images/icaze.svg';
import arrow1 from '../images/arrow1.svg';
import arrow2 from '../images/arrow2.svg';
import digitalogin from '../images/digitallogin.svg';
import { MdNotStarted } from "react-icons/md";
import alert from '../images/alert.svg';
import kupon from '../images/kupon.jpg';
import bonus from '../images/bonus.png';
import qeydiyyat from '../images/qeydiyyat.svg';
import unvan from '../images/unvan.svg';
import homee from '../images/homee.svg';
import catdirilma from '../images/catdirilma.jpg';
import tycatdirilma from '../images/tytemucatdirilma.jpg';
import tytemubonus from '../images/tytemubonus.png';
import avtobeyan from '../images/avtobeyan.jpg';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi"
const AutoDeclaration = () => {
  const sliderImages = [catdirilma, tycatdirilma, tytemubonus, avtobeyan];
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? sliderImages.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === sliderImages.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === sliderImages.length - 1 ? 0 : prev + 1
      );
    }, 4000); // 4 saniyədən bir dəyişir

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={style.autoDeclaration}>
      <div className={style.container}>
        <div className={style.text}>
          <h2>Avtobəyan Xidməti</h2>
          <p>Bağlamalarınızın Smart Customs-da avtomatik bəyan olunması üçün xidmətə elə indi qoşulun!
            Vaxtınıza qənaət edin – bağlamalarınız avtomatik bəyan olunsun!</p>
        </div>

        <div className={style.cards}>
          <div className={style.card}>
            <img src={digital} alt="digital login" />
            <h3>Digital Login ilə daxil ol</h3>
          </div>
          <img src={arrow2} alt="" />
          <div className={style.card}>
            <img src={icaze} alt="expargo-ya icaze" />
            <h3>Expargo-ya icazə ver</h3>
          </div>
          <img src={arrow1} alt="" />
          <div className={style.card}>
            <img src={gelal} alt="gel Al menteqesi" />
            <h3>Expargo "Gəl-Al" nöqtəsi seç</h3>
          </div>
        </div>

        <div className={style.login}>
          <button><img src={digitalogin} alt="" /></button>
          <p>Düyməyə klikləyərək icazə prosesini tamamla və avtobəyana qoşul!</p>
          <a href="https://www.youtube.com/shorts/htlwBhSXin8" target='_blank'><MdNotStarted />  Video-təlimatı izlə</a>
          <div className={style.alert}>
            <img src={alert} alt="" />
            <p>Digital Login icazəsindən sonra Trendyol və TEMU-da Expargo Gəl-Al seçdikdə sifarişləriniz Smart Customs-da avtomatik bəyan olunacaq. ABŞ və Türkiyədən olan digər bağlamalar üçün faktura yüklənməlidir.</p>
          </div>
          <img src={kupon} alt="" />
          <img src={bonus} alt="" />
        </div>

        <div className={style.howDoesItWork}>
          <h2>Necə işləyir?</h2>
          <div className={style.cardss}>
            <div className={style.cardcontainer}>
              <div className={style.card}>
                <img src={qeydiyyat} alt="" />
                <h3>Qeydiyyatdan keçin</h3>
              </div>
              <div className={style.card}>
                <img src={homee} alt="" />
                <h3>Bağlamanızı xaricdəki ünvanımıza göndərin</h3>
              </div>
              <div className={style.card}>
                <img src={unvan} alt="" />
                <h3>Bağlamanızı sizə yaxın təhvil məntəqəsindən təhvil alın</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Slider bölməsi */}
        <div className={style.sliderWrapper}>
          <div className={style.slider}>
            <img src={sliderImages[currentIndex]} alt={`Slide ${currentIndex}`} />
            <button className={style.prev} onClick={prevSlide}>
            <FiArrowLeft />
            </button>
            <button className={style.next} onClick={nextSlide}>
             <FiArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoDeclaration;
