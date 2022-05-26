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

  const getTeam = async (teamId) => {
    try {
      const response = await fetch(`/api/v1/teams/${teamId}`);
      // const response = await fetch(`/api/v1/teams/${selectedTeam}?pageNumber=${pageNumber}`);
      if (!response.ok) {
        const errorMessage = `{response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const teamData = await response.json();
      setTeam(teamData);
    } catch (error) {
      console.error(`Error in fetch: ${error.message}`);
    }
  };


  // useEffect(() => {
  //   getTeam();
  // }, [selectedTeamId]);
  // console.log(selectedTeamId);

  const playerTileComponents = team.map((playerObject) => {

    return (
      <PlayerTile
        key={playerObject.id}
        name={playerObject.player.name}
        nationality={playerObject.player.nationality}
        position={playerObject.statistics[0].games.position}
        photo={playerObject.player.photo}
        goals={playerObject.statistics[0].goals.total}
        assists={playerObject.statistics[0].goals.assists}
        saves={playerObject.statistics[0].goals.saves}
        conceded={playerObject.statistics[0].goals.conceded}
        yellowCards={playerObject.statistics[0].cards.yellow}
        redCards={playerObject.statistics[0].cards.red}
        playerChart={[playerObject.statistics[0].goals.total, playerObject.statistics[0].goals.assists]}
      />
    );
  });

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
                <div className="cell medium-8">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                  <input
                    className="button small warning"
                    type="add"
                    onChange={handleInputChange}
                    value="Add Image"
                  />
                </div>
              </div>
            )}
          </Dropzone>
          <img src={uploadedImage.preview} />
        </div>
        <div className="grid-x">
        <div className="row">
        <div className="columns small-3 small-centered">
          <DropDownSelect getTeam={getTeam} listItems={teams} setSelectedTeam={setSelectedTeamId} />
        </div>
        </div>
        </div>
        <div className="row">
          <div className="columns large-1">
            <div className="columns large-11">
              <input
                type="Add"
                placeholder="Striker"
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
                placeholder="Left Wing"
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
                placeholder="Right Wing"
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
                placeholder="Center Midfielder"
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
                  placeholder="Left Midfielder"
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
                placeholder="Right MidFielder"
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
                placeholder="Left Center Back"
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
                placeholder="Right Center Back"
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
                placeholder="Left Back"
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
                placeholder="Right Back"
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
                placeholder="GoalKeeper"
                onChange={handleInputChange}
                value={newSquad.goalKeeper}
              />
            </div>
          </div>
        </div>

        <input className="button" type="submit" />
      </form>
      <div className="grid-x align-right">
        {playerTileComponents}
        </div>
    </div>
  );
};

export default NewSquadForm;
