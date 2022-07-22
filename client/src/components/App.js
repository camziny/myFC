import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import TeamsList from "./TeamsList";
import PlayersListPage from "./PlayersListPage";
import TeamsShowPage from "./TeamsShowPage";
import SquadsList from "./SquadsList.js";
import SquadShowPage from "./SquadShowPage.js"
import { Link } from "react-router-dom"
import AssignmentShowPage from "./AssignmentShowPage.js";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <div className="homeHeader">
          <div className="icon text-center">
          <Link to="/squads">
            <img className="home-backgroundImage"src="https://cdn.freelogodesign.org/files/31506640979849029e138aa454d48f51/thumb/logo_200x200.png?v=0" alt=""/>
          </Link>
          </div>
          </div>
        </Route>
        <Route exact path="/squads">
          <SquadsList user={currentUser} />
        </Route>
        <Route exact path="/teams" component={TeamsList} />
        <Route exact path="/teams/:id" component={TeamsShowPage} />
        <Route exact path="/players" component={PlayersListPage} />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/squads/:id">
        <Route exact path ="/assignments/:id" component={AssignmentShowPage} />
          <SquadShowPage user={currentUser} />
        </Route>
      </Switch>
    </Router>
  );
};

export default hot(App);
