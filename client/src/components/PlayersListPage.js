import React, { useState, useEffect } from "react";

import PlayerTile from "./PlayerTile.js";

const PlayersListPage = () => {
  const [players, setPlayers] = useState([]);

  const getPlayers = async () => {
    try {
      const response = await fetch("/api/v1/players");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      console.log(parsedResponse.response);
      setPlayers(parsedResponse.response);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getPlayers();
  }, []);

  const playerTileComponents = players.map((playerObject) => {
    return (
      <PlayerTile
        key={playerObject.player.id}
        id={playerObject.player.id}
        name={playerObject.player.name}
        team={playerObject.statistics.team}
        position={playerObject.statistics.games}
        nationality={playerObject.player.nationality}
        photo={playerObject.player.photo}
        teamId={playerObject.statistics.team}
        teamName={playerObject.statistics.team}
      />
    );
  });

  return (
    <div className="playersList">
      <div className="playersListHeader">Players:</div>
      {playerTileComponents}
    </div>
  );
};

export default PlayersListPage;
