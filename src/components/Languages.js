import React from "react";
import { useNavigate } from "react-router-dom";
import "./Languages.css";

function Languages() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="footer-page">
      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>
      <h1>Languages</h1>
      <p>List of available languages will be shown here.</p>
    </div>
  );
}

export default Languages;
