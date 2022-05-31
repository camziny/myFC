import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import translateServerErrors from "../services/translateServerErrors.js";
import ErrorList from "./layout/ErrorList.js";
import SquadTile from "./SquadTile.js";

const SquadShowPage = (props) => {
  const { id } = useParams();
  const [squad, setSquad] = useState({
    name: "",
    image: {},
    assignments: []
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getSquad();
  }, []);

  const getSquad = async () => {
    try {
      const response = await fetch(`/api/v1/squads/${id}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const squadData = await response.json();
      console.log(squadData)
      setSquad(squadData.squad);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  // const deletePosition = async (positionId) => {
  //   try {
  //     const response = await fetch(`/api/v1/positions/${positionId}`, {
  //       method: "DELETE",
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     if (!response.ok) {
  //       if (response.status === 401) {
  //         const body = await response.json();
  //         return setErrors(body);
  //       } else {
  //         throw new Error(`${response.status} (${response.statusText})`);
  //       }
  //     } else {
  //       const body = await response.json();
  //       const filteredPositions = squad.positions.filter((position) => {
  //         return position.id !== positionId;
  //       });
  //       setErrors({});
  //       setSquad({ ...squad, positions: filteredPositions });
  //     }
  //   } catch (error) {
  //     console.error(`Error in fetch: ${error.message}`);
  //   }
  // };

  // const patchPosition = async (positionBody, positionId) => {
  //   try {
  //     const response = await fetch(`/api/v1/positions/${positionId}`, {
  //       method: "PATCH",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(positionBody),
  //     });
  //     if (!response.ok) {
  //       if (response.status === 422) {
  //         const body = await response.json();
  //         const updatedPositionsWithErrors = squad.positions.map((position) => {
  //           if (position.id === positionId) {
  //             position.errors = body;
  //           }
  //           return position;
  //         });
  //         setSquad({ ...squad, positions: updatedPositionsWithErrors });
  //         return false;
  //       } else {
  //         const errorMessage = `${response.status} (${response.statusText})`;
  //         const error = new Error(errorMessage);
  //         throw error;
  //       }
  //     } else {
  //       const body = await response.json();
  //       const updatedPositions = squad.positions.map((position) => {
  //         if (position.id === positionId) {
  //           position.name = body.position.name;
  //           position.position = body.position.position;
  //           if (position.errors) {
  //             delete position.errors;
  //           }
  //         }
  //         return position;
  //       });
  //       setErrors({});
  //       setSquad({ ...squad, positions: updatedPositions });
  //       return true;
  //     }
  //   } catch (error) {
  //     console.error(`Error in fetch: ${error.message}`);
  //     return false;
  //   }
  // };

  const squadTileComponents = squad.map((squadObject) => {
    return ( 
    <SquadTile 
    key={squadObject.squad.id}
    id={squadObject.squad.id}
    name={squadObject.squad.name}
    image={squadObject.squad.image}
    assignments={squadObject.squad.assignments}
    />
  )
  })


  const errorList = Object.keys(errors) ? <ErrorList errors={errors} /> : null;

  return (
    <div className="squad-show-page">
      {squadTileComponents}
      <div className="squad-show-position-form">
        {errorList}
      </div>
    </div>
  );
};

export default SquadShowPage;
