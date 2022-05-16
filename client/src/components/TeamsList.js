import React, { useState, useEffect } from "react";

import TeamTile from "./TeamTile.js";

const TeamsList = () => {
  const [teams, setTeams] = useState([]);

  const getTeams = async () => {
    try {
      const response = await fetch("/api/v1/teams");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      setTeams(parsedResponse.teams);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  const teamTileComponents = teams.map((teamObject) => {
    return <TeamTile key={teamObject.id} {...teamObject} />;
  });

  return (
    <div className="callout">
      Featured Teams
      {teamTileComponents}
    </div>
  );
};

export default TeamsList;
