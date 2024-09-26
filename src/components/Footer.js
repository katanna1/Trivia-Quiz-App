import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <button className="footer-button" onClick={() => navigate("/languages")}>
        Languages
      </button>
      <button className="footer-button" onClick={() => navigate("/support")}>
        Support
      </button>
      <button className="footer-button" onClick={() => navigate("/contact")}>
        Contact Us
      </button>
    </footer>
  );
};

export default Footer;
