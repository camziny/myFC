import React from "react";
import { Link } from "react-router-dom";

const PlayerTile = ({
  id,
  name,
  nationality,
  position,
  photo,
  teamLogo,
  goals,
  assists,
  saves,
  conceded,
  yellowCards,
  redCards,
}) => {
  return (
    <div className="playerTile">
      <Link to={`/players/${id}`}>
        <div className="playersInfo">
          <div className="playerName text-center">{name}</div>
          <div className="playerNationality text-center">{nationality}</div>
          <div className="playerPosition text-center">{position}</div>
          <img className="playerPhoto" src={photo}></img>
          <img className="playerTeamLogo" src={teamLogo}></img>
          <div className="playerStatistics">
            <ul>
              <div className="playerGoals">Goals: {goals}</div>
              <div className="playerAssists">Assists: {assists || 0}</div>
              <div className="playerSaves">Saves: {saves || 0}</div>
              <div className="playerConceded">Goals Allowed: {conceded || 0}</div>
              <div className="playerYellowCards">Yellow Cards: {yellowCards}</div>
              <div className="playerRedCards">Red Cards: {redCards}</div>
            </ul>
            <div></div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlayerTile;
