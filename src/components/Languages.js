import React from "react";
import { useNavigate } from "react-router-dom";
import "./Languages.css";
import Header from "./Header";
import Footer from "./Footer";

const Languages = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="languages-page">
      <Header />
      <div className="languages-content">
        <h1 className="languages-title">Available Languages</h1>
        <p className="languages-text">We currently support the following languages:</p>
        <ul className="languages-list">
          <li>English</li>
          <li>Spanish</li>
        </ul>
        <button className="back-button" onClick={handleBackClick}>
          &larr; Back
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Languages;
