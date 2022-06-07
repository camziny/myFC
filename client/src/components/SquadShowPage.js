import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import translateServerErrors from "../services/translateServerErrors.js";
import ErrorList from "./layout/ErrorList.js";
import AssignmentTile from "./AssignmentTile.js";
import AssignmentShowPage from "./AssignmentShowPage.js";

const SquadShowPage = (props) => {
  const { id } = useParams();
  const [squad, setSquad] = useState({
    name: "",
    image: {},
    assignments: [],
  });
  const { assignmentId } = useParams();
  const [errors, setErrors] = useState({});
  const [assignments, setAssignments] = useState([]);

  const getSquad = async () => {
    try {
      const response = await fetch(`/api/v1/squads/${id}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const squadData = await response.json();
      setSquad(squadData.squad);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getSquad();
  }, []);


  const getAssignments = async () => {
    try {
      const response = await fetch("/api/v1/assignments");
      if (!response.ok) {
        const errorMessage = `{response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const assignmentsData = await response.json();
      console.log(assignmentsData)
      setAssignments(assignmentsData);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };
  useEffect(() => {
    getAssignments();
  }, []);



  // useEffect(() => {
  //   getAssignment();
  // }, []);

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

  const assignmentTileComponents = squad.assignments.map((assignmentObject) => {
    return <AssignmentTile 
    key={assignmentObject.playerId} 
    id={assignmentObject.playerId}
    position={assignmentObject.position}
    />;
  });


  const errorList = Object.keys(errors) ? <ErrorList errors={errors} /> : null;

  return (
    <div className="grid-container">
      <div className="squad-name text-center">
        <h1>{squad.name}</h1>
        <img className="squad-photo" src={squad.image}></img>
        </div>
        <div className="squad-player-list text-center">
        <h4>Positions</h4>
        </div>
      {assignmentTileComponents}
      <div className="squad-show-position-form">{errorList}</div>
    </div>
  );
};

export default SquadShowPage;
