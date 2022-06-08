import React from "react";

const PlayerOption = ({ id, player, assignmentOptions, handlePlayerAssignment }) => {
  const assignments = [
    striker,
    leftWing,
    rightWing,
    centerMidFielder,
    leftMidFielder,
    rightMidFielder,
    leftCenterBack,
    rightCenterBack,
    leftBack,
    rightBack,
    goalKeeper,
  ];

  const playerAssignments = assignments.map((assignment) => {
    return (
      <div key={`${id}-${assignment}`} className="cell small-3">
        <label htmlFor={id}>{assignment}</label>
        <input
          id={id}
          type="radio"
          name={player}
          value={assignment}
          checked={assignmentOptions == assignment}
          onChange={handlePlayerAssignment}
        />
      </div>
    );
  });

  return (
    <div className="cell small-6 callout text-center">
      <p>
        <b>
          <em>{player}</em>
        </b>
      </p>
      <div className="grid-x">{playerAssignments}</div>
    </div>
  );
};

const [addPlayers, setAddPlayers] = useState([]);

const handlePlayerAssignments = (event) => {
  const checkIfPlayersInSquad = addPlayers.find(
    (squadPlayer) => squadPlayer.playerId === event.currentTarget.id
  );
  if (checkIfPlayersInSquad) {
    const newSetOfPlayers = [...addPlayers];
    const playerToUpdateIndex = addPlayers.findIndex(
      (player) => player.playerId == event.currentTarget.id
    );
    if (event.currentTarget.value > 0) {
      newSetOfPlayers[playerToUpdateIndex] = {
        ...newSetOfPlayers[playerToUpdateIndex],
        assignments: event.currentTarget.value,
      };
      setAddPlayers(newSetOfPlayers);
    } else {
      const updatedPlayers = addPlayers.filter(
        (player) => player.playerId !== event.currentTarget.id
      );
      setAddPlayers(updatedPlayers);
    }
  } else {
    const newPlayer = {
      playerId: event.currentTarget.id,
      playerPosition: event.currentTarget.name,
      assignment: event.currentTarget.value,
    };
    setAddPlayers([...setAddPlayers, newPlayer]);
  }
};

const playerOptions = players.map((assignment) => {
  let assignmentOptions = "";
  const newAddPlayer = addPlayers.find((player) => player.playerId === assignment.id);
  if (newAddPlayer) {
    assignmentOptions = newAddPlayer.assignment;
  }

  return (
    <PlayerOption
      key={assignment.id}
      assignmentOptions={assignmentOptions}
      handlePlayerAssignments={handlePlayerAssignments}
      {...assignment}
    />
  );
});

let squadFor;
if (newSquad) {
  squadFor = (
    <h4 className="text-center">
      for <em>{newSquad}</em>
    </h4>
  );
}

const assignmentsSummary = addPlayers.map((player) => {
  return (
    <li key={player.playerId}>
      <b>
        <em>{player.playerName}</em>
      </b>
      , assignment:{" "}
      <b>
        <em>{player.assignment}</em>
      </b>
    </li>
  );
});

export default PlayerOption;
