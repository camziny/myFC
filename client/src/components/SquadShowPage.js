import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorList from "./layout/ErrorList.js";
import AssignmentTile from "./AssignmentTile.js";
import NewAssignmentForm from "./NewAssignmentForm.js";

const SquadShowPage = (props) => {
  const { id } = useParams();
  const [squad, setSquad] = useState({
    name: "",
    image: {},
    assignments: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getSquad();
  }, []);

  const addNewAssignment = (assignment) => {
    setSquad({ ...squad, assignments: [...squad.assignments, assignment] });
  };

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

  const deleteAssignment = async (assignmentId) => {
    try {
      const response = await fetch(`/api/v1/assignments/${assignmentId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        if (response.status === 401) {
          const body = await response.json();
          return setErrors(body);
        } else {
          throw new Error(`${response.status} (${response.statusText})`);
        }
      } else {
        const body = await response.json();
        const filteredAssignments = squad.assignments.filter((assignment) => {
          return assignment.id !== assignmentId;
        });
        setErrors({});
        setSquad({ ...squad, assignments: filteredAssignments });
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  const patchAssignment = async (assignmentBody, assignmentId) => {
    try {
      const response = await fetch(`/api/v1/assignments/${assignmentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assignmentBody),
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const updatedAssignmentsWithErrors = squad.assignments.map((assignment) => {
            if (assignment.id === assignmentId) {
              assignment.errors = body;
            }
            return assignment;
          });
          setSquad({ ...squad, assignments: updatedAssignmentsWithErrors });
          return false;
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage)
          throw error;
        }
      } else {
        const body = await response.json();
        const updatedAssignments = squad.assignments.map((assignment) => {
          if (assignment.id === assignmentId) {
            assignment.position = body.assignment.position;
            if (review.errors) {
              delete review.errors;
            }
          }
          return assignment;
        });
        setErrors({});
        setSquad({ ...squad, assignments: updatedAssignments})
        return true;
      }
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
      return false;
    }
  };

  const assignmentTiles = squad.assignments.map((assignmentObject) => {
    let curUserId = null;
    let userLoggedIn = false;
    if (props.user) {
      curUserId = props.user.id;
      userLoggedIn = true;
    }
    return (
      <AssignmentTile
        {...assignmentObject}
        key={assignmentObject.id}
        id={assignmentObject.id}
        position={assignmentObject.position}
        creatorId={assignmentObject.userId}
        creator={assignmentObject.user}
        deleteAssignment={deleteAssignment}
        curUserId={curUserId}
        patchAssignment={patchAssignment}
        userLoggedIn={userLoggedIn}
      />
    );
  })

  const squadName = squad.name ? <div className="squad-show-name">{squad.name}</div> : null;

  const squadImage = squad.image ? (
    <div className="squad-show-image">
      <img src={squad.image}></img>
    </div>
  ) : null;

  const assignmentSection = assignmentTiles.length ? (
    <>
    <table className="squad-assignment-section">
      <h3>{squad.name} Players:</h3>
      <p>(Click on a player to view their stats)</p>
    </table>
    {assignmentTiles}
  </>
  ) : null;

  const assignmentForm = props.user ? (
    <NewAssignmentForm squadId={id} addNewAssignment={addNewAssignment} />
  ) : null;

  const errorList = Object.keys(errors) ? <ErrorList errors={errors} /> : null;

  return (
    <div className="container">
    <div className="grid-1 text-center">
        <h1>{squadName}</h1>
          <img src={squad.image} />
      </div>
      <div>{errorList}</div>
      <div className="grid-4">
        <div className="squad-player-table">
        <td>{assignmentSection}</td></div></div>
      <div className="grid-3">{assignmentForm}</div>
    </div>
  );
};

export default SquadShowPage;
