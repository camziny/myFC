import React from "react";
import { Link } from "react-router-dom";

const GroupA = ({
  id,
  group,
  nameOne,
  nameTwo,
  nameThree,
  nameFour,
  logoOne,
  logoTwo,
  logoThree,
  logoFour,
  pointsOne,
  pointsTwo,
  pointsThree,
  pointsFour,
  rankOne,
  rankTwo,
  rankThree,
  rankFour,
  goalsDiffOne,
  goalsDiffTwo,
  goalsDiffThree,
  goalsDiffFour,
}) => {
  return (
    <div className="group-tile-container">
      <div className="callout">
        <div className="group">{group}</div>
        <Link to={`/worldCupStandings/${id}`}>
          <h4 className="teamName">{nameOne}</h4>
          <img className="group-team-logo" src={logoOne}></img>
          <div className="rank">Rank: {rankOne}</div>
          <div className="points">Points: {pointsOne}</div>
          <div className="goalsDiff">Goal Difference: {goalsDiffOne}</div>
        </Link>
      </div>
      <div className="callout">
        <Link to={`/worldCupStandings/${id}`}>
          <h4 className="teamName">{nameTwo}</h4>
          <img className="group-team-logo" src={logoTwo}></img>
          <div className="rank">Rank: {rankTwo}</div>
          <div className="points">Points: {pointsTwo}</div>
          <div className="goalsDiff">Goal Difference: {goalsDiffTwo}</div>
        </Link>
      </div>
      <div className="callout">
        <Link to={`/worldCupStandings/${id}`}>
          <h4 className="teamName">{nameThree}</h4>
          <img className="group-team-logo" src={logoThree}></img>
          <div className="rank">Rank: {rankThree}</div>
          <div className="points">Points: {pointsThree}</div>
          <div className="goalsDiff">Goal Difference: {goalsDiffThree}</div>
        </Link>
      </div>
      <div className="callout">
        <Link to={`/worldCupStandings/${id}`}>
          <h4 className="teamName">{nameFour}</h4>
          <img className="group-team-logo" src={logoFour}></img>
          <div className="rank">Rank: {rankFour}</div>
          <div className="points">Points: {pointsFour}</div>
          <div className="goalsDiff">Goal Difference: {goalsDiffFour}</div>
        </Link>
      </div>
    </div>
  );
};

export default GroupA;
