import React from "react";
import { useNavigate } from "react-router-dom";
import "./Support.css";
import Header from "./Header";
import Footer from "./Footer";

function Support() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/"); // Navigates to the home page
  };

  return (
    <div className="support-container">
      <Header />

      <div className="contact-form">
        <h1>Contact Form:</h1>
        <form>
          <input type="email" placeholder="Email Address" className="input-field" required />
          <input type="text" placeholder="Message Subject" className="input-field" required />
          <textarea placeholder="Message" className="message-box" required></textarea>
          <p className="note">**Our team should get back to you within 3-5 business days. If no response by that time, please call our support number. Thank you!</p>
          <div className="button-group">
            <button type="submit" className="send-button">
              Send!
            </button>
          </div>
          <div className="back-button-group">
            <button type="button" className="back-button" onClick={handleBackClick}>
              Back
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Support;
