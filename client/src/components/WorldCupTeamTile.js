import React from "react";
import { Link } from "react-router-dom";

const WorldCupTeamTile = ({ id, name, logo, stadium }) => {
  return (
    <div className="callout">
      <Link to={`/worldCupTeams/${id}`}>
        <div className="teamName">{name}</div>
        <img className="teamLogo" src={logo}></img>
        <img className="teamStadium" src={stadium}></img>
      </Link>
    </div>
  );
};

export default WorldCupTeamTile;
