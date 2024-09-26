import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Header from "./Header";
import Footer from "./Footer";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Header />
      <main className="main">
        <h1 className="home-title">KNOW IT ALL!</h1>
        <p className="home-subtitle">Test Your Knowledge and Become the Ultimate Know-It-All!</p>

        <div className="button-wrapper">
          <div className="glow-element"></div>
          <button className="play-button" onClick={() => navigate("/choose-topic")}>
            PLAY NOW!
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
