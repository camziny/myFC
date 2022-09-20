import React, { useState, useEffect } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import translateServerErrors from "../services/translateServerErrors";
import ErrorList from "./layout/ErrorList";
import Dropzone from "react-dropzone";
import UserSquads from "./UserSquads";

const NewSquadForm = (props) => {
  const [newSquad, setNewSquad] = useState({
    name: "",
    image: {},
  });

  const [errors, setErrors] = useState({});

  const [uploadedImage, setUploadedImage] = useState({
    preview: "",
  });

  const postSquad = async () => {
    try {
      const body = new FormData();
      body.append("name", newSquad.name);
      body.append("image", newSquad.image);
      const response = await fetch("api/v1/squads", {
        method: "POST",
        headers: { Accept: "image/jpeg" },
        body: body,
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors.data);
          return setErrors(newErrors);
        }
        throw new Error(`${response.status} (${response.statusText})`);
      } else {
        const body = await response.json();
        props.addNewSquad(body.squad);
        clearForm();
      }
    } catch (error) {
      console.log(`Error in fetch: ${error.message}`);
    }
  };
  const handleInputChange = (event) => {
    event.preventDefault();
    setNewSquad({ ...newSquad, [event.currentTarget.name]: event.currentTarget.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postSquad(newSquad);
  };

  const handleImageUpload = (acceptedImage) => {
    setNewSquad({
      ...newSquad,
      image: acceptedImage[0],
    });

    setUploadedImage({
      preview: URL.createObjectURL(acceptedImage[0]),
    });
  };

  const clearForm = () => {
    setNewSquad({
      name: "",
      image: {},
    });

    setUploadedImage({
      preview: "",
    });
  };

  return (
      <div className="holy-grail-header">
      <UserSquads />
        <div className="squad-form-header">
          Create a Squad
          <div className="squad-form-image">
            <img
              className="squad-backgroundImage"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsveTwTjrwHzeB-Rsc6d5i6RDMuu5LXDZjeg&usqp=CAU"
              alt=""
            />
          </div>
        </div>
        <ErrorList errors={errors} />
        <div className="cell medium-8">
          <form className="new-squad" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="squad name"
              onChange={handleInputChange}
              value={newSquad.name}
            />

            <Dropzone onDrop={handleImageUpload}>
              {({ getRootProps, getInputProps }) => (
                <div className="cell">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <input
                      className="new-squad-button"
                      type="add"
                      onChange={handleInputChange}
                      value="Add Image"
                    />
                  </div>
                </div>
              )}
            </Dropzone>
            <div>
            <img src={uploadedImage.preview} />
            </div>
            <input className="new-squad-button" type="submit" />
          </form>
        </div>
      </div>
  );
};

export default NewSquadForm;
