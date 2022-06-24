import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import translateServerErrors from "../services/translateServerErrors";
import ErrorList from "./layout/ErrorList";
import Dropzone from "react-dropzone";
import DropDownSelect from "./DropDownSelect.js";
import PlayerTile from "./PlayerTile";


const NewSquadForm = () => {
  const [newSquad, setNewSquad] = useState({
    name: "",
    image: {},
    assignments: {
      striker: 0,
      leftWing: 0,
      rightWing: 0,
      centerMidfielder: 0,
      leftMidfielder: 0,
      rightMidfielder: 0,
      leftCenterBack: 0,
      rightCenterBack: 0,
      leftBack: 0,
      rightBack: 0,
      goalKeeper: 0,
    },
  });

  const [selectedPlayer, setSelectedPlayer] = useState({
    id: 0,
    name: "",
  });

  const handlePlayerSelection = (id, name) => {
    if (id === selectedPlayer) {
      setSelectedPlayer({
        id: 0,
        name: "",
      });
    } else {
      setSelectedPlayer({ id, name });
    }
  };

  const [errors, setErrors] = useState({});

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

  const playerTileComponents = team.map((playerObject) => {
    return (
      <PlayerTile
        {...playerObject}
        key={playerObject.player.id}
        id={playerObject.player.id}
        name={playerObject.player.name}
        nationality={playerObject.player.nationality}
        position={playerObject.statistics[0].games.position}
        photo={playerObject.player.photo}
        teamLogo={playerObject.statistics[0].team.logo}
        goals={playerObject.statistics[0].goals.total}
        assists={playerObject.statistics[0].goals.assists}
        saves={playerObject.statistics[0].goals.saves}
        conceded={playerObject.statistics[0].goals.conceded}
        yellowCards={playerObject.statistics[0].cards.yellow}
        redCards={playerObject.statistics[0].cards.red}
        handlePlayerAdd={handlePlayerSelection}
        isSelected={playerObject.id === selectedPlayer.id}
      />
    );
  });

  const handleSquadAssignment = (event) => {
    console.log(event.currentTarget);
    if (selectedPlayer !== null) {
      setNewSquad({
        ...newSquad,
        assignments: { ...newSquad.assignments, [event.currentTarget.name]: selectedPlayer },
      });
    }
  };

  const [addAssignments, setAddAssignments] = useState([]);

  const handleAssignmentOption = (event) => {
    const checkIfPlayersInSquad = addAssignments.find(
      (assignment) => assignment.playerId === event.currentTarget.id
    );
    if (checkIfPlayersInSquad) {
      const newSetOfPlayers = [...setAddAssignments];
      const playerToUpdateIndex = addAssignments.findIndex(
        (assignment) => assignment.playerId == event.currentTarget.id
      );
      if (event.currentTarget.value > 0) {
        newSetOfPlayers[playerToUpdateIndex] = {
          ...newSetOfPlayers[playerToUpdateIndex],
          assignment: event.currentTarget.value,
        };
        setAddAssignments(newSetOfPlayers);
      } else {
        const updatedPlayers = addAssignments.filter(
          (assignment) => assignment.playerId !== event.currentTarget.id
        );
        setAddAssignments(updatedPlayers);
      }
    } else {
      const newPlayer = {
        assignment: event.currentTarget.value,
        playerId: event.currentTarget.id,
      };
      setAddAssignments([...addAssignments, newPlayer]);
    }
  };

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
      assignments: {
        striker: 0,
        leftWing: 0,
        rightWing: 0,
        centerMidfielder: 0,
        leftMidfielder: 0,
        rightMidfielder: 0,
        leftCenterBack: 0,
        rightCenterBack: 0,
        leftBack: 0,
        rightBack: 0,
        goalKeeper: 0,
      },
    });

    setUploadedImage({
      preview: "",
    });
  };

  return (
    <div className="holy-grail-grid">
      <div className="holy-grail-header">
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
      </div>
      <ErrorList errors={errors} />
      <div className="holy-grail-left">
        <form className="" onSubmit={handleSubmit}>
          <div className="">
            <div className="">
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
                <DropDownSelect
                  getTeam={getTeam}
                  listItems={teams}
                  setSelectedTeam={setSelectedTeamId}
                />
              </div>
            </div>
          </div>
          <div className="grid-container full">
            <div className="grid-x grid-margin-x">
              <div className="cell small-4">
                <input
                  type="Add"
                  name="striker"
                  placeholder="Striker"
                  className="button small warning"
                  href="#"
                  onClick={handleSquadAssignment}
                  value={
                    newSquad.assignments.striker.name
                      ? newSquad.assignments.striker.name
                      : "Striker"
                  }
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
                  onClick={handleSquadAssignment}
                  value={
                    newSquad.assignments.leftWing.name
                      ? newSquad.assignments.leftWing.name
                      : "Left Wing"
                  }
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
                  onClick={handleSquadAssignment}
                  value={
                    newSquad.assignments.rightWing.name
                      ? newSquad.assignments.rightWing.name
                      : "Right Wing"
                  }
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
                  onClick={handleSquadAssignment}
                  value={
                    newSquad.assignments.centerMidfielder.name
                      ? newSquad.assignments.centerMidfielder.name
                      : "Center Midfielder"
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="columns large-1">
                <div className="columns large-11">
                  <input
                    type="add"
                    className="button small warning"
                    href="#"
                    name="leftMidfielder"
                    placeholder="Left Midfielder"
                    onClick={handleSquadAssignment}
                    value={
                      newSquad.assignments.leftMidfielder.name
                        ? newSquad.assignments.leftMidfielder.name
                        : "Left Midfielder"
                    }
                  />
                </div>
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
                  name="rightMidfielder"
                  placeholder="Right MidFielder"
                  onClick={handleSquadAssignment}
                  value={
                    newSquad.assignments.rightMidfielder.name
                      ? newSquad.assignments.rightMidfielder.name
                      : "Right Midfielder"
                  }
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
                  name="leftCenterBack"
                  placeholder="Left Center Back"
                  onClick={handleSquadAssignment}
                  value={
                    newSquad.assignments.leftCenterBack.name
                      ? newSquad.assignments.leftCenterBack.name
                      : "Left Center Back"
                  }
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
                  onClick={handleSquadAssignment}
                  value={
                    newSquad.assignments.rightCenterBack.name
                      ? newSquad.assignments.rightCenterBack.name
                      : "Right Center Back"
                  }
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
                  name="leftBack"
                  placeholder="Left Back"
                  onClick={handleSquadAssignment}
                  value={
                    newSquad.assignments.leftBack.name
                      ? newSquad.assignments.leftBack.name
                      : "Left Back"
                  }
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
                  label="Add Right Back"
                  name="rightBack"
                  placeholder="Right Back"
                  onClick={handleSquadAssignment}
                  value={
                    newSquad.assignments.rightBack.name
                      ? newSquad.assignments.rightBack.name
                      : "Right Back"
                  }
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
                  name="goalKeeper"
                  placeholder="GoalKeeper"
                  onClick={handleSquadAssignment}
                  value={
                    newSquad.assignments.goalKeeper.name
                      ? newSquad.assignments.goalKeeper.name
                      : "Goal Keeper"
                  }
                />
              </div>
            </div>
          </div>
          <input className="button" type="submit" />
        </form>
      </div>
      <div className="table-scroll">
        <table>{playerTileComponents}</table>
      </div>
    </div>
  );
};

export default NewSquadForm;
