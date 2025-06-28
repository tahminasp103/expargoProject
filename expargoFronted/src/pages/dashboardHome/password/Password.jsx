import React, { useState } from 'react';
import style from './Password.module.scss';
import { IoIosArrowBack } from "react-icons/io";
import { IoLockClosedOutline, IoEyeOffOutline } from "react-icons/io5";
import ExpargoMenu from '../../loginPage/sections/expargoMenu/ExpargoMenu';
import { useNavigate } from 'react-router-dom';

const Password = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate()
  const token = localStorage.getItem('token');

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      alert("Yeni şifrələr uyğun gəlmir!");
      return;
    }

    try {
      const response = await fetch('http://localhost:7777/api/users/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Şifrə uğurla dəyişdirildi');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        alert(data.message || 'Xəta baş verdi');
      }
    } catch (error) {
      alert('Serverlə əlaqə xətası');
    }
  };

  return (
    <div className={style.password}>
      <ExpargoMenu className={style.menu} />
      <div className={style.passwordContainer}>
        <h2 onClick={()=>navigate(-1)} ><IoIosArrowBack /> Şifrə dəyişikliyi</h2>
        <div className={style.container}>
          <div className={style.inp}>
            <IoLockClosedOutline />
            <input
              type="password"
              placeholder='Cari şifrəni qeyd edin'
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
            />
            <IoEyeOffOutline />
          </div>

          <div className={style.inp}>
            <IoLockClosedOutline />
            <input
              type="password"
              placeholder='Yeni şifrəni qeyd edin'
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <IoEyeOffOutline />
          </div>

          <div className={style.inp}>
            <IoLockClosedOutline />
            <input
              type="password"
              placeholder='Yeni şifrənin təkrarı'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <IoEyeOffOutline />
          </div>

          <button onClick={handleSubmit}>Təstiqlə</button>
        </div>
      </div>
    </div>
  );
};

export default Password;
