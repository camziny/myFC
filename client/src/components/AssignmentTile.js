import React from "react";
import { Link } from "react-router-dom";

const AssignmentTile = ({ id, name }) => {
  return (
    <div className="radius bordered shadow card">
      <div className="card-divider">
        <Link to={`/players/${id}`}>
          <div className="card-section">
            <div className="playerName text-center">{name}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AssignmentTile;
