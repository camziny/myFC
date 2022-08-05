import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlayerStatsTile from "./PlayerStatsTile.js";
import ReactPaginate from "react-paginate";
import BarChart from "./BarChart.js";
import ColumnChart from "./ColumnChart.js";


import ErrorList from "./layout/ErrorList.js";

import translateServerErrors from "../services/translateServerErrors.js";

const TeamsShowPage = (props) => {
  const { id } = useParams();
  const [team, setTeam] = useState([]);
  const [errors, setErrors] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [showBarChart, setShowBarChart] = useState(false)
  const [showColumnChart, setShowColumnChart] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState({
    id: 0,
    goals: 0,
    assists: 0
  })


  const getTeam = async () => {
    try {
      const response = await fetch(`/api/v1/teams/${id}?pageNumber=${pageNumber}`);
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

  useEffect(() => {
    getTeam();
  }, []);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    getTeam(selected);
  };


  const playerStatsTileComponents = team.map((playerObject) => {
    return (
      <PlayerStatsTile
        key={playerObject.player.id}
        id={playerObject.player.id}
        name={playerObject.player.name}
        age={playerObject.player.age}
        weight={playerObject.player.weight}
        appearances={playerObject.statistics[0].games.appearances}
        minutes={playerObject.statistics[0].games.minutes}
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
      />
    );
  });

  return (
    <div className="callout primary">
      {playerStatsTileComponents}
      <div className="pagination-section">      
      <ReactPaginate
        className="paginationButtons"
        breakLabel="..."
        nextLabel="next >"
        onPageChange={changePage}
        pageRangeDisplayed={3}
        pageCount={4}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
      </div>
    </div>
  )}
export default TeamsShowPage;
