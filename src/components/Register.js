import React from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="register-container">
      <header className="home-header">
        <div className="logo" onClick={() => navigate("/")}>
          <h1>LOGO</h1>
        </div>
      </header>

      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>

      <main className="register-form">
        <h1>Register</h1>
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input type="password" id="confirm-password" name="confirm-password" />
          <button type="submit" className="submit-button">
            Register
          </button>
        </form>
      </main>
    </div>
  );
}

export default Register;
