import React from "react";

export const Progress = ({ index, numberOfQuestions }) => {
  console.log(numberOfQuestions);
  return (
    <header className="progress">
      <p>
        Question <strong>{index + 1}</strong> / {numberOfQuestions}
      </p>
    </header>
  );
};
