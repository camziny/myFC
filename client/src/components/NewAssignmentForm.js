import React, { useState, useEffect } from "react";
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
    const { squadId } = props;
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
        playerId: 0
      });
    } else {
      setSelectedPlayer({ id, name, position, playerId });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postAssignment(newAssignment);
  };

  const handleSquadAssignment = (event) => {
    console.log(event);
    if (selectedPlayer !== null) {
      console.log(selectedPlayer);
      setNewAssignment(selectedPlayer);
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
        playerId={playerObject.player.id}
      />
    );
  });

  return (
    <div className="row">
    <div className="column">
      <h3>Add Players</h3>
      <form className="" onSubmit={handleSubmit}>
        <DropDownSelect getTeam={getTeam} listItems={teams} setSelectedTeam={setSelectedTeamId} />
        <div className="cell small-6 medium-8 small-11">
          <div className="cell">
            <input
              type="Add"
              name="name"
              placeholder="Add Player"
              className="button small warning"
              href="#"
              onClick={handleSquadAssignment}
              value={newAssignment.name ? newAssignment.name : "Add Player"}
            />
          </div>
          {/* <div className="cell">
            <input
              type="Add"
              className="button small warning"
              href="#"
              name="lw"
              placeholder="Left Wing"
              onClick={handleSquadAssignment}
              value={newAssignment.position.lw.name ? newAssignment.position.lw.name : "Left Wing"}
            />
          </div>
          <input
            type="Add"
            className="button small warning"
            href="#"
            name="rw"
            placeholder="Right Wing"
            onClick={handleSquadAssignment}
            value={newAssignment.position.rw.name ? newAssignment.position.rw.name : "Right Wing"}
          />
        </div>
        <div className="cell">
          <input
            type="Add"
            className="button small warning"
            href="#"
            name="cm"
            placeholder="Center Midfielder"
            onClick={handleSquadAssignment}
            value={
              newAssignment.position.cm.name ? newAssignment.position.cm.name : "Center Midfielder"
            }
          />
        </div>
        <div className="cell">
          <input
            type="add"
            className="button small warning"
            href="#"
            name="lm"
            placeholder="Left Midfielder"
            onClick={handleSquadAssignment}
            value={
              newAssignment.position.lm.name ? newAssignment.position.lm.name : "Left Midfielder"
            }
          />
        </div>
        <div className="cell">
          <input
            type="add"
            className="button small warning"
            href="#"
            name="rm"
            placeholder="Right MidFielder"
            onClick={handleSquadAssignment}
            value={
              newAssignment.position.rm.name ? newAssignment.position.rm.name : "Right Midfielder"
            }
          />
        </div>
        <div className="cell">
          <input
            type="add"
            className="button small warning"
            href="#"
            name="lcb"
            placeholder="Left Center Back"
            onClick={handleSquadAssignment}
            value={
              newAssignment.position.lcb.name ? newAssignment.position.lcb.name : "Left Center Back"
            }
          />
        </div>
        <div className="cell">
          <input
            type="add"
            className="button small warning"
            href="#"
            name="rcb"
            placeholder="Right Center Back"
            onClick={handleSquadAssignment}
            value={
              newAssignment.position.rcb.name
                ? newAssignment.position.rcb.name
                : "Right Center Back"
            }
          />
        </div>
        <div className="cell">
          <input
            type="add"
            className="button small warning"
            href="#"
            name="lb"
            placeholder="Left Back"
            onClick={handleSquadAssignment}
            value={newAssignment.position.lb.name ? newAssignment.position.lb.name : "Left Back"}
          />
        </div>
        <div className="cell">
          <input
            type="add"
            className="button small warning"
            href="#"
            label="Add Right Back"
            name="rb"
            placeholder="Right Back"
            onClick={handleSquadAssignment}
            value={newAssignment.position.rb.name ? newAssignment.position.rb.name : "Right Back"}
          />
        </div>
        <div className="cell">
          <input
            type="add"
            className="button small warning"
            href="#"
            name="gk"
            placeholder="GoalKeeper"
            onClick={handleSquadAssignment}
            value={newAssignment.position.gk.name ? newAssignment.position.gk.name : "Goal Keeper"}
          /> */}
        </div>
        <input className="button" type="submit" value="Submit" />
      </form>
      </div>
      <div className="column">
        <table>{playerTileComponents}</table>
      </div>
    </div>
  );
};

export default NewAssignmentForm;
