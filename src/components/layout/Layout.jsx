// src/components/layout/Layout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet /> {/* Yahan aapke child routes (jaise HomePage) render honge */}
      </main>
      {/* Aap yahan Footer bhi add kar sakte hain */}
    </div>
  );
};

export default Layout;