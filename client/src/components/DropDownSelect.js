import React from "react";
import PlayerTile from "./PlayerTile";

const DropDownSelect = (props) => {
  const handleSelect = (event) => {
    props.setSelectedTeam(event.currentTarget.value);
    props.getTeam(event.currentTarget.value)
  };

  const options = props.listItems.map((listItem) => {
    return (
      <option key={listItem.team.id} value={`${listItem.team.id}`}>
        {listItem.team.name}
      </option>
    );
  });

  return (
    <select
      value={props.value}
      name={props.listName}
      id={`dropdown-${props.listName}`}
      onChange={handleSelect}
    >
      <option value={0}>(Select Team)</option>
      {options}
    </select>
  );
};

export default DropDownSelect;
