import React from "react";
import { Options } from "./Options";

export const Questions = ({ question }) => {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
};
