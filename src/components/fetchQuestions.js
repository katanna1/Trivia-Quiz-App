import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FetchQuestions = () => {
  const { topicId, difficulty } = useParams(); // Get topicId and difficulty from URL
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      // Log the URL being requested for debugging
      const url = `https://opentdb.com/api.php?amount=10&category=${topicId}&difficulty=${difficulty}&type=multiple`;
      console.log(`Fetching questions from: ${url}`);

      const response = await fetch(url);

      // Log the response status for debugging
      console.log(`Response Status: ${response.status}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Log the raw data for debugging
      console.log("API Response Data:", data);

      // Ensure that the results property exists and is an array
      if (data.results && Array.isArray(data.results) && data.results.length > 0) {
        setQuestions(data.results);
      } else {
        throw new Error("No questions found in the API response");
      }
    } catch (error) {
      setError(`Failed to fetch questions: ${error.message}`);
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [topicId, difficulty]);

  return (
    <div>
      {loading && <p>Loading questions...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {questions.length > 0 && (
        <ul>
          {questions.map((question, index) => (
            <li key={index}>
              <h3>{question.question}</h3>
              <ul>
                {question.incorrect_answers.concat(question.correct_answer).map((answer, i) => (
                  <li key={i}>{answer}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FetchQuestions;
