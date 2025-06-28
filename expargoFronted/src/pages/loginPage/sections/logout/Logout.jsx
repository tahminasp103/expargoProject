import React from 'react';
import style from './Logout.module.scss';

const Logout = ({ onCancel, onConfirm }) => {
  return (
    <div className={style.overlay}>
      <div className={style.logout}>
        <p>Çıxış etmək istəyirsiniz?</p>
        <div className={style.btn}>
          <button className={style.btn1} onClick={onCancel}>Xeyr</button>
          <button className={style.btn2} onClick={onConfirm}>Bəli</button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
