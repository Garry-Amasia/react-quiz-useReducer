import React from "react";

export const StartScreen = ({ numberOfQuestions, dispatch }) => {
  // console.log("StartScreen Components");
  return (
    <div className="start">
      <h2>Welcome to the Quizz!!</h2>
      <h3> {numberOfQuestions} questions to test your React knowledge</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        lets begin..
      </button>
    </div>
  );
};
