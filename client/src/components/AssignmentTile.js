import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditAssignmentForm from "./EditAssignmentForm.js";

const AssignmentTile = ({
  id,
  name,
  position,
  playerId,
  deleteAssignment,
  creatorId,
  curUserId,
  patchAssignment,
  errors,
  userLoggedIn,
  creator,
}) => {
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  const buttons =
    creatorId === curUserId ? (
      <div className="review-edit-delete">
        <input
          className="button"
          type="button"
          value="Edit Player"
          onClick={() => {
            toggleEdit();
          }}
        />
        <input
          className="button"
          type="button"
          value="Delete Player"
          onClick={() => {
            deleteAssignment(id);
          }}
        />
      </div>
    ) : null;

  const toggleEdit = () => {
    setIsBeingEdited(!isBeingEdited);
  };
  if (isBeingEdited) {
    return (
      <EditAssignmentForm
        patchAssignment={patchAssignment}
        id={id}
        name={name}
        position={position}
        playerId={playerId}
        toggleEdit={toggleEdit}
        errors={errors}
      />
    );
  }

  return (
    <div className="grid-container">
      <div className="row">
        <Link to={`/assignments/${playerId}`}>
          <div className="row">
            <div className="cell">
              <h4>{name}</h4>
              <p>{position}</p>
              <div></div>
            </div>
          </div>
        </Link>
        {buttons}
      </div>
    </div>
  );
};

export default AssignmentTile;
