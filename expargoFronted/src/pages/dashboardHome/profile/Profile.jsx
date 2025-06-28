// Profile.jsx
import React, { useState } from 'react';
import style from './Profile.module.scss';
import { CiUser } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import ExpargoMenu from '../../loginPage/sections/expargoMenu/ExpargoMenu';
import { useNavigate } from 'react-router-dom';
import DeleteUser from '../deleteUser/DeleteUser'; // Hesab silmə modalı
import Logout from '../../loginPage/sections/logout/Logout'; // Çıxış modalı

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Hesabı sil
  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:7777/api/users/${user._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Hesabı silmək mümkün olmadı');
      }

      localStorage.removeItem('user');
      localStorage.removeItem('token');
      alert('Hesabınız uğurla silindi');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // Çıxış et
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={style.profile}>
      <ExpargoMenu className={style.menu} />
      <div className={style.container}>
        <div className={style.user}>
          <CiUser />
          <h2>{user?.name} {user?.surname}</h2>
        </div>

        <div className={style.inp}>
          <span>ID: {user?.customId}</span>
          <h5>Xarici ünvanlarda istifadə etmək zəruridir.</h5>
        </div>

        <div className={style.inp}><h5>Cari filial:{user?.address}</h5></div>

        <div className={style.inp} onClick={() => navigate('/profile/details')}>
          <h2>Şəxsi məlumatlar</h2><IoIosArrowForward />
        </div>

        <div className={style.inp} onClick={() => navigate('/profile/password')}>
          <h2>Şifrə dəyişikliyi</h2><IoIosArrowForward />
        </div>

        <div className={style.inp} onClick={() => navigate('/profile/payments-all')}>
          <h2>Ödənişlər</h2><IoIosArrowForward />
        </div>

        <div className={style.inp} onClick={() => setShowDeleteModal(true)}>
          <h2>Hesabı sil</h2><IoIosArrowForward />
        </div>

        <div className={style.inp} onClick={() => setShowLogoutModal(true)}>
          <h2>Çıxış et</h2><IoIosArrowForward />
        </div>
      </div>

      {showDeleteModal && (
        <DeleteUser
          user={user}
          onClose={() => setShowDeleteModal(false)}
          onDelete={handleDeleteAccount}
        />
      )}

      {showLogoutModal && (
        <Logout
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
};

export default Profile;
