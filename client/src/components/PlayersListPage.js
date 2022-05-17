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
      setPlayers(parsedResponse.players);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getPlayers();
  }, []);

  const playerTileComponents = players.map((playerObject) => {
    return <PlayerTile key={playerObject.id} {...playerObject} />;
  });

  return (
    <div className="callout">
      <h1>Players:</h1>
      {playerTileComponents}
    </div>
  );
};

export default PlayersListPage;
