import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import translateServerErrors from "../services/translateServerErrors";
import ErrorList from "./layout/ErrorList";
import Dropzone from "react-dropzone";
import DropDownSelect from "./DropDownSelect.js";
import TeamsList from "./TeamsList";
import TeamsShowPage from "./TeamsShowPage";
import PlayerTile from "./PlayerTile";

const NewSquadForm = (props) => {
  const [newSquad, setNewSquad] = useState({
    name: "",
    image: {},
    assignments: [
      { striker: "", playerId: 0 },
      { leftWing: "", playerId: 0 },
      { rightWing: "", playerId: 0 },
      { centerMidfielder: "", playerId: 0 },
      { leftMidfielder: "", playerId: 0 },
      { rightMidfielder: "", playerId: 0 },
      { leftCenterBack: "", playerId: 0 },
      { rightCenterBack: "", playerId: 0 },
      { leftBack: "", playerId: 0 },
      { rightBack: "", playerId: 0 },
      { goalKeeper: "", playerId: 0 },
    ],
  });

  const [squadPlayer, setSquadPlayer] = useState([]);

  const [errors, setErrors] = useState({});

  const [shouldRedirect, setShouldRedirect] = useState({
    status: false,
    id: null,
  });

  const [uploadedImage, setUploadedImage] = useState({
    preview: "",
  });

  const [teams, setTeams] = useState([]);

  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [team, setTeam] = useState([]);

  const fetchTeams = async () => {
    try {
      const response = await fetch("/api/v1/teams");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      setTeams(parsedResponse.response);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const getTeam = async () => {
    try {
      const response = await fetch(`/api/v1/teams/${selectedTeamId}`);
      // const response = await fetch(`/api/v1/teams/${selectedTeam}?pageNumber=${pageNumber}`);
      if (!response.ok) {
        const errorMessage = `{response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const teamData = await response.json();
      console.log(teamData.response);
      setTeam(teamData.response);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };

  useEffect(() => {
    getTeam();
  }, [selectedTeamId]);

  // also handle pagination with this for pageNumber in request

  const postSquad = async () => {
    try {
      const body = new FormData();
      body.append("name", newSquad.name);
      body.append("image", newSquad.image);
      body.append("assignments", newSquad.assignments);
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
    postSquad();
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
      assignments: [
        { striker: "", playerId: 0 },
        { leftWing: "", playerId: 0 },
        { rightWing: "", playerId: 0 },
        { centerMidfielder: "", playerId: 0 },
        { leftMidfielder: "", playerId: 0 },
        { rightMidfielder: "", playerId: 0 },
        { leftCenterBack: "", playerId: 0 },
        { rightCenterBack: "", playerId: 0 },
        { leftBack: "", playerId: 0 },
        { rightBack: "", playerId: 0 },
        { goalKeeper: "", playerId: 0 },
      ],
    });

    setUploadedImage({
      preview: "",
    });
  };

  return (
    <div className="form">
      <div className="squad-form-header">Create a Squad</div>
      <ErrorList errors={errors} />
      <form className="form-container align center" onSubmit={handleSubmit}>
        <div className="grid-x">
          <div className="cell small-4">
            <input
              type="text"
              name="name"
              placeholder="squad name"
              onChange={handleInputChange}
              value={newSquad.name}
            />
          </div>

          <Dropzone onDrop={handleImageUpload}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="cell medium-8">
                  <input
                    className="button small warning"
                    type="add"
                    onChange={handleInputChange}
                    value="Add Image"
                  />
                  <label>(Drag n Drop)</label>
                </div>
              </div>
            )}
          </Dropzone>

          <img src={uploadedImage.preview} />

          <div className="medium-4 cell align-center">
            <DropDownSelect listItems={teams} setSelectedTeam={setSelectedTeamId} />
          </div>
        </div>

        <div className="row">
          <div className="columns large-1">
            <div className="columns large-11">
              <input
                type="Add"
                placeholder="Add Striker"
                className="button small warning"
                href="#"
                onChange={handleInputChange}
                value={newSquad.striker}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="columns large-1">
            <div className="columns large-11">
              <input
                type="Add"
                className="button small warning"
                href="#"
                name="leftWing"
                placeholder="Add Left Wing"
                onChange={handleInputChange}
                value={newSquad.leftWing}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="columns large-1">
            <div className="columns large-11">
              <input
                type="Add"
                className="button small warning"
                href="#"
                name="rightWing"
                placeholder="Add Right Wing"
                onChange={handleInputChange}
                value={newSquad.rightWing}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="columns large-1">
            <div className="columns large-11">
              <input
                type="Add"
                className="button small warning"
                href="#"
                name="centerMidfielder"
                placeholder="Add Center Midfielder"
                onChange={handleInputChange}
                value={newSquad.centerMidfielder}
              />
            </div>
          </div>
          <div className="row">
            <div className="columns large-1">
              <div className="columns large-11">
                <input
                  type="Add"
                  className="button small warning"
                  href="#"
                  name="leftMidfielder"
                  placeholder="Add Left Midfielder"
                  onChange={handleInputChange}
                  value={newSquad.leftMidfielder}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="columns large-1">
            <div className="columns large-11">
              <input
                type="Add"
                className="button small warning"
                href="#"
                name="rightMidfielder"
                placeholder="Add Right MidFielder"
                onChange={handleInputChange}
                value={newSquad.rightMidfielder}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="columns large-1">
            <div className="columns large-11">
              <input
                type="Add"
                className="button small warning"
                href="#"
                name="leftCenterBack"
                placeholder="Add Left Center Back"
                onChange={handleInputChange}
                value={newSquad.leftCenterBack}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="columns large-1">
            <div className="columns large-11">
              <input
                type="add"
                className="button small warning"
                href="#"
                name="rightCenterBack"
                placeholder="Add Right Center Back"
                onChange={handleInputChange}
                value={newSquad.rightCenterBack}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="columns large-1">
            <div className="columns large-11">
              <input
                type="Add"
                className="button small warning"
                href="#"
                name="leftBack"
                placeholder="Add Left Back"
                onChange={handleInputChange}
                value={newSquad.leftBack}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="columns large-1">
            <div className="columns large-11">
              <input
                type="Add"
                className="button small warning"
                href="#"
                label="Add Right Back"
                name="rightBack"
                placeholder="Add Right Back"
                onChange={handleInputChange}
                value={newSquad.rightBack}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="columns large-1">
            <div className="columns large-11">
              <input
                type="Add"
                className="button small warning"
                href="#"
                name="goalKeeper"
                placeholder="Add GoalKeeper"
                onChange={handleInputChange}
                value={newSquad.goalKeeper}
              />
            </div>
          </div>
        </div>

        <input className="button" type="submit" />
      </form>
    </div>
  );
};

export default NewSquadForm;
