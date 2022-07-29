import React from "react";
import { Link } from "react-router-dom";

const SquadAssignmentTile = ({
  id,
  name,
  age,
  height,
  weight,
  nationality,
  position,
  photo,
  teamLogo,
  goals,
  shotTotal,
  shotAccuracy,
  assists,
  passesTotal,
  passAccuracy,
  saves,
  conceded,
  yellowCards,
  redCards,
}) => {
  return (
    <div className="radius bordered shadow card">
      <div className="card-divider align-center">
      <Link to={`/assignments/${playerId}`}>
        <div className="card-section">
          <div className="playerName text-center">{name}</div>
          <div className="player-photo-wrapper text-center">
          <img className="playerPhoto" src={photo}></img>
          </div>
          <div className="playerNationality text-center">{nationality}</div>
          <div className="player-age text-center">Age: {age}</div>
          <div className="player-height text-center">Height: {height}</div>
          <div className="player-weight text-center">Weight: {weight}</div>
          <div className="playerPosition text-center">{position}</div>
          <div className="player-team-logo-wrapper text-center">
          <img className="playerTeamLogo" src={teamLogo} alt="team logo"></img>
          </div>
          <div className="playerStatistics text-center">
            <ul>
              <div className="playerGoals">Goals: {goals}</div>
              <div className="player-shot-total">Total Shots: {shotTotal}</div>
              <div className="player-shot-accuracy">Shot Accuracy: {shotAccuracy}%</div>
              <div className="playerAssists">Assists: {assists || 0}</div>
              <div className="player-pass-total">Total Passes: {passesTotal}</div>
              <div className="player-pass-accuracy">Pass Accuracy: {passAccuracy}%</div>
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
    </div>
  );
};

export default SquadAssignmentTile;