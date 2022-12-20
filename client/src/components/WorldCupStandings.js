import React, { useState, useEffect } from "react";

import GroupTile from "./GroupTile.js";

const WorldCupStandings = () => {
  const [worldCupStandings, setWorldCupStandings] = useState([]);

  const getWorldCupStandings = async () => {
    try {
      const response = await fetch("/api/v1/worldCupStandings");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedResponse = await response.json();
      setWorldCupStandings(parsedResponse.response);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getWorldCupStandings();
  }, []);

  const groupAComponents = worldCupStandings.map((teamObject) => {
    return (
      <GroupTile
        key={teamObject.id}
        id={teamObject.league.standings}
        nameOne={teamObject.league.standings[0][0].team.name}
        logoOne={teamObject.league.standings[0][0].team.logo}
        pointsOne={teamObject.league.standings[0][0].points}
        rankOne={teamObject.league.standings[0][0].rank}
        goalsDiffOne={teamObject.league.standings[0][0].goalsDiff}
        nameTwo={teamObject.league.standings[0][1].team.name}
        logoTwo={teamObject.league.standings[0][1].team.logo}
        pointsTwo={teamObject.league.standings[0][1].points}
        rankTwo={teamObject.league.standings[0][1].rank}
        goalsDiffTwo={teamObject.league.standings[0][1].goalsDiff}
        nameThree={teamObject.league.standings[0][2].team.name}
        logoThree={teamObject.league.standings[0][2].team.logo}
        pointsThree={teamObject.league.standings[0][2].points}
        rankThree={teamObject.league.standings[0][2].rank}
        goalsDiffThree={teamObject.league.standings[0][2].goalsDiff}
        nameFour={teamObject.league.standings[0][3].team.name}
        logoFour={teamObject.league.standings[0][3].team.logo}
        pointsFour={teamObject.league.standings[0][3].points}
        rankFour={teamObject.league.standings[0][3].rank}
        goalsDiffFour={teamObject.league.standings[0][3].goalsDiff}
      />
    );
  });

  const groupBComponents = worldCupStandings.map((teamObject) => {
    return (
      <GroupTile
        key={teamObject.id}
        id={teamObject.league.standings}
        nameOne={teamObject.league.standings[1][0].team.name}
        logoOne={teamObject.league.standings[1][0].team.logo}
        pointsOne={teamObject.league.standings[1][0].points}
        rankOne={teamObject.league.standings[1][0].rank}
        goalsDiffOne={teamObject.league.standings[1][0].goalsDiff}
        nameTwo={teamObject.league.standings[1][1].team.name}
        logoTwo={teamObject.league.standings[1][1].team.logo}
        pointsTwo={teamObject.league.standings[1][1].points}
        rankTwo={teamObject.league.standings[1][1].rank}
        goalsDiffTwo={teamObject.league.standings[1][1].goalsDiff}
        nameThree={teamObject.league.standings[1][2].team.name}
        logoThree={teamObject.league.standings[1][2].team.logo}
        pointsThree={teamObject.league.standings[1][2].points}
        rankThree={teamObject.league.standings[1][2].rank}
        goalsDiffThree={teamObject.league.standings[1][2].goalsDiff}
        nameFour={teamObject.league.standings[1][3].team.name}
        logoFour={teamObject.league.standings[1][3].team.logo}
        pointsFour={teamObject.league.standings[1][3].points}
        rankFour={teamObject.league.standings[1][3].rank}
        goalsDiffFour={teamObject.league.standings[1][3].goalsDiff}
      />
    );
  });

  const groupCComponents = worldCupStandings.map((teamObject) => {
    return (
      <GroupTile
        key={teamObject.id}
        id={teamObject.league.standings}
        nameOne={teamObject.league.standings[2][0].team.name}
        logoOne={teamObject.league.standings[2][0].team.logo}
        pointsOne={teamObject.league.standings[2][0].points}
        rankOne={teamObject.league.standings[2][0].rank}
        goalsDiffOne={teamObject.league.standings[2][0].goalsDiff}
        nameTwo={teamObject.league.standings[2][1].team.name}
        logoTwo={teamObject.league.standings[2][1].team.logo}
        pointsTwo={teamObject.league.standings[2][1].points}
        rankTwo={teamObject.league.standings[2][1].rank}
        goalsDiffTwo={teamObject.league.standings[2][1].goalsDiff}
        nameThree={teamObject.league.standings[2][2].team.name}
        logoThree={teamObject.league.standings[2][2].team.logo}
        pointsThree={teamObject.league.standings[2][2].points}
        rankThree={teamObject.league.standings[2][2].rank}
        goalsDiffThree={teamObject.league.standings[2][2].goalsDiff}
        nameFour={teamObject.league.standings[2][3].team.name}
        logoFour={teamObject.league.standings[2][3].team.logo}
        pointsFour={teamObject.league.standings[2][3].points}
        rankFour={teamObject.league.standings[2][3].rank}
        goalsDiffFour={teamObject.league.standings[2][3].goalsDiff}
      />
    );
  });

  const groupDComponents = worldCupStandings.map((teamObject) => {
    return (
      <GroupTile
        key={teamObject.id}
        id={teamObject.league.standings}
        nameOne={teamObject.league.standings[3][0].team.name}
        logoOne={teamObject.league.standings[3][0].team.logo}
        pointsOne={teamObject.league.standings[3][0].points}
        rankOne={teamObject.league.standings[3][0].rank}
        goalsDiffOne={teamObject.league.standings[3][0].goalsDiff}
        nameTwo={teamObject.league.standings[3][1].team.name}
        logoTwo={teamObject.league.standings[3][1].team.logo}
        pointsTwo={teamObject.league.standings[3][1].points}
        rankTwo={teamObject.league.standings[3][1].rank}
        goalsDiffTwo={teamObject.league.standings[3][1].goalsDiff}
        nameThree={teamObject.league.standings[3][2].team.name}
        logoThree={teamObject.league.standings[3][2].team.logo}
        pointsThree={teamObject.league.standings[3][2].points}
        rankThree={teamObject.league.standings[3][2].rank}
        goalsDiffThree={teamObject.league.standings[3][2].goalsDiff}
        nameFour={teamObject.league.standings[3][3].team.name}
        logoFour={teamObject.league.standings[3][3].team.logo}
        pointsFour={teamObject.league.standings[3][3].points}
        rankFour={teamObject.league.standings[3][3].rank}
        goalsDiffFour={teamObject.league.standings[3][3].goalsDiff}
      />
    );
  });

  const groupEComponents = worldCupStandings.map((teamObject) => {
    return (
      <GroupTile
        key={teamObject.id}
        id={teamObject.league.standings}
        nameOne={teamObject.league.standings[4][0].team.name}
        logoOne={teamObject.league.standings[4][0].team.logo}
        pointsOne={teamObject.league.standings[4][0].points}
        rankOne={teamObject.league.standings[4][0].rank}
        goalsDiffOne={teamObject.league.standings[4][0].goalsDiff}
        nameTwo={teamObject.league.standings[4][1].team.name}
        logoTwo={teamObject.league.standings[4][1].team.logo}
        pointsTwo={teamObject.league.standings[4][1].points}
        rankTwo={teamObject.league.standings[4][1].rank}
        goalsDiffTwo={teamObject.league.standings[4][1].goalsDiff}
        nameThree={teamObject.league.standings[4][2].team.name}
        logoThree={teamObject.league.standings[4][2].team.logo}
        pointsThree={teamObject.league.standings[4][2].points}
        rankThree={teamObject.league.standings[4][2].rank}
        goalsDiffThree={teamObject.league.standings[4][2].goalsDiff}
        nameFour={teamObject.league.standings[4][3].team.name}
        logoFour={teamObject.league.standings[4][3].team.logo}
        pointsFour={teamObject.league.standings[4][3].points}
        rankFour={teamObject.league.standings[4][3].rank}
        goalsDiffFour={teamObject.league.standings[4][3].goalsDiff}
      />
    );
  });

  const groupFComponents = worldCupStandings.map((teamObject) => {
    return (
      <GroupTile
        key={teamObject.id}
        id={teamObject.league.standings}
        nameOne={teamObject.league.standings[5][0].team.name}
        logoOne={teamObject.league.standings[5][0].team.logo}
        pointsOne={teamObject.league.standings[5][0].points}
        rankOne={teamObject.league.standings[5][0].rank}
        goalsDiffOne={teamObject.league.standings[5][0].goalsDiff}
        nameTwo={teamObject.league.standings[5][1].team.name}
        logoTwo={teamObject.league.standings[5][1].team.logo}
        pointsTwo={teamObject.league.standings[5][1].points}
        rankTwo={teamObject.league.standings[5][1].rank}
        goalsDiffTwo={teamObject.league.standings[5][1].goalsDiff}
        nameThree={teamObject.league.standings[5][2].team.name}
        logoThree={teamObject.league.standings[5][2].team.logo}
        pointsThree={teamObject.league.standings[5][2].points}
        rankThree={teamObject.league.standings[5][2].rank}
        goalsDiffThree={teamObject.league.standings[5][2].goalsDiff}
        nameFour={teamObject.league.standings[5][3].team.name}
        logoFour={teamObject.league.standings[5][3].team.logo}
        pointsFour={teamObject.league.standings[5][3].points}
        rankFour={teamObject.league.standings[5][3].rank}
        goalsDiffFour={teamObject.league.standings[5][3].goalsDiff}
      />
    );
  });

  const groupGComponents = worldCupStandings.map((teamObject) => {
    return (
      <GroupTile
        key={teamObject.id}
        id={teamObject.league.standings}
        nameOne={teamObject.league.standings[6][0].team.name}
        logoOne={teamObject.league.standings[6][0].team.logo}
        pointsOne={teamObject.league.standings[6][0].points}
        rankOne={teamObject.league.standings[6][0].rank}
        goalsDiffOne={teamObject.league.standings[6][0].goalsDiff}
        nameTwo={teamObject.league.standings[6][1].team.name}
        logoTwo={teamObject.league.standings[6][1].team.logo}
        pointsTwo={teamObject.league.standings[6][1].points}
        rankTwo={teamObject.league.standings[6][1].rank}
        goalsDiffTwo={teamObject.league.standings[6][1].goalsDiff}
        nameThree={teamObject.league.standings[6][2].team.name}
        logoThree={teamObject.league.standings[6][2].team.logo}
        pointsThree={teamObject.league.standings[6][2].points}
        rankThree={teamObject.league.standings[6][2].rank}
        goalsDiffThree={teamObject.league.standings[6][2].goalsDiff}
        nameFour={teamObject.league.standings[6][3].team.name}
        logoFour={teamObject.league.standings[6][3].team.logo}
        pointsFour={teamObject.league.standings[6][3].points}
        rankFour={teamObject.league.standings[6][3].rank}
        goalsDiffFour={teamObject.league.standings[6][3].goalsDiff}
      />
    );
  });

  const groupHComponents = worldCupStandings.map((teamObject) => {
    return (
      <GroupTile
        key={teamObject.id}
        id={teamObject.league.standings}
        nameOne={teamObject.league.standings[7][0].team.name}
        logoOne={teamObject.league.standings[7][0].team.logo}
        pointsOne={teamObject.league.standings[7][0].points}
        rankOne={teamObject.league.standings[7][0].rank}
        goalsDiffOne={teamObject.league.standings[7][0].goalsDiff}
        nameTwo={teamObject.league.standings[7][1].team.name}
        logoTwo={teamObject.league.standings[7][1].team.logo}
        pointsTwo={teamObject.league.standings[7][1].points}
        rankTwo={teamObject.league.standings[7][1].rank}
        goalsDiffTwo={teamObject.league.standings[7][1].goalsDiff}
        nameThree={teamObject.league.standings[7][2].team.name}
        logoThree={teamObject.league.standings[7][2].team.logo}
        pointsThree={teamObject.league.standings[7][2].points}
        rankThree={teamObject.league.standings[7][2].rank}
        goalsDiffThree={teamObject.league.standings[7][2].goalsDiff}
        nameFour={teamObject.league.standings[7][3].team.name}
        logoFour={teamObject.league.standings[7][3].team.logo}
        pointsFour={teamObject.league.standings[7][3].points}
        rankFour={teamObject.league.standings[7][3].rank}
        goalsDiffFour={teamObject.league.standings[7][3].goalsDiff}
      />
    );
  });

  return (
    <div>
      <div className="groups-list-header">2022 World Cup Standings</div>
      <div className="groupsList">
        <h3>Group A</h3>
        {groupAComponents}
      </div>
      <div className="groupsList">
        <h3>Group B</h3>
        {groupBComponents}
      </div>
      <div className="groupsList">
        <h3>Group C</h3>
        {groupCComponents}
      </div>
      <div className="groupsList">
        <h3>Group D</h3>
        {groupDComponents}
      </div>
      <div className="groupsList">
        <h3>Group E</h3>
        {groupEComponents}
      </div>
      <div className="groupsList">
        <h3>Group F</h3>
        {groupFComponents}
      </div>
      <div className="groupsList">
        <h3>Group G</h3>
        {groupGComponents}
      </div>
      <div className="groupsList">
        <h3>Group H</h3>
        {groupHComponents}
      </div>
    </div>
  );
};

export default WorldCupStandings;
