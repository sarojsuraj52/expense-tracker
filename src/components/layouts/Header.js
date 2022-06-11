import { NavLink } from "react-router-dom";
import { useContext } from "react";
import classes from "./Header.module.css";
import AuthContext from "../store/auth-context";
const Header = () => {
    const authctx = useContext(AuthContext)
    const isLoggedin = authctx.isLoggedIn

    const logoutHandler = ()=>{
        authctx.logout()
    }
  return (
    <header className={classes.header}>
      <ul>
        <li>
          <NavLink activeClassName={classes.active} to="/home">
            Home
          </NavLink>
        </li>
        {/* <li>
          <NavLink activeClassName={classes.active} to="/auth">
            Auth
          </NavLink>
        </li> */}
      </ul>
      <div className={classes.action}>
        {!isLoggedin && <NavLink to='/auth'><button>Login</button></NavLink>}
        {isLoggedin &&<button onClick={logoutHandler}>Logout</button>}
      </div>
    </header>
  );
};
export default Header;
