import React,{useContext} from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Header from "./components/layouts/Header";
import Signup from "./components/layouts/Signup";
import Home from "./components/pages/Home";
import AuthContext from "./components/store/auth-context";
function App() {
  const authctx = useContext(AuthContext)
    const isLoggedin = authctx.isLoggedIn
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/auth">
          {!isLoggedin && <Signup />}
          {isLoggedin && <Redirect to='/home' />}
        </Route>
        <Route path="/home">
          {isLoggedin && <Home />}
          {!isLoggedin && <Redirect to='/auth' />}
        </Route>
        <Route path="*">
          <Redirect to="/auth" />
        </Route>
      </Switch>
    </>
  );
}

export default App;
