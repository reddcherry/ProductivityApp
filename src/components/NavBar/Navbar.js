import classes from './Navbar.module.css'
import {NavLink} from 'react-router-dom'

const Navbar =(props)=>{
let isLoggedin=1;

return (
  <header className={classes.header}>
    <div className={classes.logo}>
      <NavLink to='/home'>
        <h3>Productivity+</h3>
      </NavLink>
    </div>
    <nav className={classes.nav}>
      {isLoggedin ? (
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
            <button className="btn">Logout</button>
          </li>
        </ul>
      ) : (
        ""
      )}
    </nav>
  </header>
);

}

export default Navbar