import React, { useState, useEffect } from "react";

import PlayerTile from "./PlayerTile.js";

import ErrorList from "./layout/ErrorList.js";

import translateServerErrors from "../services/translateServerErrors.js";

const TeamsShowPage = (props) => {
  const [team, setTeam] = useState({ players: [] });
  const [errors, setErrors] = useState([]);

  const id = props.match.params.id;

  const getTeam = async () => {
    try {
      const response = await fetch(`/api/v1/teams/${id}`);
      if (!response.ok) {
        const errorMessage = `{response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const teamData = await response.json();
      setTeam(teamData.team);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getTeam();
  }, []);

  const playerTileComponents = team.players.map((teamObject) => {
    return <PlayerTile key={teamObject.id} {...teamObject} />;
  });

  return (
    <div className="callout">
      <h1>Team Name</h1>
      <h2>Players</h2>
      {playerTileComponents}
    </div>
  );
};

export default TeamsShowPage;
