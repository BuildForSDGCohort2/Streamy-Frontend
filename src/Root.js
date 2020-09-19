import React from "react";
import Auth from "./layouts/Auth";
import { useQuery } from "@apollo/client";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import App from "./views/App";
import { IS_AUTHENTICATED } from ".";
import Profile from "./views/Profile";
import { ME } from "./views/App";
import Home from "./views/Home";

function Root() {
  const { data } = useQuery(IS_AUTHENTICATED);
  const { data: medata } = useQuery(ME);

  const currentUser = medata?.me;

  const handleRedirect = () => {
    return data.isAuthenticated ? <Redirect to="/app" /> : <Auth />;
  };

  return (
    <Router>
      <Switch>
        <Route path="/login">{handleRedirect}</Route>
        <Route path="/register">
          <Auth />
        </Route>
        <Route path={`/profile/:id`}>
          {data.isAuthenticated ? (
            <Profile user={currentUser} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        {/* <Route path="/movie">
          <Home />
        </Route> */}
        <Route path="/app">
          {data.isAuthenticated ? <App /> : <Redirect to="/login" />}
        </Route>
        <Route path="/">
          <Redirect to="/app" />
        </Route>
      </Switch>
    </Router>
  );
}

export default Root;
