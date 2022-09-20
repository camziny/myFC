import React, { useState, useEffect } from "react";
import AssignmentSerializer from "../../../server/src/serializers/AssignmentSerializer.js";
import translateServerErrors from "./../services/translateServerErrors.js";
import DropDownSelect from "./DropDownSelect.js";
import ErrorList from "./layout/ErrorList";
import PlayerTile from "./PlayerTile.js";

const NewAssignmentForm = (props) => {
  const [newAssignment, setNewAssignment] = useState({});

  const [errors, setErrors] = useState({});

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

  const postAssignment = async () => {
    const { squadId } = props
    try {
      const response = await fetch(`/api/v1/squads/${squadId}/assignments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAssignment),
      });
      console.log(newAssignment);
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors.data);
          return setErrors(newErrors);
        }
        throw new Error(`${response.status} (${response.statusText})`);
      } else {
        const body = await response.json();
        props.addNewAssignment(body.assignment);
        clearForm();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const [selectedPlayer, setSelectedPlayer] = useState({
    id: 0,
    name: "",
    position: "",
    playerId: 0,
  });

  const handlePlayerSelection = (id, name, position, playerId) => {
    if (id === selectedPlayer) {
      setSelectedPlayer({
        id: 0,
        name: "",
        position: "",
        playerId: 0,
      });
    } else {
      setSelectedPlayer({ id, name, position, playerId });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postAssignment(newAssignment);
  };

  const handleSquadAssignment = () => {
    if (selectedPlayer !== null) {
      console.log(selectedPlayer);
      setNewAssignment(selectedPlayer);
    }
  };

  const clearForm = () => {
    setNewAssignment({
      id: 0,
      name: "",
      position: "",
      playerId: 0,
    });
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
        playerId={playerObject.player.id}
      />
    );
  });

  
  const button =
  props.creatorId === props.curUserId ? (
    <div>
    <div>
      <h3>Add Players</h3>
      <form className="" onSubmit={handleSubmit}>
        <DropDownSelect getTeam={getTeam} listItems={teams} setSelectedTeam={setSelectedTeamId} />
        <div>
          <div>
            <input
              type="Add"
              name="name"
              placeholder="Add Player"
              className={"new-assignment-button"}
              href="#"
              onClick={handleSquadAssignment}
              value={newAssignment.name ? newAssignment.name : "Confirm Player"}
            />
          </div>
        </div>
        <div>
    <input className="new-assignment-button" type="submit" value="Submit" />
  </div>
      </form>
    </div>
    <div>
      <table className="player-table-scroll">{playerTileComponents}</table>
    </div>
  </div>
) : null

  return (
    <div>
  {button}
    </div>
  );
};

export default NewAssignmentForm;
