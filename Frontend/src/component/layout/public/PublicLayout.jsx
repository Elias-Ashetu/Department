
import React from "react";
import { Outlet } from "react-router-dom";

import { Navbar } from '../../layout/public/Navbar.jsx';
import { Footer } from '../../layout/public/Footer.jsx';

import "./PublicLayout.css";

export const PublicLayout = () => {
  return (
    <div className="public-layout">

      <Navbar />

      <main className="public-main">
        <Outlet />
      </main>
 
      <Footer />

    </div>
  );
};


