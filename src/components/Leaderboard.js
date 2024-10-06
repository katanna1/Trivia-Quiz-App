import React from "react";
import { useNavigate } from "react-router-dom";
import "./leaderboard.css";
import Header from "./Header";
import Footer from "./Footer";


function Friends() {
   const navigate = useNavigate();


   const handleBackClick = () => {
       navigate("/");
   };


   return (
       <div>
           <Header />
           <h1>Leaderboard</h1>
           <button onClick={handleBackClick}>Back</button>
           <Footer />
       </div>
   );
}


export default Leaderboard;
