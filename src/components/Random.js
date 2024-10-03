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
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [progress, setProgress] = useState(100);
  const [timerActive, setTimerActive] = useState(false);

  const navigate = useNavigate();

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        throw new Error("No questions found in the API response.");
      }

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
      setShowNextQuestion(false); // Hide next question button when new question loads
      setProgress(100); // Reset progress bar
      setTimerActive(false); // Stop the timer on new question
    } catch (error) {
      console.error("Error fetching question:", error);
      alert("Failed to load question. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  // Progress bar countdown logic, but only when timerActive is true
  useEffect(() => {
    if (timerActive && progress > 0) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress - 20;
          if (newProgress <= 0) {
            clearInterval(interval);
            setTimeout(() => setShowNextQuestion(true), 500); // Small delay before showing the button
          }
          return newProgress;
        });
      }, 1000); // Decrease progress every second

      return () => clearInterval(interval);
    }
  }, [timerActive, progress]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === question.correctAnswer);
    setShowCorrectAnswer(true); // Show correct answer after user selects an answer
    setTimerActive(true); // Start the timer after the answer is selected
  };

  const handleNextQuestionClick = () => {
    fetchQuestion(); // Fetch a new question when the button is clicked
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

            {/* Display feedback after an answer is selected */}
            {selectedAnswer && (
              <p className={isCorrect ? "correct-text" : "incorrect-text"}>
                {isCorrect ? "Correct!" : `Incorrect! The correct answer is: ${question.correctAnswer}`}
              </p>
            )}

            {/* Progress bar animation, starts only after an answer is clicked */}
            {selectedAnswer && (
              <div className="progress-bar-wrapper">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
              </div>
            )}

            {/* Show "Next Question" button only when the progress bar finishes */}
            {showNextQuestion && (
              <button className="next-question-btn fade-in" onClick={handleNextQuestionClick}>
                Next Question
              </button>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Random;
