

import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../../../assets/images/Logo.jpeg";
export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* University Logo and Brand */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <img
            src={logo}
            alt="Wallaga University Logo"
            className="university-logo"
          />

          <div className="brand-text">
            <h2>Wallaga University</h2>
            <span>INSTITUTE OF TECHNOLOGY</span>
          </div>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/departments"
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
            onClick={closeMenu}
          >
            Department Information
          </NavLink>

          <NavLink
            to="/announcements"
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
            onClick={closeMenu}
          >
            Announcements
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
            onClick={closeMenu}
          >
            About
          </NavLink>

          {/* Login Button */}
          <Link
            to="/login"
            className="navbar-login"
            onClick={closeMenu}
          >
            Login <span>→</span>
          </Link>

        </nav>
      </div>
    </header>
  );
};


