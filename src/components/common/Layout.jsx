// src/components/common/Layout.jsx
import React from 'react';
import Menu from './Menu';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Menu />
      <main className="flex-grow-1 container py-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;