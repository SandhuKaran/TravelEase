import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container poppins-thin">
        <div className="logo">TravelEase</div>
        <nav className="navigation">
          <div className="social-icons">
            <a
              href="https://github.com/SandhuKaran"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sandhukaran/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
