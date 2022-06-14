import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Header from "./components/layouts/Header";
import Signup from "./components/layouts/Signup";
import Expenses from "./components/pages/Expenses";
import Home from "./components/pages/Home";
import { useSelector } from "react-redux";

function App() {

  const isLoggedin = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/auth">
          {!isLoggedin && <Signup />}
          {isLoggedin && <Redirect to="/home" />}
        </Route>
        <Route path="/home">
          {isLoggedin && <Home />}
          {!isLoggedin && <Redirect to="/auth" />}
        </Route>
        <Route path="/expenses">
          {isLoggedin && <Expenses />}
          {!isLoggedin && <Redirect to="/auth" />}
        </Route>
        <Route path="*">
          <Redirect to="/auth" />
        </Route>
      </Switch>
    </>
  );
}

export default App;