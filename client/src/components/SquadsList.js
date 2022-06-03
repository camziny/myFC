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
      console.log(parsedResponse.assignments);
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
    return (
      <SquadTile
        key={squadObject.id}
        id={squadObject.id}
        name={squadObject.name}
        image={squadObject.image}
        assignments={squadObject.assignments}
      />
    );
  });

  const squadForm = <NewSquadForm addNewSquad={addNewSquad} />;

  return (
    <div>
      <div className="dropdown">
        <button className="dropbtn">Featured Squads</button>
        <div className="dropdown-content">
          {squadTileComponents}
        </div>
      </div>
      <div className="">{squadForm}</div>
    </div>
  );
};

export default SquadsList;
