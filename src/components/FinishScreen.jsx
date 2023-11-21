import React from "react";

export const FinishScreen = ({ points, maxAmountOfPoints, highscore }) => {
  const percentage = Math.ceil((points / maxAmountOfPoints) * 100);
  return (
    <>
      <p className="result">
        You have scored {points} out of {maxAmountOfPoints} -
        <span style={{ fontWeight: "bold", color: "green", margin: 0 }}>
          {percentage}%
        </span>
        -
      </p>
      <p className="highscore">Highscore is {highscore} points</p>
    </>
  );
};
