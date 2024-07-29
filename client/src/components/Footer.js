import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container poppins-thin">
        <div className="footer-left">
          <p>sandhk20@mcmaster.ca</p>
        </div>
        <div className="footer-middle">
          <p>Thanks for visiting</p>
        </div>
        <div className="footer-right">
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
