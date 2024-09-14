import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./QuestionPage.css";

function QuestionPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { topicId, difficulty } = state || { topicId: 9, difficulty: "easy" }; // Default values if state is undefined

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://opentdb.com/api.php?amount=10&category=<CATEGORY_ID>&difficulty=<DIFFICULTY>&type=multiple
`);
        const data = await response.json();
        if (data.results) {
          setQuestions(data.results);
        } else {
          throw new Error("No questions found");
        }
      } catch (error) {
        setError("Failed to fetch questions. Please try again.");
        console.error("Failed to fetch questions", error);
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
