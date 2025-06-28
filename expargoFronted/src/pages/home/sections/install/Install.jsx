import React from 'react';
import style from './Install.module.scss'
const Install = () => {
  return (
    <div className={style.install}>
        <div className={style.container}>
            <h2>Mobil tətbiqi yükləyin</h2>
        <img src="https://expargo.com/assets/img/download-img.svg" alt=""  className={style.img1}/>
            <div className={style.img}>
              <a href="https://apps.apple.com/tr/app/expargo-s%C9%99rf%C9%99li-kargo/id1542055522">
               <img src="https://expargo.com/assets/img/app-store-badge.svg" alt="" />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.expargo.courier">
               <img src="https://expargo.com/assets/img/google-play-badge.svg" alt="" />
              </a>
            </div>
            <div className={style.text}>
                <img src="https://expargo.com/assets/icon/telephone.svg" alt="" />
            <span>   +994 (12) 210 00 85  </span> 
            <span className={style.wiew}>Bizi sosial mediada izləyin</span>
            </div>
            <div className={style.logo}>
              <a href="https://www.instagram.com/expargo.az/">
              <img src="https://expargo.com/assets/icon/instagram.svg" alt=""/>
              </a>
              <a href="https://www.facebook.com/expargo.az/">
              <img src="https://expargo.com/assets/icon/facebook.svg" alt="" />
              </a>
              <a href="https://t.me/expargocom">
              <img src="https://expargo.com/assets/icon/telegram.svg" alt="" />
              </a>
              <a href="https://www.youtube.com/channel/UCe_MaSXkAcIB7Y6k5tqegAw">
              <img src="https://expargo.com/assets/icon/youtube.svg" alt="" />
              </a>
              <a href="https://www.tiktok.com/@expargo.az?_t=8Z8WgrcF4k5&_r=1">
              <img src="https://expargo.com/assets/icon/tiktok.svg" alt="" />
              </a>
            </div>
            <img src="https://expargo.com/assets/icon/star.svg" alt="" className={style.star} />
        </div>
        <img src="https://expargo.com/assets/img/payment.png" alt=""  className={style.visa}/>
    </div>
  );
}

export default Install;
