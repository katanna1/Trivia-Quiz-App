import React, { useState } from 'react';
import './Leaderboard.css'; // Create this CSS file for styling
import Header from './Header'; // Header component
import Footer from './Footer'; // Footer component

const Leaderboard = () => {
  // Sample data (you can replace this with a database connection later)
  const [players] = useState([
    { name: 'Sofia J.', score: 304, ranking: '1st' },
    { name: 'Eva M.', score: 275, ranking: '2nd' },
    { name: 'Sally R.', score: 200, ranking: '3rd' },
    { name: 'John D.', score: 154, ranking: '4th' },
  ]);

  return (
    <div className="leaderboard-container">
      <Header /> {/* Assuming you have a Header component */}
      
      <div className="leaderboard">
        <h2>Leaderboard</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
              <th>Overall Ranking</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={index}>
                <td>{player.name}</td>
                <td>{player.score}</td>
                <td>{player.ranking}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <Footer /> {/* Assuming you have a Footer component */}
    </div>
  );
};

export default Leaderboard;
