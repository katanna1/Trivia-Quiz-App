import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="login-container">
      <header className="home-header">
        <div className="logo" onClick={() => navigate("/")}>
          <h1>LOGO</h1>
        </div>
      </header>

      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>

      <main className="login-form">
        <h1>Login</h1>
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
      </main>
    </div>
  );
}

export default Login;
