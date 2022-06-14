import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Header.module.css";
import { authActions } from "../../store/authReducer";

const Header = () => {
  const isLoggedin = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const totalAmount = useSelector(state=> state.expenses.totalAmount)

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  return (
    <header className={classes.header}>
      <ul>
        <li>
          <NavLink activeClassName={classes.active} to="/home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName={classes.active} to="/expenses">
            Expenses
          </NavLink>
        </li>
      </ul>
      <div className={classes.action}>
        {/* {!isLoggedin && <NavLink to='/auth'><button>Login</button></NavLink>} */}
        {totalAmount > 10000 && <button className={classes.premiumBtn}>Activate Premium</button>}
        {isLoggedin && <button onClick={logoutHandler}>Logout</button>}
      </div>
    </header>
  );
};
export default Header;
