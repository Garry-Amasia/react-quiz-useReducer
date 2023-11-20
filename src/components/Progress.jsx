import React from "react";

export const Progress = ({
  index,
  numberOfQuestions,
  points,
  maxAmountOfPoints,
  answer,
}) => {
  //   console.log(numberOfQuestions);
  return (
    <header className="progress">
      <progress max={numberOfQuestions} value={index} />
      <p>
        Question <strong>{index + 1}</strong> / {numberOfQuestions}
      </p>
      <p>
        <strong>{points}</strong>/ {maxAmountOfPoints}
      </p>
    </header>
  );
};
