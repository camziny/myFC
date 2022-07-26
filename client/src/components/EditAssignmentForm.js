import React, { useState } from "react";
import ErrorList from "./layout/ErrorList";

const EditAssignmentForm = (props) => {
  const [editAssignment, setEditAssignment] = useState({
    assignment: props.assignment,
  });

  const handleInputChange = (event) => {
    setEditAssignment({
      ...editAssignment,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (await props.patchAssignment(editAssignment, props.id)) {
      props.toggleEdit();
    }
  };

  const errorList = props.errors ? <ErrorList errors={props.errors} /> : null;

  return (
    <div>
      <h3>Update Player</h3>
      {errorList}
      <form
        onSubmit={async (event) => {
          await handleSubmit(event);
        }}
      >
        <label>
          Add Player:
        <input
          type="button"
          name="position"
          onChange={handleInputChange}
          value={editAssignment.position}
        />
        </label>
      </form>
    </div>
  );
};

export default EditAssignmentForm;
