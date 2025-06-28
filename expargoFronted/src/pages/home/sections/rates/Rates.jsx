import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrices } from '../../../../redux/reducers/priceSlice';
import style from './Rates.module.scss';
import turkeyflag from '../images/turkey.svg';
import usaFlag from '../images/usa.svg';

const countries = [
  {
    name: 'İstanbul',
    label: 'Türkiyə - İstanbul',
    flag: <img src={turkeyflag} alt="Turkey Flag" width={20} style={{ marginRight: 8 }} />,
  },
  {
    name: 'Iğdır',
    label: 'Türkiyə - Iğdır',
    flag: <img src={turkeyflag} alt="" width={20} style={{ marginRight: 8 }} />,
  },
  {
    name: 'Amerika',
    label: 'Amerika',
    flag: <img src={usaFlag} alt="USA Flag" width={20} style={{ marginRight: 8 }} />,
  },
];

const categories = ['standart', 'maye'];

const Rates = () => {
  const dispatch = useDispatch();
  const { prices } = useSelector((state) => state.prices);

  const [selectedCountry, setSelectedCountry] = useState('İstanbul');
  const [selectedCategory, setSelectedCategory] = useState('standart');

  useEffect(() => {
    dispatch(fetchPrices());
  }, [dispatch]);

  const filteredPrices = prices.filter(
    (price) =>
      price.country === selectedCountry &&
      price.category === selectedCategory
  );

  const nearPrices = filteredPrices.filter(p => p.isNear);
  const farPrices = filteredPrices.filter(p => !p.isNear);

  return (
    <div className={style.rates}>
      <div className={style.container}>
        <h2>Tariflər</h2>

        <div className={style.btn}>
          {countries.map((country) => (
            <button
              key={country.name}
              onClick={() => setSelectedCountry(country.name)}
              className={selectedCountry === country.name ? style.active : ''}
            >
              {country.flag} {country.label}
            </button>
          ))}
        </div>

        <div className={style.ratesContainer}>
          <div className={style.ratesCard1}>
            <h3>Bakı, Sumqayıt, Xırdalan filialları</h3>

            <div className={style.cardBtn}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={selectedCategory === cat ? style.active : ''}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {nearPrices.length > 0 ? (
              nearPrices.map((item) => (
                <div key={item._id} className={style.tarrifs}>
                  <ul>
                    {item.weights.map((w, i) => (
                      <li key={i}>
                        <p>₼ {w.price}</p>  <span>{w.range} KG</span>
                      </li>
                    ))}
                  </ul>
                  {item.note && <p>📝 {item.note}</p>}
                </div>
              ))
            ) : (
              <p>Məlumat tapılmadı.</p>
            )}

            {selectedCountry === 'Amerika' && (
              <div className={style.note}>
                <p>
                  Amerikadan ölçüsü 60 sm-dən böyük olan bağlamaların daşınma haqqı həm həcm, həm də fiziki çəki
                  əsasında hesablanır və alınan göstəricilərdən böyük olanı daşınma haqqının hesablanması üçün əsas
                  çəki kimi qəbul edilir. <br />
                  Yekun hesablaşmalar <strong>USD/AZN</strong> məzənnəsinə müvafiq olaraq aparılır.
                </p>
              </div>
            )}
          </div>

          {/* Kart 2 - Bölgələr */}
          <div className={style.ratesCard2}>
            <h3>Bölgələr və təhvil məntəqələri</h3>

            <div className={style.cardBtn}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={selectedCategory === cat ? style.active : ''}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {farPrices.length > 0 ? (
              farPrices.map((item) => (
                <div key={item._id} className={style.tarrifs}>
                  <ul>
                    {item.weights.map((w, i) => (
                      <li key={i}>
                        <p>₼ {w.price}</p>  <span>{w.range} KG</span>
                      </li>
                    ))}
                  </ul>
                  {item.note && <p>📝 {item.note}</p>}
                </div>
              ))
            ) : (
              <p>Məlumat tapılmadı.</p>
            )}

            <p className="text-sm text-gray-500 mt-2">
              Bölgələrə əlavə çatdırılma xərci yekun tarifə əlavə olunmuşdur.
            </p>

            {selectedCountry === 'Amerika' && (
              <div className={style.note}>
                <p>
                  Amerikadan ölçüsü 60 sm-dən böyük olan bağlamaların daşınma haqqı həm həcm, həm də fiziki çəki
                  əsasında hesablanır və alınan göstəricilərdən böyük olanı daşınma haqqının hesablanması üçün əsas
                  çəki kimi qəbul edilir. <br />
                  Yekun hesablaşmalar <strong>USD/AZN</strong> məzənnəsinə müvafiq olaraq aparılır.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rates;
