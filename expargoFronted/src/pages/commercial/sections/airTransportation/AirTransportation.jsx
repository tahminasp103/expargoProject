import React, { useContext } from 'react';
import style from './AirTransportation.module.scss';
import { LanguageContext } from '../../../../router/LanguageContext';

const AirTransportation = () => {
  const { language } = useContext(LanguageContext);

  const texts = {
    AZ: {
      title: 'HAVA NƏQLİYYATI',
      description: `Təcili və kiçik həcmli yük daşımalar üçün hava nəqliyyatı daha məqsədə uyğundur. 
      Expargonun bu xidmətindən istifadə edərək dünyanın hər hansı bir hava limanından Azərbaycana idxal 
      və ixrac əməlyatlarını həyata keçirə bilərsiniz. Expargo Mağazaları bu sahədə öz təcrübələrini 
      sizlərdən əsirgəməyəcəklər.`,
    },
    EN: {
      title: 'AIR FREIGHT',
      description: `Air transport is more appropriate for urgent and small-scale cargo transportation. Import to Azerbaijan from any airport in the world using this service of Expargoand you can perform export operations. Expargo employees will not spare their experience in this field.`,
    },
    RU: {
      title: 'ВОЗДУШНЫЙ ТРАНСПОРТ',
      description: `Воздушный транспорт больше подходит для срочных и небольших перевозок грузов.Импорт в Азербайджан из любого аэропорта мира с помощью услуги Expargoи вы можете выполнять экспортные операции. Сотрудники Expargo не пожалеют своего опыта в этой сфере.`,
    },
  };

  return (
    <div className={style.airTransportation}>
      <div className={style.container}>
        <img
          src="https://expargo.com/assets/img/commercial/air-freight.png"
          alt="air freight"
        />
        <div className={style.text}>
          <h2>{texts[language].title}</h2>
          <p>{texts[language].description}</p>
        </div>
      </div>
    </div>
  );
};

export default AirTransportation;
