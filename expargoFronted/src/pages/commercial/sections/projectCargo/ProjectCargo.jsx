import React, { useContext } from 'react';
import style from './ProjectCargo.module.scss';
import { LanguageContext } from '../../../../router/LanguageContext';

const ProjectCargo = () => {
  const { language } = useContext(LanguageContext);

  const texts = {
    AZ: {
      title: "QEYRİ STANDART YÜKLƏR",
      description: `Qeyri standard yükləri konteyner, TIR və yaxud vaqon ilə daşımaq mümkün deyildir. 
      Belə olan hallarda xüsusi növ avtomobil, kran və gəmilər ilə yüklərin daşınması həyata keçirilir. 
      Sevindirici haldır ki, bu cür ölçülü yüklərdə belə Expargo peşəkarlığı köməyinizə çatır. 
      Expargonun təcrübəli logistika komandası bu daşımalarınızı həyata keçirmək üçün sizə lazımı köməyini edəcəklər.`
    },
    EN: {
      title: "PROJECT CARGO",
      description: `Non-standard cargo cannot be transported by container, truck or wagon. In such cases, special types of vehicles, cranes and ships are used to transport cargo. It is gratifying that even in loads of this size, Expargo's professionalism can help you.Expargo's experienced logistics teamThey will help you to carry out these shipments.`
    },
    RU: {
      title: "НЕСТАНДАРТНЫЕ НАГРУЗКИ",
      description: `Нестандартный груз нельзя перевозить контейнером, грузовиком или вагоном. В таких случаях для перевозки грузов используются специальные автомобили, краны и суда. Приятно, что даже при работе с грузами такого размера профессионализм Expargo может вам помочь.Опытная команда логистики ExpargoОни помогут вам осуществить эти перевозки.`
    }
  };

  return (
    <div className={style.projectCargo}>
      <div className={style.container}>
        <img src="https://expargo.com/assets/img/commercial/13.jpeg" alt="Project Cargo" />
        <div className={style.text}>
          <h2>{texts[language].title}</h2>
          <p>{texts[language].description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectCargo;
