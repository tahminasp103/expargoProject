import React, { useContext } from 'react';
import style from './CustomsBrokearge.module.scss';
import { LanguageContext } from '../../../../router/LanguageContext';

const CustomsBrokearge = () => {
  const { language } = useContext(LanguageContext);

  const texts = {
    AZ: {
      title: "GÖMRÜK BROKERLİYİ",
      description: `Expargo bütün növ idxal və ixrac əməliyyatları üçün Brokerlik xidmətini təklif edir. 
      Expargonun peşəkar və təcrübəli brokerləri sizə hava və quru gömrük terminallarında lazım olan 
      idxal/ixrac əməliyyatlarını həyata keçirmək üçün lazım olan köməyi əsirgəməyəcəklər. 
      Gömrük brokerliyini bizə etibar edərək vaxtınıza qənaət edin.`
    },
    EN: {
      title: "CUSTOMS BROKERAGE",
      description: `Expargo offers brokerage services for all types of import and export transactions. Expargo's professional and experienced brokers are what you need at air and dry customs terminalswill spare no effort to carry out import / export operations. Save time by trusting us in customs brokerage.`
    },
    RU: {
      title: "ТАМОЖЕННОЕ ПРЕДЛОЖЕНИЕ",
      description: `Expargo предлагает брокерские услуги по всем видам импортных и экспортных операций. Профессиональные и опытные брокеры Expargo - это то, что вам нужно на терминалах воздушной и сухой таможнине пожалеет сил для осуществления импортно-экспортных операций. Сэкономьте время, доверив нам услуги таможенного брокера.`
    }
  };

  return (
    <div className={style.customsBrokearge}>
      <div className={style.container}>
        <div className={style.text}>
          <h2>{texts[language].title}</h2>
          <p>{texts[language].description}</p>
        </div>
        <img
          src="https://expargo.com/assets/img/commercial/brokerage.jpg"
          alt="brokerage"
        />
      </div>
    </div>
  );
};

export default CustomsBrokearge;
