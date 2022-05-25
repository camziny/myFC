import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";
import NewSquadForm from "../NewSquadForm";
import TeamsList from "../TeamsList";

const TopBar = ({ user }) => {
  const unauthenticatedListItems = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
      <Link to="/users/new" className="button">
        Sign Up
      </Link>
    </li>,
  ];

  const squadCreate = [
    <li key="create-squad">
      <NewSquadForm />
    </li>
  ]

  const teamList = [
    <li key="create-squad">
      <TeamsList />
    </li>
  ]

  const authenticatedListItems = [
    <li key="sign-out">
      <SignOutButton />
    </li>,
  ];

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <ul className="menu">
          <li className="menu-text">App</li>
          <li>
            <Link to="/">Home</Link>
            <Link to="/squads">Create Squad</Link>
            <Link to="/teams">Premier League Teams</Link>
          </li>
        </ul>
      </div>
      <div className="top-bar-right">
        <ul className="menu">{user ? authenticatedListItems : unauthenticatedListItems}</ul>
      </div>
    </div>
  );
};

export default TopBar;
