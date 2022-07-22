import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SquadAssignmentTile from "./SquadAssignmentTile";
import ErrorList from "./layout/ErrorList";
import translateServerErrors from "../services/translateServerErrors";

const AssignmentShowPage = (props) => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState([]);
  const [errors, setErrors] = useState([]);

  const getAssignment = async () => {
    try {
      const response = await fetch(`/api/v1/assignments/${id}`);
      if (!response.ok) {
        const errorMessage = `{response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const assignmentData = await response.json();
      console.log(assignmentData)
      setAssignment(assignmentData);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getAssignment()
  }, []);

  const squadAssignmentTileComponents = assignment.map((assignmentObject) => {
    return (
      <SquadAssignmentTile
        key={assignmentObject.player.id}
        id={assignmentObject.player.id}
        name={assignmentObject.player.name}
        age={assignmentObject.player.age}
        height={assignmentObject.player.height}
        weight={assignmentObject.player.weight}
        nationality={assignmentObject.player.nationality}
        position={assignmentObject.statistics[0].games.position}
        photo={assignmentObject.player.photo}
        teamLogo={assignmentObject.statistics[0].team.logo}
        goals={assignmentObject.statistics[0].goals.total}
        shotTotal={assignmentObject.statistics[0].shots.total}
        shotAccuracy={assignmentObject.statistics[0].shots.on}
        assists={assignmentObject.statistics[0].goals.assists}
        passesTotal={assignmentObject.statistics[0].passes.total}
        passAccuracy={assignmentObject.statistics[0].passes.accuracy}
        saves={assignmentObject.statistics[0].goals.saves}
        conceded={assignmentObject.statistics[0].goals.conceded}
        yellowCards={assignmentObject.statistics[0].cards.yellow}
        redCards={assignmentObject.statistics[0].cards.red}
      />
      );
    });

  return (
 <div>
     {squadAssignmentTileComponents}
     </div>
  );
};

export default AssignmentShowPage;
