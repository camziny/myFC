import React, { useState, useEffect } from "react";

import WorldCupTeamTile from "./WorldCupTeamTile.js";

const WorldCupTeamsList = () => {
  const [worldCupTeams, setWorldCupTeams] = useState([]);

  const getWorldCupTeams = async () => {
    try {
      const response = await fetch("/api/v1/WorldCupTeams");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      setWorldCupTeams(parsedResponse.response);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getWorldCupTeams();
  }, []);

  const teamTileComponents = worldCupTeams.map((teamObject) => {
    return (
      <WorldCupTeamTile
        key={teamObject.team.id}
        id={teamObject.team.id}
        name={teamObject.team.name}
        logo={teamObject.team.logo}
      />
    );
  });

  return (
    <div className="teamsListBackground">
      <div className="teamsList">
        <div className="teams-list-header">2022 World Cup Teams</div>
        {teamTileComponents}
      </div>
    </div>
  );
};

export default WorldCupTeamsList;
