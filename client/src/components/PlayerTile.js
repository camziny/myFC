import React, { useState } from "react";
import { Link } from "react-router-dom";

const PlayerTile = ({
  id,
  name,
  nationality,
  position,
  playerId,
  photo,
  teamLogo,
  goals,
  assists,
  saves,
  conceded,
  yellowCards,
  redCards,
  newAssignment,
  handlePlayerAdd,
  isSelected,
}) => {
  const [selected, setSelected] = useState(false);
  const toggle = () => {
    setSelected(!selected);
  };
  return (
    <div className="radius bordered shadow">
      <div className="card-divider">
        <div className={`card-section ${isSelected ? "selected" : ""}`}>
          <div className="player-preview">
            <div className="playerName text-center">{name}</div>
            <div className="playerNationality text-center">{nationality}</div>
            <div className="playerPosition text-center">{position}</div>
            <img className="playerPhoto" src={photo}></img>
            <img className="playerTeamLogo" src={teamLogo} alt="team logo"></img>
            <div className="playerStatistics">
              <ul>
                <div className="playerGoals">Goals: {goals}</div>
                <div className="playerAssists">Assists: {assists || 0}</div>
                <div className="playerSaves">Saves: {saves || 0}</div>
                <div className="playerConceded">Goals Allowed: {conceded || 0}</div>
                <div className="playerYellowCards">Yellow Cards: {yellowCards}</div>
                <div className="playerRedCards">Red Cards: {redCards}</div>
              </ul>
              <div>
                <button
                  onClick={() => {
                    toggle();
                    handlePlayerAdd(id, name, position, playerId);
                  }}
                  className={"toggle-button" + (selected ? "toggle-selected" : "")}
                >
                  {selected ? "Player Selected" : "Add Player"}
                </button>
              </div>
              <div></div>
              {(newAssignment = null)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerTile;
