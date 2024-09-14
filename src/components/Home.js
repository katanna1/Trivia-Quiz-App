import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="header">
        <div className="logo" onClick={() => navigate("/")}>
          <h1>LOGO</h1>
        </div>
        <div className="login-register">
          <button className="login-button" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="login-button" onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </header>

      <main className="main">
        <h1>KNOW IT ALL!</h1>
        <p>Test Your Knowledge and Become the Ultimate Know-It-All!</p>
        <button className="play-button" onClick={() => navigate("/choose-topic")}>
          PLAY NOW!
        </button>
      </main>

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
    </div>
  );
}

export default Home;
