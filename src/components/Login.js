import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Header from "./Header";
import Footer from "./Footer";

function Login() {
  const navigate = useNavigate();

  const handleBackClick = (e) => {
    e.preventDefault(); // Prevent form submission
    navigate("/"); // Navigate back to the homepage
  };

  return (
    <div className="login-container">
      <Header />
      <main className="login-form">
        <h1>Login</h1>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" placeholder="Enter your username" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" required />
          </div>

          <div className="button-group">
            <button type="submit" className="submit-button">
              Login
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

export default Login;
