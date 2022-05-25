import React, { useState } from "react";
import ErrorList from "./layout/ErrorList";

const EditPositionForm = (props) => {
  const [editPosition, setEditPosition] = useState({
    name: props.name,
    position: props.position,
  });

  const handleInputChange = (event) => {
    setEditPosition({
      ...editPosition,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (await props.patchPosition(editPosition, props.id)) {
      props.toggleEdit();
    }
  };

  const errorList = props.errors ? <ErrorList errors={props.errors} /> : null;

  return (
    <div>
      <h3>Update Position </h3>
      {errorList}
      <form
        onSubmit={async (event) => {
          await handleSubmit(event);
        }}
      >
        <label>
          Add Player:
          <input type="text" name="name" onChange={handleInputChange} value={editPosition.name} />
        </label>
        <input
          type="button"
          name="position"
          onChange={handleInputChange}
          value={editPosition.position}
        />
      </form>
    </div>
  );
};

export default EditPositionForm;
