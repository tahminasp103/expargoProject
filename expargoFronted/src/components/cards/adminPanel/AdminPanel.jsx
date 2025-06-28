// src/components/cards/adminPanel/AdminPanel.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import style from './AdminPanel.module.scss';

const AdminPanel = () => {
  return (
    <div className={style.adminPanel}>
      <h1 className={style.title}>🛠 Admin Panel</h1>

      <nav className={style.nav}>
        <NavLink to="/admin/news" className={({ isActive }) => isActive ? style.activeLink : style.link}>
          Xəbərlər
        </NavLink>
        <NavLink to="/admin/branch" className={({ isActive }) => isActive ? style.activeLink : style.link}>
          Filiallar
        </NavLink>
        <NavLink to="/admin/price" className={({ isActive }) => isActive ? style.activeLink : style.link}>
          Qiymətlər
        </NavLink>
        <NavLink to="/admin/faq" className={({ isActive }) => isActive ? style.activeLink : style.link}>
          FAQ
        </NavLink>
       <NavLink to="/admin/tickets" className={({ isActive }) => isActive ? style.activeLink : style.link}>
          Müraciətlər
        </NavLink>
        {/* Yeni Packages linki */}
        <NavLink to="/admin/packages" className={({ isActive }) => isActive ? style.activeLink : style.link}>
          Bağlamalar
        </NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => isActive ? style.activeLink : style.link}>
          Users
        </NavLink>
      </nav>

      <div className={style.outletContainer}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPanel;
