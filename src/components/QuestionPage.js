import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./QuestionPage.css";

function QuestionPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { topicId = 9, difficulty = "easy" } = state || {}; // Default values if state is undefined

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log(`Fetching questions for topic ID ${topicId} with difficulty ${difficulty}`);
        const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${topicId}&difficulty=${difficulty}&type=multiple`);

        // Log the URL and response status for debugging
        console.log(`Request URL: ${response.url}`);
        console.log(`Response Status: ${response.status}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Log the data for debugging
        console.log("API Response:", data);

        if (data.results) {
          setQuestions(data.results);
        } else {
          throw new Error("No questions found in the API response");
        }
      } catch (error) {
        setError(`Failed to fetch questions: ${error.message}`);
        console.error("Error fetching questions:", error);
      }
      setLoading(false);
    };
    fetchQuestions();
  }, [topicId, difficulty]);

  const handleBackClick = () => {
    navigate("/choose-topic");
  };

  return (
    <div className="question-page-container">
      <header className="question-page-header">
        <div className="logo" onClick={() => navigate("/")}>
          <h1>LOGO</h1>
        </div>
      </header>

      <main className="question-page-main">
        <button className="back-button" onClick={handleBackClick}>
          Back
        </button>
        <h1>Questions</h1>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && questions.length > 0 ? (
          questions.map((question, index) => (
            <div key={index} className="question-card">
              <h2>{decodeURIComponent(question.question)}</h2>
              <ul>
                {question.incorrect_answers.map((answer, idx) => (
                  <li key={idx}>{decodeURIComponent(answer)}</li>
                ))}
                <li>{decodeURIComponent(question.correct_answer)}</li>
              </ul>
            </div>
          ))
        ) : (
          <p>No questions available.</p>
        )}
      </main>

      <footer className="question-page-footer">
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

export default QuestionPage;
