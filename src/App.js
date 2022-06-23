import logo from "./logo.svg";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Navbar from "./components/NavBar/Navbar";
import { Fragment, useContext, useEffect, useState, } from "react";
import Login from "./pages/Login";
import AuthContext from "./store/auth-store";
import Home from "./pages/Home";
import ToDo from "./pages/ToDo";
import Diary from "./pages/Diary";
import Expense from "./pages/Expense";

function App() {
const autCtxt = useContext(AuthContext);
const [isFirstTime, setIsFirstTime] = useState(true);

useEffect(()=>{
setIsFirstTime(false);
},[])

  return (
    <Fragment>
      <Navbar />
      {isFirstTime ?"":!autCtxt.idToken? (
        <Switch>
          <Route path={"/login"} exact>
            <Login />
          </Route>
          <Route path={"*"}>
            <Redirect to={"/login"} />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route path={"/home"} exact>
            <Home />
          </Route>
          <Route path={"/todo"} exact>
            <ToDo />
          </Route>
          <Route path={"/diary"} exact>
            <Diary/>
          </Route>
          <Route path={"/expense"}>
            <Expense/>
          </Route>
          <Route path="*">
            <Redirect to={"/home"} />
          </Route>
        </Switch>
      )}
    </Fragment>
  );
}

export default App;
