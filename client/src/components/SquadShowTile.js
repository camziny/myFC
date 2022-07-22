import React from "react";
import { Link } from "react-router-dom";

const SquadShowTile = ({ id, name }) => {
  return (
      <div className="grid-container">
        <Link to={`/squads/${id}`}>
          <div className="grid-x grid-margin-x small-up-2 medium-up-3 align-center">
            <div className="cell">
          <div className="card">
            <div className="card-section">
              <div className="squad-name">{name}</div>
              <div className="squad-image">{image}</div>
              <div className="squad-st">{st}</div>
              <div className="squad-lw">{lw}</div>
              <div className="squad-rw">{rw}</div>
              <div className="squad-cm">{cm}</div>
              <div className="squad-lm">{lm}</div>
              <div className="squad-rm">{rm}</div>
              <div className="squad-lcb">{lcb}</div>
              <div className="squad-rcb">{rcb}</div>
              <div className="squad-lb">{lb}</div>
              <div className="squad-rb">{rb}</div>
              <div className="squad-gk">{gk}</div>
            </div>
          </div>
          </div>
          </div>
        </Link>
      </div>
  );
};

export default SquadShowTile