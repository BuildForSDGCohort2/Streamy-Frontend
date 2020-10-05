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
import Home from "./views/Home";
import UserProvider from "./context/UserContext";

function Root() {
  const { data } = useQuery(IS_AUTHENTICATED);

  const handleRedirect = () => {
    return data.isAuthenticated ? <Redirect to="/app" /> : <Auth />;
  };

  return (
    <Router>
      <UserProvider>
        <Switch>
          <Route path="/login">{handleRedirect}</Route>
          <Route path="/register">
            <Auth />
          </Route>
          <Route path={`/profile/:id`}>
            {data.isAuthenticated ? <Profile /> : <Redirect to="/login" />}
          </Route>
          <Route path="/movie">
            <Home />
          </Route>
          <Route path="/app">
            {data.isAuthenticated ? <App /> : <Redirect to="/login" />}
          </Route>
          <Route path="/">
            <Redirect to="/app" />
          </Route>
        </Switch>
      </UserProvider>
    </Router>
  );
}

export default Root;
