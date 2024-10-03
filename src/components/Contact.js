import React from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";
import Header from "./Header";
import Footer from "./Footer";

const Contact = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/"); // Navigates back to the home page
  };

  return (
    <div className="contact-page">
      <Header />
      <div className="contact-content">
        <h1>Contact Us</h1>
        <p>If you have any questions, feel free to reach out to us.</p>
        <p>
          Email: <a href="mailto:contact@yourdomain.com">contact@yourdomain.com</a>
        </p>
        <p>
          Phone: <a href="tel:+1234567890">(123) 456-7890</a>
        </p>
        <div className="back-button-group">
          <button className="back-button" onClick={handleBackClick}>
            &larr; Back
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
