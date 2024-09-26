import React from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import Header from "./Header";
import Footer from "./Footer";

function Register() {
  const navigate = useNavigate();

  const handleBackClick = (e) => {
    e.preventDefault(); // Prevent form submission
    navigate("/"); // Navigate back to the homepage
  };

  return (
    <div className="register-container">
      <Header />
      <main className="register-form">
        <h1>🎉 Register Now!</h1>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" placeholder="Enter your username" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Create a password" required />
          </div>

          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm your password" required />
          </div>

          <div className="button-group">
            <button type="submit" className="submit-button">
              Register
            </button>
            <button className="back-button" onClick={handleBackClick}>
              Back
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default Register;
