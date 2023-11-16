import React from "react";

export const Options = ({ question, dispatch, answer }) => {
  console.log(answer);
  console.log(answer);
  return (
    <div className="options">
      {question.options.map((singleAnswer, index) => {
        return (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              index === question.correctOption ? "correct" : "wrong"
            }`}
            key={singleAnswer}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {singleAnswer}
          </button>
        );
      })}
    </div>
  );
};
