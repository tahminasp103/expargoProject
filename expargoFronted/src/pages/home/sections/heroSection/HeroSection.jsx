import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCountry, setPrecinct, setWeight } from "../../../../redux/reducers/CalculatorSlice";
 // slice-ın path-ini düzəlt
import style from './HeroSection.module.scss';
import trendyol from '../images/trendyol.svg';
import temu from '../images/temu.svg';
import { CiLocationOn } from "react-icons/ci";
import { FaManatSign } from "react-icons/fa6";
const HeroSection = () => {
const dispatch = useDispatch();
 // Redux-dan dəyərləri götür
  const {
    prices,
    country,
    precinct,
    weight,
    totalPriceManat,
    totalPriceDollar,
  } = useSelector((state) => state.calculator); // ad uyğun olsun slice ilə

  const handleCountryChange = (e) => {
    dispatch(setCountry(e.target.value));
  };

  const handlePrecinctChange = (e) => {
    dispatch(setPrecinct(e.target.value));
  };

  const handleWeightChange = (e) => {
    dispatch(setWeight(e.target.value));
  };

  return (
    <div className={style.heroSection}>
      <div className={style.container}>
        <div className={style.textContainer}>
          <h1>Sürətli və Sərfəli Karqo</h1>
          <p>
Trendyol və TEMU Gəl Al nöqtələri – Beynəlxalq və ölkədaxili çatdırılma xidmətinin ən etibarlı ünvanı. Türkiyə və Amerikadan olan sifarişlərinizi Expargo ilə rahatlıqla həyata keçirə bilərsiniz. Sərfəli qiymətlər, geniş xidmət şəbəkəsi və yüksək keyfiyyətlə Expargo həmişə sizin yanınızdadır!
          </p>
          <div className={style.app}>
            <img src={trendyol} alt="trendyol" />
            <img src={temu} alt="temu" />
            <span>Rəsmi Trendyol və TEMU tərəfdaşı</span>
          </div>
          <div className={style.btn}>
            <button className={style.btn1}>Qeydiyyat</button>
            <button className={style.btn2}>Daxil Ol</button>
          </div>
        </div>

        <div className={style.calculator}>
          <h2>Kalkulyator</h2>

            <label htmlFor="country-select">Ölkə</label>
            <div className={style.inp}>
              <img src="https://expargo.com/assets/icon/pin.svg" alt="" />
               <select  value={country} onChange={handleCountryChange}>
              {Object.keys(prices).map((c) => (
                <option key={c} value={c}>
                   {c}
                </option>
              ))}
            </select>
            </div>

            <label htmlFor="precinct-select">Məntəqə</label>
            <div className={style.inp}>
              <img src="https://expargo.com/assets/icon/log-in.svg" alt="" />
            <select  value={precinct} onChange={handlePrecinctChange}>
              {Object.keys(prices[country]).map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

          </div>

            <label htmlFor="weight-input">Çəki</label>
            <div className={style.inp}>
               <img src="https://expargo.com/assets/icon/weight.svg" alt="" />
               <input
              type="number"
              id="weight-input"
              min="0"
              step="0.1"
              placeholder="Çəki (kq)"
              value={weight}
              onChange={handleWeightChange}
            />
            </div>
          <button>
            {weight > 30 ? (
              'Max çəki: 30kq!'
            ) : (
              <>
                {totalPriceDollar.toFixed(2)} $ - {totalPriceManat.toFixed(2)} <FaManatSign />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
