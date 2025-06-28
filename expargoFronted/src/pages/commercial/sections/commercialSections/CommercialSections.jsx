import React, { useContext } from 'react';
import style from './CommercialSections.module.scss';
import { LanguageContext } from '../../../../router/LanguageContext';

const CommercialSections = ({ scrollToSection, activeIndex }) => {
  const { language, setLanguage } = useContext(LanguageContext);

  const texts = {
    AZ: {
      title: "KORPORATİV XİDMƏTLƏRİMİZ",
      description: `Expargo Ltd, beynəlxalq poçtdaşımalarla yanaşı beynəlxalq yük daşıma və nəqliyyat sahəsində də özetibarlı və yüksək keyfiyyətli xidmətlərini təklif edir. Müxtəlif sahələrdən olan müştərilərinyüklərinin hava, dəmiryolu, quru yolu, dəniz nəqliyyatı ilə çatdırılması, həmçinin Gömrük Brokerliyini öz öhdəmizə götürürük.`,
      cards: [
        { title: "Dəniz Nəqliyyatı", icon: "https://expargo.com/ship.015efa25ede48145.svg" },
        { title: "Hava Nəqliyyatı", icon: "https://expargo.com/air-mail.6848c3b25792c2ef.svg" },
        { title: "Dəmiryolu Nəqliyyatı", icon: "https://expargo.com/fuel.04bb655b46acc37c.svg" },
        { title: "Quruyolu Nəqliyyatı", icon: "https://expargo.com/truck.291aaaa497f2a451.svg" },
        { title: "Gömrük Brokerliyi", icon: "https://expargo.com/broker.69036ee8f4ec7223.svg" },
        { title: "Qeyri standart yüklər", icon: "https://expargo.com/container.48665f716f1fa159.svg" }
      ],
      contactBtn: "ƏLAQƏ"
    },
    EN: {
      title: "CORPORATE SERVICES",
      description: `Expargo Ltd, in addition to international mail, also offers reliable and high-quality services in the field of international freight and transportation. We handle delivery of goods by air, rail, land, and sea transport, as well as customs brokerage.`,
      cards: [
        { title: "Sea Transportation", icon: "https://expargo.com/ship.015efa25ede48145.svg" },
        { title: "Air Transportation", icon: "https://expargo.com/air-mail.6848c3b25792c2ef.svg" },
        { title: "Railway Transportation", icon: "https://expargo.com/fuel.04bb655b46acc37c.svg" },
        { title: "Land Transportation", icon: "https://expargo.com/truck.291aaaa497f2a451.svg" },
        { title: "Customs Brokerage", icon: "https://expargo.com/broker.69036ee8f4ec7223.svg" },
        { title: "Non-standard Cargo", icon: "https://expargo.com/container.48665f716f1fa159.svg" }
      ],
      contactBtn: "CONTACT US"
    },
    RU: {
      title: "КОРПОРАТИВНЫЙ СЕРВИС",
      description: `Expargo Ltd, помимо международной почты, также предлагает надежные и качественные услуги в области международных грузоперевозок и транспорта. Мы осуществляем доставку грузов по воздуху, железной дороге, суше и морю, а также предоставляем услуги таможенного оформления.`,
      cards: [
        { title: "Морской Tpaнcпopт", icon: "https://expargo.com/ship.015efa25ede48145.svg" },
        { title: "Погоца Tpaнcпopт", icon: "https://expargo.com/air-mail.6848c3b25792c2ef.svg" },
        { title: "Железнодорожны Tpaнcпopт", icon: "https://expargo.com/fuel.04bb655b46acc37c.svg" },
        { title: "Дорога Tpaнcпopт", icon: "https://expargo.com/truck.291aaaa497f2a451.svg" },
        { title: "Таможня Брокерская деятельность", icon: "https://expargo.com/broker.69036ee8f4ec7223.svg" },
        { title: "Нестандартные нагрузки", icon: "https://expargo.com/container.48665f716f1fa159.svg" }
      ],
      contactBtn: "КOНTAКTЫ"
    }
  };

  return (
    <div className={style.commercial}>
      <div className={style.container}>
        <div className={style.commercialNetwork}>
          <div className={style.contact}>
            <h1>{texts[language].title}</h1>
            <p>{texts[language].description}</p>

            <button className={style.contactBtn}>
              {texts[language].contactBtn}
            </button>

            <div className={style.btn}>
              <button onClick={() => setLanguage('AZ')} className={language === 'AZ' ? style.active : ''}>AZ</button>
              <button onClick={() => setLanguage('EN')} className={language === 'EN' ? style.active : ''}>EN</button>
              <button onClick={() => setLanguage('RU')} className={language === 'RU' ? style.active : ''}>RU</button>
            </div>
          </div>

          <img src="https://expargo.com/assets/img/commercial/illustration.png" alt="Illustration" />
        </div>

        <div className={style.cards}>
          {texts[language].cards.map(({ title, icon }, index) => (
            <div
              key={index}
              className={`${style.card} ${index === activeIndex ? style.active : ''}`}
              onClick={() => scrollToSection(index)}
            >
              <img src={icon} alt={title} />
              <span>{title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommercialSections;
