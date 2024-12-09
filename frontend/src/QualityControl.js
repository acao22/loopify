import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";

const QualityControl = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { nextPath } = location.state || {}; // Extract the next path and title from state

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Hardcoded question and answers
  const question = "Which of the following is a fruit?";
  const answers = [
    { id: 1, text: "Carrot" },
    { id: 2, text: "Apple", isCorrect: true }, // Correct answer
    { id: 3, text: "Broccoli" },
    { id: 4, text: "Potato" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedAnswer && answers.find((ans) => ans.id === selectedAnswer)?.isCorrect) {
      navigate(nextPath || "/");
    } else {
      setErrorMessage("Sorry, you didn't pass the quality control check.");
    }
  };

  return (
    <div className="bg-gradient-to-b-custom min-h-screen font-gabarito flex flex-col items-center justify-center">
      {/* Navbar */}
      <Navbar />
      <div className="text-center p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Quality Control Check</h1>
        <p className="mb-4">Please answer the following question to proceed:</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset className="mb-4">
            <legend className="font-semibold mb-4">{question}</legend>
            <div className="flex flex-col items-center space-y-3">
              {answers.map((answer) => (
                <label
                  key={answer.id}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="quality-control"
                    value={answer.id}
                    onChange={() => setSelectedAnswer(answer.id)}
                    className="form-radio"
                  />
                  <span>{answer.text}</span>
                </label>
              ))}
            </div>
          </fieldset>
          {errorMessage && (
            <p className="text-red-600 mb-4">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="py-3 px-6 w-full rounded-lg bg-[#76B247] text-white font-semibold hover:bg-[#2E5D09] transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};  

export default QualityControl;
