import React, { useState, useEffect } from "react";
import translateServerErrors from "../services/translateServerErrors";
import ErrorList from "./layout/ErrorList";

const NewSquadForm = (props) => {
  const [squads, setSquads] = useState([]);
  const [newSquad, setNewSquad] = useState({
    name: "",
    players: [],
  });
  const [errors, setErrors] = useState({});

  const postSquad = async () => {
    try {
      const response = await fetch("api/v1/squads", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(),
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
    postSquad();
  };

  const clearForm = () => {
    setNewSquad({
      name: "",
      players: [],
    });

    return (
      <div className="grid-container">
        <h3>Create a Squad</h3>
        <ErrorList errors={errors} />
        <form className="squad-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="squad name"
            onChange={handleInputChange}
            value={newSquad.name}
          />
          <textarea
            name="players"
            placeholder="Select the players for your squad"
            onChange={handleInputChange}
            value={newSquad.players}
          />
          <input className="button" type="submit" />
        </form>
      </div>
    );
  };
};

export default NewSquadForm;
