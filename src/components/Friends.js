import React from "react";
import { useNavigate } from "react-router-dom";
import "./Friends.css";
import Header from "./Header";
import Footer from "./Footer";

function Friends() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="friends-container">
      <Header />
      <header className="home-header">
        <div className="logo" onClick={() => navigate("/")}>
          <h1>LOGO</h1>
        </div>
      </header>

      <button className="back-button" onClick={handleBackClick}>
        Back
      </button>

      <main className="friends-list">
        <h1>Friends</h1>
        <ul>
          <li>Friend 1</li>
          <li>Friend 2</li>
          <li>Friend 3</li>
          <li>Friend 4</li>
        </ul>
      </main>
      <Footer />
    </div>
  );
}

export default Friends;
