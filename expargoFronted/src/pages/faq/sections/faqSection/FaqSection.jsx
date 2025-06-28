import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './FaqSection.module.scss';
import { fetchFaqs } from '../../../../redux/reducers/FaqSlice';

const FaqSection = () => {
  const dispatch = useDispatch();
  const { list: faqList, loading, error } = useSelector(state => state.faq);

  useEffect(() => {
    dispatch(fetchFaqs());
  }, [dispatch]);

  return (
    <div className={style.faq}>
      <div className={style.container}>
        <h2>Suallar & Cavablar</h2>

        {loading && <p>Yüklənir...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className={style.faqContainer}>
          {faqList.map((faq, index) => (
            <div key={faq.id || index} className={style.faqItem}>
              <h3 className={style.question}>{faq.question}</h3>
              <p className={style.answer}>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
