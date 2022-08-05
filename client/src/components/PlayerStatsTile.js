import React from "react";

const PlayerStatsTile = ({
  id,
  name,
  nationality,
  age,
  weight,
  appearances,
  minutes,
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
    <div className="radius bordered shadow">
      <div className="card-divider"></div>
      <div className="player-stats-preview">
        <div className="playerName">{name}</div>
        <div className="playerNationality">{nationality}</div>
        <div className="playerPosition">{position}</div>
        <div className="player-photo-team-photo">
          <img src={photo}></img>
          <img src={teamLogo} alt="team logo"></img>
        </div>
        <div className="player-statistics">
          <ul>
            <div className="playerAge">Age: {age}</div>
            <div className="playerWeight">Weight: {weight}</div>
            <div className="playerAppearances">Appearances:{appearances}</div>
            <div className="playerMinutes">Minutes Played: {minutes}</div>
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
    </div>
  );
};
export default PlayerStatsTile;
