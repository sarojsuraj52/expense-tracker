import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Header.module.css";
import { authActions } from "../../store/authReducer";
import { themeActions } from "../../store/themeReducer";

const Header = () => {
  const isLoggedin = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.expenses.totalAmount);
  const activatePremium = useSelector((state) => state.theme.activatePremium);
  const darkMode = useSelector((state) => state.theme.darkMode);


  const activatePremiumHandler = () => {
    dispatch(themeActions.togglePremium());
  };

  const darkModeHandler = ()=>{
    dispatch(themeActions.toggleTheme())
    console.log('drakMode',darkMode)
  }
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
        {activatePremium && <button onClick={darkModeHandler}>{darkMode ? 'Light Mode': 'Dark Mode'}</button>}
        {totalAmount > 10000 && isLoggedin && (
          <button
            className={classes.premiumBtn}
            onClick={activatePremiumHandler}
          >
            { activatePremium ? 'Deativate Premium':'Activate Premium' }
          </button>
        )}
        {isLoggedin && <button onClick={logoutHandler}>Logout</button>}
      </div>
    </header>
  );
};
export default Header;
