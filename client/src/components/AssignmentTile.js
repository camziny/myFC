import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditAssignmentForm from "./EditAssignmentForm.js"

const AssignmentTile = ({
  id,
  position,
  deleteAssignment,
  creatorId,
  curUserId,
  patchAssignment,
  errors,
  userLoggedIn,
  creator
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
        toggleEdit()
      }}
      />
      <input 
      className="button"
      type="button"
      value="Delete Player"
      onClick={() => {
        deleteAssignment(id)
      }}
      />
    </div>
  ) : null

  const toggleEdit = () => {
    setIsBeingEdited(!isBeingEdited)
  }
  if (isBeingEdited) {
    return (
      <EditAssignmentForm
      patchAssignment={patchAssignment}
      id={id}
      position={position}
      toggleEdit={toggleEdit}
      errors={errors}
      />
    )
  }

  return (
      <div className="grid-container">
        <Link to={`/assignments/${id}`}>
          <div className="grid-x grid-margin-x small-up-2 medium-up-3 align-center">
            <div className="cell">
          <div className="card">
            <div className="card-section">
              <h4>{position}</h4>
              <div>
                {buttons}
              </div>
              </div>
          </div>
          </div>
          </div>
        </Link>
        </div>
  );
};

export default AssignmentTile;
