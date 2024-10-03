import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="icon" onClick={() => navigate("/")}>
        {/* Future icon will go here */}
      </div>
      <div className="know-it-all" onClick={() => navigate("/")}>
        Know It All
      </div>
      <div className="header-buttons">
        <button className="login-button" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="register-button" onClick={() => navigate("/register")}>
          Register
        </button>
        <button className="random-button" onClick={() => navigate("/Random")}>
          Random
        </button>
      </div>
    </header>
  );
};

export default Header;
