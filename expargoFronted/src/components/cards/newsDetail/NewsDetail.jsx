import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNews } from '../../../redux/reducers/NewsSlice';
import style from './NewsDetail.module.scss';
import ExpargoMenu from '../../../pages/loginPage/sections/expargoMenu/ExpargoMenu';
import { IoIosArrowBack } from "react-icons/io";

const NewsDetail = ({ isDashboard }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { newsList } = useSelector(state => state.news);

  useEffect(() => {
    if (!newsList.length) {
      dispatch(fetchNews());
    }
  }, [dispatch, newsList.length]);

  const newsItem = newsList.find(item => item._id === id);

  if (!newsItem) return <p>Yüklənir və ya xəbər tapılmadı...</p>;

  return (
    <div className={style.newsDetailWrapper}>
      {isDashboard && <ExpargoMenu />}
      <div className={style.content}>
        <button onClick={() => navigate(-1)} className={style.backBtn}>
          <IoIosArrowBack /> Geri
        </button>
        <div className={style.newsDetail}>
          {newsItem.image && <img src={newsItem.image} alt={newsItem.title} />}
          <h1>{newsItem.title}</h1>
          <p>{newsItem.content}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
