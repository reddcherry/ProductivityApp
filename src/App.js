import logo from './logo.svg';
import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css';
import Navbar from './components/NavBar/Navbar';
import { Fragment, useContext } from 'react';
import Login from './pages/Login';
import { AuthProvider} from './store/auth-store';
import AuthContext from "./store/auth-store";
import Home from './pages/Home';



function App() {
const authCtx = useContext(AuthContext)
const idToken = authCtx.idToken;



  return (
    <Fragment>
      <Navbar />
{ !idToken?     <Switch>
        <Route path={'/login'} exact>
          <Login/>
        </Route>
        <Route path={'*'}>
          <Redirect to = {'/login'}/>
        </Route>
      </Switch> : 
      <Switch>
        <Route path={'/home'} exact>
          <Home/>
        </Route>
        <Route path={'*'}>
  <Redirect to = {'/home'}/>
        </Route>
      </Switch>
      }
</Fragment>
  );
}

export default App;
