import React, { useContext } from 'react';
import style from './RailroadFreight.module.scss';
import { LanguageContext } from '../../../../router/LanguageContext';

const RailroadFreight = () => {
  const { language } = useContext(LanguageContext);

  const texts = {
    AZ: {
      title: "DƏMİRYOLU NƏQLİYYATI",
      description: `Bəzi məhsulların daşınmasında, xüsusən keçmiş SSRİ ölkələri ərazisi üzrə, dəmiryolu daşınmaları daha əlverişlidir. 
      Əgər sizin belə bir daşınma ehtiyacınız varsa, Expargo vasitəsi ilə vaqon ayrılması, MDB və Gürcüstan üzrə dəmiryolu tariflərinin ödənməsi, 
      dəmiryolu terminallarında aşırma və müxtəlif növ sənədləşmələri həyata keçirə bilərsiniz.`
    },
    EN: {
      title: "RAILROAD TRANSPORT",
      description: `In the transportation of some products, especially in the territory of the former USSR countries, rail transport is more convenient. If you need such a shipment, Separation of wagons by Expargo, payment of railway tariffs for CIS and Georgia,You can perform bracing and various types of documentation at railway terminals.`
    },
    RU: {
      title: "ЖЕЛЕЗНОДОРОЖНЫЙ ТРАНСПОРТ",
      description: `При транспортировке некоторых товаров, особенно по территории стран бывшего СССР, Железнодорожный транспорт удобнее. Если вам нужна такая посылка, Разделение вагонов по Expargo, оплата ж / д тарифов для СНГ и Грузии На вокзалах можно выполнить раскрепления и разного рода документацию.`
    }
  };

  return (
    <div className={style.railroadFreight}>
      <div className={style.container}>
        <div className={style.text}>
          <h2>{texts[language].title}</h2>
          <p>{texts[language].description}</p>
        </div>
        <img
          src="https://expargo.com/assets/img/commercial/railroad-transport.png"
          alt="Railroad Freight"
        />
      </div>
    </div>
  );
};

export default RailroadFreight;
