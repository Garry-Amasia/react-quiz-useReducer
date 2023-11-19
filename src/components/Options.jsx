import React from "react";

export const Options = ({ question, dispatch, answer }) => {
  const hasAnswer = answer !== null;
  //   console.log("Options Component");
  return (
    <div className="options">
      {question.options.map((singleAnswer, index) => {
        return (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswer
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={singleAnswer}
            disabled={hasAnswer}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {singleAnswer}
          </button>
        );
      })}
    </div>
  );
};
