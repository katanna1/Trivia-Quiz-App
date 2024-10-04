import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./QuestionPage.css";
import Header from "./Header";
import Footer from "./Footer";

const QuestionPage = () => {
  const { state } = useLocation();
  const { topicId, difficulty } = state || {}; // Ensure state is defined
  const [questions, setQuestions] = useState([]); // Initialize the questions state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!topicId || !difficulty) {
      setError("Topic ID or difficulty is missing.");
      setLoading(false);
      return;
    }

    const fetchQuestions = async () => {
      try {
        const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${topicId}&difficulty=${difficulty}&type=multiple`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const formattedQuestions = data.results.map((item) => ({
          question: item.question,
          correctAnswer: item.correct_answer,
          answers: [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5),
        }));

        setQuestions(formattedQuestions); // Set the questions state
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [topicId, difficulty]);

  return (
    <div className="question-page-container">
      <Header />
      <main className="question-page-main">
        <h1>Trivia Questions</h1>

        {loading && <p>Loading questions...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && questions.length > 0 && (
          <ul>
            {questions.map((question, index) => (
              <li key={index}>
                <h3 dangerouslySetInnerHTML={{ __html: question.question }} />
                <ul>
                  {question.answers.map((answer, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: answer }} />
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default QuestionPage;
