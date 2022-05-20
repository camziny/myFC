import React, { useState, useEffect } from "react";
import SquadTile from "./SquadTile";
import NewSquadForm from "./NewSquadForm";

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
    return <SquadTile key={squadObject.id} {...squadObject} />;
  });

  const squadForm = props.user ? <NewSquadForm addNewSquad={addNewSquad} /> : null;

  return (
    <div className="squadsListForm">
      {squadForm}
      <div className="squadList">
        Squads:
        {squadTileComponents}
      </div>
    </div>
  );
};

export default SquadsList;
