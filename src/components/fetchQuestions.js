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
