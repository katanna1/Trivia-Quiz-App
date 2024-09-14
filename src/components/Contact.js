import React from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

function Contact() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="contact-container">
      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>
      <h1>Contact Us</h1>
      <p>Contact information will be shown here.</p>
    </div>
  );
}

export default Contact;
