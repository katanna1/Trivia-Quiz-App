import React, { useEffect, useState } from "react";

const FetchQuestions = ({ topicId, difficulty }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch questions from the API
  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
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

  // Use useEffect to fetch questions on component mount or when topicId/difficulty changes
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
