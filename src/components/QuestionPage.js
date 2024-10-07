import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./QuestionPage.css";
import Header from "./Header";
import Footer from "./Footer";

const QuestionPage = () => {
  const { state } = useLocation();
  const { topicId, difficulty } = state || {};
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(100);
  const [timerActive, setTimerActive] = useState(false);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!topicId || !difficulty) {
        alert("Topic ID or difficulty is missing.");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${topicId}&difficulty=${difficulty}&type=multiple`);
        const data = await response.json();

        const formattedQuestions = data.results.map((item) => ({
          question: item.question,
          correctAnswer: item.correct_answer,
          answers: [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5),
        }));

        setQuestions(formattedQuestions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        alert("Failed to load questions. Please try again.");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [topicId, difficulty]);

  useEffect(() => {
    if (timerActive && progress > 0) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress - 20;
          if (newProgress <= 0) {
            clearInterval(interval);
            setShowNextQuestion(true);
          }
          return newProgress;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timerActive, progress]);

  const handleAnswerClick = (answer) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answer);
      const correct = answer === questions[currentQuestionIndex].correctAnswer;
      setIsCorrect(correct);
      setShowCorrectAnswer(true);
      setTimerActive(true);

      if (correct) {
        setScore((prevScore) => prevScore + 20);
      } else {
        setScore((prevScore) => prevScore - 5);
      }
    }
  };

  const handleNextQuestionClick = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowCorrectAnswer(false);
    setShowNextQuestion(false);
    setProgress(100);
    setTimerActive(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizEnded(true); // End quiz and show final score
    }
  };

  const handleReplay = () => {
    window.location.reload(); // Reload the page for replay
  };

  const handleBack = () => {
    navigate("/choose-topic"); // Navigate back to choose topic page
  };

  const handleSkip = () => {
    navigate("/"); // Navigate to home page
  };

  return (
    <div className="question-page-container">
      <Header />
      <main className="question-page-main">
        <h1>Trivia Questions</h1>

        {loading ? (
          <p>Loading questions...</p>
        ) : quizEnded ? (
          <div className="score-section">
            <h2>Your Score</h2>
            <p>{score}</p>

            <div className="end-options">
              <button onClick={() => alert(JSON.stringify(questions, null, 2))}>Answers</button>
              <button onClick={handleReplay}>Replay</button>
              <button onClick={handleBack}>Back</button>
              <button onClick={handleSkip}>Skip</button>
            </div>
          </div>
        ) : (
          <>
            {questions.length > 0 && (
              <>
                <h2
                  dangerouslySetInnerHTML={{
                    __html: questions[currentQuestionIndex].question,
                  }}
                />
                <ul>
                  {questions[currentQuestionIndex].answers.map((answer, index) => (
                    <li
                      key={index}
                      className={`answer-option 
                        ${selectedAnswer === answer ? (isCorrect ? "correct" : "selected") : ""}
                        ${showCorrectAnswer && answer === questions[currentQuestionIndex].correctAnswer ? "correct" : ""}
                      `}
                      onClick={() => handleAnswerClick(answer)}
                      dangerouslySetInnerHTML={{ __html: answer }}
                    />
                  ))}
                </ul>

                {selectedAnswer && <p className={isCorrect ? "correct-text" : "incorrect-text"}>{isCorrect ? "Correct!" : `Incorrect! The correct answer is: ${questions[currentQuestionIndex].correctAnswer}`}</p>}

                {selectedAnswer && (
                  <div className="progress-bar-wrapper">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                  </div>
                )}

                {showNextQuestion && (
                  <button className="next-question-btn fade-in" onClick={handleNextQuestionClick}>
                    Next Question
                  </button>
                )}
              </>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default QuestionPage;
