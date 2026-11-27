
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from '../../layout/public/Navbar.jsx';
import { Footer } from '../../layout/public/Footer.jsx';

import "./PublicLayout.css";

export const PublicLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="public-layout">
      <Navbar />

      <main className="public-main">
        <Outlet />
      </main>

      {!isHomePage && <Footer />}
    </div>
  );
};


