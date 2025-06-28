// src/pages/faq/Faq.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFaqs } from '../../../../redux/reducers/FaqSlice';
import { IoIosArrowForward } from "react-icons/io";
import style from './Faq.module.scss';

const Faq = () => {
  const dispatch = useDispatch();
  const { faqs, loading, error } = useSelector(state => state.faqs);
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(fetchFaqs());
  }, [dispatch]);

  const toggleAccordion = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 8);

  return (
    <div className={style.faq}>
      <h1 >Suallar & Cavablar</h1>

      {loading && <p>Yüklənir...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className={style.faqList}>
        {visibleFaqs.map((faq, index) => (
          <li key={faq._id} className={style.faqItem}>
            <button
              className={`${style.accordionButton} ${openIndex === index ? style.active : ''}`}
              onClick={() => toggleAccordion(index)}
            >
              <span>{faq.question}</span>
              <span className={style.arrow}>
                {openIndex === index ? <IoIosArrowForward /> : <IoIosArrowForward />}
              </span>
            </button>

            {openIndex === index && (
              <div className={style.accordionContent}>
                <p>{faq.answer}</p>
              </div>
            )}
          </li>
        ))}

        {faqs.length > 8 && (
          <div className={style.toggleButtonWrapper}>
            <button onClick={() => setShowAll(!showAll)} className={style.toggleButton}>
              {showAll ? 'Daha az göstər' : 'Daha çox göstər'}
            </button>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Faq;
