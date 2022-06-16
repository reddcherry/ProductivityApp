import classes from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-store";

const Navbar = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <NavLink to="/home">
          <h3>Productivity+</h3>
        </NavLink>
      </div>
      <nav className={classes.nav}>
        {authCtx.idToken ? (
          <ul>
            <li>
              <NavLink to="/todo" activeClassName={classes.active}>
                To Do List
              </NavLink>
            </li>
            <li>
              <NavLink to="/diary" activeClassName={classes.active}>
                Diary
              </NavLink>
            </li>
            <li>
              <NavLink to="/expense" activeClassName={classes.active}>
                Expense Tracker
              </NavLink>
            </li>
            <li>
              <button onClick={authCtx.logOutFn} className="btn">
                Logout
              </button>
            </li>
          </ul>
        ) : (
          ""
        )}
      </nav>
    </header>
  );
};

export default Navbar;
