import React, { useState, useEffect } from "react"
import translateServerErrors from "./../services/translateServerErrors.js";
import DropDownSelect from "./DropDownSelect.js";
import ErrorList from "./layout/ErrorList";
import PlayerTile from "./PlayerTile.js";


const NewAssignmentForm = (props) => {
    const [newAssignment, setNewAssignment] = useState({
            st: 0,
            lw: 0,
            rw: 0,
            cm: 0,
            lm: 0,
            rm: 0,
            lcb: 0,
            rcb: 0,
            lb: 0,
            rb: 0,
            gk: 0
    })
    
    const [errors, setErrors] = useState({})

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
            })
            console.log(newAssignment)
            if(!response.ok) {
                if(response.status === 422) {
                    const body = await response.json()
                    const newErrors = translateServerErrors(body.errors.data)
                    return setErrors(newErrors)
                }
                throw new Error(`${response.status} (${response.statusText})`)
            } else {
                const body = await response.json()
                props.addNewAssignment(body.assignment)
                clearForm()
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    
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

const handleSubmit = (event) => {
    event.preventDefault()
    postAssignment(newAssignment)
}

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
    console.log(event)
    if (selectedPlayer !== null) {
      setNewAssignment({
        ...newAssignment,
        [event.currentTarget.name]: selectedPlayer ,
      });
    }
  };
return (
  <div className="grid-y">
        <h3>Add Players</h3>
    <form className="" onSubmit={handleSubmit}>
                <DropDownSelect
                  getTeam={getTeam}
                  listItems={teams}
                  setSelectedTeam={setSelectedTeamId}
                />
                <div className="cell small-6 medium-8 small-11">
                <div className="cell">
                <input
                  type="Add"
                  name="st"
                  placeholder="Striker"
                  className="button small warning"
                  href="#"
                  onClick={handleSquadAssignment}
                  value={
                    newAssignment.st.name
                      ? newAssignment.st.name
                      : "Striker"
                  }
                />
                </div>
                <div className="cell">
                <input
                  type="Add"
                  className="button small warning"
                  href="#"
                  name="lw"
                  placeholder="Left Wing"
                  onClick={handleSquadAssignment}
                  value={
                    newAssignment.lw.name
                      ? newAssignment.lw.name
                      : "Left Wing"
                  }
                />
                </div>
                <input
                  type="Add"
                  className="button small warning"
                  href="#"
                  name="rw"
                  placeholder="Right Wing"
                  onClick={handleSquadAssignment}
                  value={
                    newAssignment.rw.name
                      ? newAssignment.rw.name
                      : "Right Wing"
                  }
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
                    newAssignment.cm.name
                      ? newAssignment.cm.name
                      : "Center Midfielder"
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
                      newAssignment.lm.name
                        ? newAssignment.lm.name
                        : "Left Midfielder"
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
                    newAssignment.rm.name
                      ? newAssignment.rm.name
                      : "Right Midfielder"
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
                    newAssignment.lcb.name
                      ? newAssignment.lcb.name
                      : "Left Center Back"
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
                    newAssignment.rcb.name
                      ? newAssignment.rcb.name
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
                  value={
                    newAssignment.lb.name
                      ? newAssignment.lb.name
                      : "Left Back"
                  }
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
                  value={
                    newAssignment.rb.name
                      ? newAssignment.rb.name
                      : "Right Back"
                  }
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
                  value={
                    newAssignment.gk.name
                      ? newAssignment.gk.name
                      : "Goal Keeper"
                  }
                />
                </div>
          <input className="button" type="submit" value="Submit" />
        </form>
          <div className="grid y">
        <table>{playerTileComponents}</table>
        </div>
        </div>
  );;
}

export default NewAssignmentForm