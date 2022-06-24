import React from "react";

const PlayerOption = ({ id, player, assignmentOptions, handlePlayerAssignment }) => {
  const assignments = [
    striker,
    leftWing,
    rightWing,
    centerMidFielder,
    leftMidFielder,
    rightMidFielder,
    leftCenterBack,
    rightCenterBack,
    leftBack,
    rightBack,
    goalKeeper,
  ];

  const playerAssignments = assignments.map((assignment) => {
    return (
      <div key={`${id}-${assignment}`} className="cell small-3">
        <label htmlFor={id}>
          {assignment}
          </label>
        <input
          id={id}
          type="radio"
          name={player}
          value={assignment}
          checked={assignmentOptions == assignment}
          onChange={handlePlayerAssignment}
        />
      </div>
    );
  });

  return (
    <div className="cell small-6 callout text-center">
      <p>
        <b>
          <em>{player}</em>
        </b>
      </p>
      <div className="grid-x">{playerAssignments}</div>
    </div>
  );
};

export default PlayerOption;