// src/pages/loginPage/sections/privateRoute/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UniversalRoute = ({ children, role }) => {
  const { user } = useSelector(state => state.auth);

  if (!user) {
    // İstifadəçi login deyilsə
    return <Navigate to="/loginUser" replace />;
  }

  if (role && user.role !== role) {
    // İstifadəçinin rolu uyğun gəlmirsə
    return <Navigate to="/" replace />;
  }

  return children;
};

export default UniversalRoute;
