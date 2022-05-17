import React, { useState, useEffect } from "react";

import TeamTile from "./TeamTile.js";

const PlayerShowPage = (props) => {
  const [player, setPlayer] = useState({ teams: [] });

  const id = props.match.params.id;

  const getPlayer = async () => {
    try {
      const response = await fetch(`/api/v1/players/${id}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const playerData = await response.json();
      setPlayer(playerData.player);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getPlayer();
  }, []);

  const teamTileComponents = player.teams.map((teamObject) => {
    return <TeamTile key={teamObject.id} {...teamObject} />;
  });

  return (
    <div className="callout">
      <h1>
        Players:
        {player.firstName} {player.lastName}
      </h1>
      {teamTileComponents}
    </div>
  );
};

export default PlayerShowPage;
