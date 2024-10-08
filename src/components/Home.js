import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Home.css";
import Header from "./Header";
import Footer from "./Footer";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Header />
      <main className="main">
        <h1 className="home-title">{t("welcome")}</h1> {/* Translation key for the title */}
        <p className="home-subtitle">{t("subtitle")}</p> {/* Translation key for the subtitle */}
        <div className="button-wrapper">
          <div className="glow-element"></div>
          <button className="play-button" onClick={() => navigate("/choose-topic")}>
            {t("play_now")} {/* Translation key for the button text */}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
