import { Route,Switch,Redirect } from "react-router-dom";
import "./App.css";
import Signup from "./components/layouts/Signup";
import Home from "./components/pages/Home";
function App() {
  return (
    <Switch>
      <Route exact path="/auth">
        <Signup />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
    <Route path='*'>
      <Redirect to='/auth' />
    </Route>
    </Switch>

  );
}

export default App;
