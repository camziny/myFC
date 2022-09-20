import React, { useState } from "react";
import ErrorList from "./layout/ErrorList";
import Dropzone from "react-dropzone";

const EditSquadForm = (props) => {
  const [editSquad, setEditSquad] = useState({
    name: props.name,
    image: props.image,
  });

  const handleInputChange = (event) => {
    setEditSquad({
      ...editSquad,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (await props.patchSquad(editSquad, props.id)) {
      props.toggleEdit();
    }
  };

  const errorList = props.errors ? <ErrorList errors={props.errors} /> : null;

  return (
    <div>
      <h3>Update Squad Information</h3>
      {errorList}
      <form
        onSubmit={async (event) => {
          await handleSubmit(event);
        }}
      >
        <label>
          Name:
          <input type="text" name="name" onChange={handleInputChange} value={editSquad.name} />
        </label>
        <label>
          Image:
          <Dropzone onDrop={handleImageUpload}>
            {({ getRootProps, getInputProps }) => (
              <div className="cell">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <input
                    className="new-squad-button"
                    type="add"
                    onChange={handleInputChange}
                    value={editSquad.image}
                  />
                </div>
              </div>
            )}
          </Dropzone>
        </label>
        <input type="submit" value="Update Squad" />
      </form>
    </div>
  );
};

export default EditSquadForm;
