
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/Logo.jpeg";
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* University Information */}
        <div className="footer-brand">
          <div className="footer-logo-section">
            <img
              src={Logo}
              alt="Wallaga University Logo"
              className="footer-logo"
            />

            <div>
              <h3>Wallaga University</h3>
              <span>INSTITUTE OF TECHNOLOGY</span>
            </div>
          </div>

          <p className="footer-description">
            Empowering students to make informed academic choices
            and build meaningful futures.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>

          <Link to="/departments">Departments</Link>
          <Link to="/about">About the system</Link>
        </div>

        {/* System Links */}
        <div className="footer-links">
          <h4>System Links</h4>

          <Link to="/announcements">Announcements</Link>
          <Link to="/login">System login</Link>
        </div>

        {/* Contact Information */}
        <div className="footer-contact">
          <h4>Contact</h4>

          <p>Wallaga University, Nekemte</p>

          <a href="mailto:registrar@wollegauniversity.edu.et">
            registrar@wollegauniversity.edu.et
          </a>

          <a href="tel:+251576617981">
            +251 57 661 7981
          </a>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">

        <p>
          © 2025 Wallaga University. All rights reserved.
        </p>

        <span>
          Department Selection and Placement System
        </span>

      </div>

    </footer>
  );
};


