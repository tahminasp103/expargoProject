import React, { useContext } from 'react';
import style from './RoadTransport.module.scss';
import { LanguageContext } from '../../../../router/LanguageContext';

const RoadTransport = () => {
  const { language } = useContext(LanguageContext);

  const texts = {
    AZ: {
      title: "QURU YOLU NƏQLİYYATI",
      description: `İstər Türkiyədən, istərsə Avropa və ya digər ölkələrdən, istər qruppaj istərsə də FTL şərtləri ilə Expargo quru nəqliyyatı fəaliyyətini həyata keçirdir. 
      Bizə müraciət edərək Expargonun çoxsaylı avtomobil şəbəkəsindən yararlana, yüklərinizin idxal və ixrac əməlyatlarınızı icra edə bilərsiniz.`
    },
    EN: {
      title: "ROAD TRANSPORT",
      description: `Whether from Turkey, Europe or other countries, Expargo land transport activities on both group and FTL termsperforms. Take advantage of Expargo's numerous car networks by contacting us, You can carry out import and export operations of your cargo.`
    },
    RU: {
      title: "ДОРОЖНЫЙ ТРАНСПОРТ",
      description: `Whether from Turkey, Europe or other countries, Expargo land transport activities on both group and FTL termsperforms. Take advantage of Expargo's numerous car networks by contacting us, You can carry out import and export operations of your cargo.`
    }
  };

  return (
    <div className={style.roadTransport}>
      <div className={style.container}>
        <img
          src="https://expargo.com/assets/img/commercial/tir.jpg"
          alt="Road Transport"
        />
        <div className={style.text}>
          <h2>{texts[language].title}</h2>
          <p>{texts[language].description}</p>
        </div>
      </div>
    </div>
  );
};

export default RoadTransport;
