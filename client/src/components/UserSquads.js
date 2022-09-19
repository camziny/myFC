import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SquadTile from "./SquadTile";

const UserSquads = (props) => {
  const [squads, setSquads] = useState([]);

  const getSquads = async () => {
    try {
      const response = await fetch("/api/v1/squads");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      setSquads(parsedResponse.squads);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getSquads();
  }, []);

  const squadTileComponents = squads.map((squadObject) => {
    return <div className="user-squads-components"><ul>
        <SquadTile key={`squadTile-${squadObject.id}`} {...squadObject}/>
        </ul>
        </div>
  });

  return (
    <div className="user-squads">
      <h2>Existing Squads</h2>
     {squadTileComponents}
    </div>
  );
};

export default UserSquads;
