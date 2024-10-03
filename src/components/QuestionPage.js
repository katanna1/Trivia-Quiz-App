import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./QuestionPage.css";
import Header from "./Header";
import Footer from "./Footer";

const QuestionPage = () => {
  const { state } = useLocation();
  const { topicId, difficulty } = state; // Get topicId and difficulty from navigation state
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [nextEnabled, setNextEnabled] = useState(false); // For enabling next button after 5 seconds

  // Fetch all questions at once (to avoid multiple API calls)
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`);
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
        setStartTime(Date.now()); // Start the timer when questions are fetched
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [topicId, difficulty]);

  // Handle selection of answer
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setNextEnabled(false); // Disable the next button until timer finishes

    // Enable the next button after 5 seconds
    setTimeout(() => {
      setNextEnabled(true);
    }, 5000);
  };

  // Handle submission of answer and move to next question
  const handleNextQuestion = () => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < 4) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to next question
      setSelectedAnswer(null); // Reset selected answer
      setNextEnabled(false); // Reset next button for new question
    } else {
      setSubmitted(true);
      setEndTime(Date.now()); // End the timer when all questions are submitted
    }
  };

  const calculateTimeTaken = () => {
    const timeInSeconds = (endTime - startTime) / 1000;
    return timeInSeconds.toFixed(2); // Return time in seconds, rounded to 2 decimal places
  };

  return (
    <div className="question-page-container">
      <Header />
      <main className="question-page-main">
        <h1>Trivia Questions</h1>

        {loading && <p>Loading questions...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && questions.length > 0 && !submitted && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNextQuestion();
            }}
          >
            <div className="question-block">
              <h2 dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }} />
              <ul className="answers-list">
                {questions[currentQuestionIndex].answers.map((answer, i) => (
                  <li key={i}>
                    <label>
                      <input
                        type="radio"
                        name={`question-${currentQuestionIndex}`}
                        value={answer}
                        checked={selectedAnswer === answer}
                        onChange={() => handleAnswerSelect(answer)}
                      />
                      <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Only show next button after 5 seconds */}
            {nextEnabled && (
              <button type="submit" className="submit-button" disabled={!selectedAnswer}>
                {currentQuestionIndex < 4 ? "Next Question" : "Submit Final Answer"}
              </button>
            )}
          </form>
        )}

        {submitted && (
          <div className="results">
            <h2>Results</h2>
            <p>Time taken: {calculateTimeTaken()} seconds</p>
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
