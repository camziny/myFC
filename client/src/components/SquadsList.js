import React, { useState, useEffect } from "react";
import SquadTile from "./SquadTile.js";
import NewSquadForm from "./NewSquadForm.js";

const SquadsList = (props) => {
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

  const addNewSquad = (squad) => {
    setSquads([...squads, squad]);
  };

  useEffect(() => {
    getSquads();
  }, []);

  const squadTileComponents = squads.map((squadObject) => {
    return <SquadTile key={`squadTile-${squadObject.id}`} {...squadObject} />
  })

  const squadForm = props.user ? <NewSquadForm addNewSquad={addNewSquad} /> : null;

  return (
    <div>
      <div>{squadForm}</div>
      <div className="user-squads-list">
        <div className="squad-list-header">Existing Squads</div>
        <div className="squad-tiles">{squadTileComponents}</div>
      </div>
    </div>
  );
};

export default SquadsList;
