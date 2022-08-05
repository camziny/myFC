import React, { useState, useEffect } from "react";
import { Link, Redirect, useParams } from "react-router-dom";
import translateServerErrors from "../services/translateServerErrors";
import ErrorList from "./layout/ErrorList";
import Dropzone from "react-dropzone";
import DropDownSelect from "./DropDownSelect.js";
import PlayerTile from "./PlayerTile";

const NewSquadForm = (props) => {
  const { id } = useParams()
  const [newSquad, setNewSquad] = useState({
    name: "",
    image: {},
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

  // const [addAssignments, setAddAssignments] = useState([]);

  // const handleAssignmentOption = (event) => {
  //   const checkIfPlayersInSquad = addAssignments.find(
  //     (assignment) => assignment.playerId === event.currentTarget.id
  //   );
  //   if (checkIfPlayersInSquad) {
  //     const newSetOfPlayers = [...setAddAssignments];
  //     const playerToUpdateIndex = addAssignments.findIndex(
  //       (assignment) => assignment.playerId == event.currentTarget.id
  //     );
  //     if (event.currentTarget.value > 0) {
  //       newSetOfPlayers[playerToUpdateIndex] = {
  //         ...newSetOfPlayers[playerToUpdateIndex],
  //         assignment: event.currentTarget.value,
  //       };
  //       setAddAssignments(newSetOfPlayers);
  //     } else {
  //       const updatedPlayers = addAssignments.filter(
  //         (assignment) => assignment.playerId !== event.currentTarget.id
  //       );
  //       setAddAssignments(updatedPlayers);
  //     }
  //   } else {
  //     const newPlayer = {
  //       assignment: event.currentTarget.value,
  //       playerId: event.currentTarget.id,
  //     };
  //     setAddAssignments([...addAssignments, newPlayer]);
  //   }
  // };

  const postSquad = async () => {
    // let preFetchErrors = {};
    // if (!newSquad.name) {
    //   preFetchErrors.Name = "must have a required property 'name'";
    // }
    // if (Object.keys(preFetchErrors).length) return setErrors(preFetchErrors);
    // else setErrors({});
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
          console.log(body.errors);
          return setErrors(newErrors);
        }
        throw new Error(`${response.status} (${response.statusText})`);
      } else {
        const body = await response.json();
        props.addNewSquad(body.squad);
        clearForm();
      }
    } catch (error) {
      console.log(error);
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
        <ErrorList errors={errors} />
        <div className="cell medium-8">
          <form className="" onSubmit={handleSubmit}>
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
                      className="button small warning"
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
            <input className="button" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewSquadForm;
