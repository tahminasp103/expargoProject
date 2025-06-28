import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBranches } from '../../../../redux/reducers/BranchSlice';
import style from './ServiceArea.module.scss';
import { IoIosArrowRoundForward, IoIosArrowRoundDown } from "react-icons/io";
import { FaMapPin } from "react-icons/fa";

const ServiceArea = () => {
  const dispatch = useDispatch();
  const { branch, loading, error } = useSelector((state) => state.branch);
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const visibleBranches = showAll ? branch : branch.slice(0, 12);

  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p>Xəta baş verdi: {error}</p>;

  return (
    <div className={style.serviceArea}>
      <div className={style.container}>
        <h2>Xidmət şəbəkəsi</h2>

        <div className={style.cards}>
          <div className={style.mapContainer}>
            <iframe
              title="Expargo xəritə"
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d388578.1991033207!2d49.56577466702329!3d40.685834629869035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sexpargo!5e0!3m2!1saz!2saz!4v1749887543003!5m2!1saz!2saz"
              style={{
                border: 0,
                width: "100%",
                height: "600px",
                borderRadius: "20px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <ul className={style.branchList}>
            {visibleBranches.map((item, index) => (
              <li key={item._id} className={style.branchItem}>
                <button
                  className={`${style.accordionButton} ${openIndex === index ? style.active : ''}`}
                  onClick={() => toggleAccordion(index)}
                >
                  <span>{item.name}</span>
                  <span className={style.arrow}>
                    {openIndex === index ? <IoIosArrowRoundDown /> : <IoIosArrowRoundForward />}
                  </span>
                </button>

                {openIndex === index && (
                  <div className={style.accordionContent}>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className={style.branchLink}>
                      Expargo {item.name}
                    </a>
                    <p><FaMapPin /> {item.address}</p>
                    <span>{item.hours}</span>
                    <h5>{item.phone}</h5>
                  </div>
                )}
              </li>
            ))}
                    {branch.length > 12 && (
          <div className={style.toggleButtonWrapper}>
            <button
              onClick={() => setShowAll(!showAll)}
              className={style.toggleButton}
            >
              {showAll ? "Daha az " : "Daha çox "}
            </button>
          </div>
        )}
          </ul>
        </div>


      </div>
    </div>
  );
};

export default ServiceArea;
