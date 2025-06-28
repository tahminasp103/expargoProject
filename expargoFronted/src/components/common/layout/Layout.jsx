// src/components/common/layout/Layout.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const Layout = ({ children, footerVariant }) => {
  const location = useLocation();
  const path = location.pathname;

  // Əgər prop verilibsə, onu istifadə et, əks halda avtomatik təyin et
  let variant = footerVariant || 'default';

  if (!footerVariant) {
    if (['/faq', '/about'].includes(path)) {
      variant = 'light';
    }
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer variant={variant} />
    </>
  );
};

export default Layout;
