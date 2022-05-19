import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlayerTile from "./PlayerTile.js";

import ErrorList from "./layout/ErrorList.js";

import translateServerErrors from "../services/translateServerErrors.js";

const TeamsShowPage = (props) => {
  const { id } = useParams()
  const [team, setTeam] = useState([]);
  const [errors, setErrors] = useState([]);
  const [pageNumber, setPageNumber] = 1

  const getTeam = async () => {
    try {
      const response = await fetch(`/api/v1/teams/${id}?pageNumber=${pageNumber}`);
      if (!response.ok) {
        const errorMessage = `{response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const teamData = await response.json();
      setTeam(teamData);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getTeam();
  }, []);

  const playerTileComponents = team.map((playerObject) => {
    return <PlayerTile 
    key={playerObject.id}
    name={playerObject.player.name}
    nationality={playerObject.player.nationality}
    position={playerObject.statistics[0].games.position}
    photo={playerObject.player.photo}
    goals={playerObject.statistics[0].goals.total}
    assists={playerObject.statistics[0].goals.assists}
    saves={playerObject.statistics[0].goals.saves}
    conceded={playerObject.statistics[0].goals.conceded}
    yellowCards={playerObject.statistics[0].cards.yellow}
    redCards={playerObject.statistics[0].cards.red}
    />;
  });

  return (
    <div className="playerList">
      {playerTileComponents}
    </div>
  );
};

export default TeamsShowPage;
