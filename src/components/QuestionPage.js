import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./QuestionPage.css"; // Make sure to style this file to enhance the UI
import Header from "./Header";
import Footer from "./Footer";

const QuestionPage = () => {
  const { state } = useLocation();
  const { topicId, difficulty } = state; // Get topicId and difficulty from navigation state
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState(Array(5).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${topicId}&difficulty=${difficulty}&type=multiple`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const formattedQuestions = data.results.map((item) => ({
          question: item.question,
          correctAnswer: item.correct_answer,
          answers: [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5),
        }));

        setQuestions(formattedQuestions);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [topicId, difficulty]);

  const handleAnswerSelect = (questionIndex, answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <div className="question-page-container">
      <Header />
      <main className="question-page-main">
        <h1>Trivia Questions</h1>

        {loading && <p>Loading questions...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && questions.length > 0 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {questions.map((q, index) => (
              <div key={index} className="question-block">
                <h2 dangerouslySetInnerHTML={{ __html: q.question }} />
                <ul className="answers-list">
                  {q.answers.map((answer, i) => (
                    <li key={i} className={`answer-option ${submitted ? (answer === q.correctAnswer ? "correct" : userAnswers[index] === answer ? "incorrect" : "") : ""}`} onClick={() => handleAnswerSelect(index, answer)} dangerouslySetInnerHTML={{ __html: answer }} />
                  ))}
                </ul>
              </div>
            ))}
            <button type="submit" className="submit-button">
              Submit Answers
            </button>
          </form>
        )}

        {submitted && (
          <div className="results">
            <h2>Results</h2>
            {questions.map((q, index) => (
              <div key={index} className="result-item">
                <h3 dangerouslySetInnerHTML={{ __html: q.question }} />
                <p>
                  Your Answer: <span className={userAnswers[index] === q.correctAnswer ? "correct" : "incorrect"}>{userAnswers[index]}</span>
                </p>
                <p>
                  Correct Answer: <span className="correct">{q.correctAnswer}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default QuestionPage;
