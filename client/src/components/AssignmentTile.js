import React from "react";
import { Link } from "react-router-dom";

const AssignmentTile = ({ id, name, position }) => {
  return (
      <div className="grid-container">
        <Link to={`/assignments/${id}`}>
          <div className="grid-x grid-margin-x small-up-2 medium-up-3 align-center">
            <div className="cell">
          <div className="card">
            <div className="card-section">
            <div className="playerName text-center">{name}</div>
            <div className="position-section">{position}</div>
            </div>
          </div>
          </div>
          </div>
        </Link>
      </div>
  );
};

export default AssignmentTile;
