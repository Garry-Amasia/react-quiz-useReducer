import React from "react";

export const Options = ({ question }) => {
  return (
    <div className="options">
      {question.options.map((singleAnswer) => {
        return (
          <button className="btn btn-option" key={singleAnswer}>
            {singleAnswer}
          </button>
        );
      })}
    </div>
  );
};
