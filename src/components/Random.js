import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Random.css"; // Use the same CSS file as QuestionPage.css
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
      resetState(); // Reset states on new question load
    } catch (error) {
      console.error("Error fetching question:", error);
      console.log("Failed to load question. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetState = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowCorrectAnswer(false);
    setShowNextQuestion(false);
    setProgress(100);
    setTimerActive(false);
  };

  useEffect(() => {
    fetchQuestion(); // Load a question on component mount
  }, []);

  // Smooth progress bar countdown logic
  useEffect(() => {
    if (timerActive && progress > 0) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress - 2.5; // Decrease progress in small steps
          if (newProgress <= 0) {
            clearInterval(interval);
            setTimeout(() => setShowNextQuestion(true), 500); // Small delay before showing the button
          }
          return newProgress;
        });
      }, 62.5); // Update every 62.5ms for smooth animation over 4 seconds

      return () => clearInterval(interval);
    }
  }, [timerActive, progress]);

  const handleAnswerClick = (answer) => {
    // Only set the selected answer if no answer has been chosen yet
    if (selectedAnswer === null) {
      setSelectedAnswer(answer);
      setIsCorrect(answer === question.correctAnswer);
      setShowCorrectAnswer(true); // Show correct answer after user selects an answer
      setTimerActive(true); // Start the timer after the answer is selected
    }
  };

  const handleNextQuestionClick = () => {
    fetchQuestion(); // Fetch a new question when the button is clicked
  };

  return (
    <div className="random-page-container">
      <Header />
      <div className="random-container">
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
                      className={`random-answer-option 
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
            {selectedAnswer && <p className={isCorrect ? "correct-text" : "incorrect-text"}>{isCorrect ? "Correct!" : `Incorrect! The correct answer is: ${question.correctAnswer}`}</p>}

            {/* Progress bar animation, starts only after an answer is clicked */}
            {selectedAnswer && (
              <div className="random-progress-bar-wrapper">
                <div className="random-progress-bar" style={{ width: `${progress}%` }}></div>
              </div>
            )}

            {/* Show "Next Question" button only when the progress bar finishes */}
            {showNextQuestion && (
              <button className="random-next-question-btn random-fade-in" onClick={handleNextQuestionClick}>
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
