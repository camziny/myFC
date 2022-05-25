import React from "react";
import { Link } from "react-router-dom";

const TeamTile = ({ id, name, logo, stadium }) => {
  return (
    <div className="callout">
      <Link to={`/teams/${id}`}>
        <div className="teamName">{name}</div>
        <img className="teamLogo" src={logo}></img>
        <img className="teamStadium" src={stadium}></img>
      </Link>
    </div>
  );
};

export default TeamTile;
