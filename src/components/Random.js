import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Random.css";
import Header from "./Header";
import Footer from "./Footer";

const Random = () => {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const navigate = useNavigate();

  const fetchQuestion = async () => {
    setLoading(true);
    const response = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
    const data = await response.json();
    const triviaData = data.results[0];

    const formattedQuestion = {
      question: triviaData.question,
      correctAnswer: triviaData.correct_answer,
      answers: [...triviaData.incorrect_answers, triviaData.correct_answer].sort(() => Math.random() - 0.5),
    };

    setQuestion(formattedQuestion);
    setAnswers(formattedQuestion.answers);
    setSelectedAnswer(null); // Reset the selected answer
    setIsCorrect(null); // Reset correctness check
    setShowCorrectAnswer(false); // Hide the correct answer when new question loads
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === question.correctAnswer);
    setShowCorrectAnswer(true); // Show the correct answer after the user clicks an answer
  };

  const handleReloadClick = () => {
    fetchQuestion(); // Re-fetch a new question
  };

  return (
    <div className="home-container">
      <Header />
      <div className="trivia-container">
        {loading ? (
          <p>Loading question...</p>
        ) : (
          <>
            {question && (
              <>
                <h2 dangerouslySetInnerHTML={{ __html: question.question }} />
                <ul>
                  {answers.map((answer, index) => (
                    <li
                      key={index}
                      className={`answer-option 
                        ${selectedAnswer === answer ? (isCorrect ? "correct" : "selected") : ""}
                        ${showCorrectAnswer && answer === question.correctAnswer ? "correct" : ""}
                      `}
                      onClick={() => handleAnswerClick(answer)}
                      dangerouslySetInnerHTML={{ __html: answer }}
                    />
                  ))}
                </ul>
              </>
            )}

            {selectedAnswer && <p className={isCorrect ? "correct-text" : "incorrect-text"}>{isCorrect ? "Correct!" : `Incorrect! The correct answer is: ${question.correctAnswer}`}</p>}

            <button onClick={handleReloadClick} className="reload-btn">
              Reload Question
            </button>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Random;
