import React, { useContext } from 'react';
import style from './SeaTransportation.module.scss';
import { LanguageContext } from '../../../../router/LanguageContext';

const SeaTransportation = () => {
  const { language } = useContext(LanguageContext);

  const texts = {
    AZ: {
      title: "DƏNİZ NƏQLİYYATI",
      description: `Şübhəsiz ki qiymət səmərəliliyinə görə dəniz nəqliyyatı ən sərfəli nəqliyyat növü sayılır.
      Expargo ilə əməkdaşlıq edərək dünyanın hər hansı bir limanı ilə idxal ixrac əməliyyatlarınızı
      həyata keçirə bilərsiniz. Uzaq Çin, Amerika və yaxud Avropa, fərq etməz. Bütün istiqamətlərdə Expargo sizə lazım olan dəstəyi verməyə hazırdır.`
    },
    EN: {
      title: "SEA FREIGHT",
      description: `Undoubtedly, due to the cost-effectiveness of sea transport is considered the most affordable mode of transport. In partnership with Expargo, everyone in the world You can carry out import and export operations with any port. It doesn't matter if it's China, America or Europe. In all directionsExpargo is ready to give you the support you need.`
    },
    RU: {
      title: "МОРСКОЙ ТРАНСПОРТ",
      description: `Несомненно, из-за рентабельности морского транспортасчитается самым доступным видом транспорта. В партнерстве с Expargo все в мире Вы можете осуществлять импортные и экспортные операции с любым портом. Неважно, Китай это, Америка или Европа. По всем направлениям Expargo готов оказать вам необходимую поддержку.`
    }
  };

  return (
    <div className={style.seaTransportation}>
      <div className={style.container}>
        <div className={style.text}>
          <h2>{texts[language].title}</h2>
          <p>{texts[language].description}</p>
        </div>
        <img
          src="https://expargo.com/assets/img/commercial/sea-freight.png"
          alt="Sea Transport"
        />
      </div>
    </div>
  );
};

export default SeaTransportation
