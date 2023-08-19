import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import RegisterPage from "./RegisterPage/RegisterPage";
import LoginPage from "./LoginPage/LoginPage";
import PrivateRoute from './PrivateRouter';
import HomePage from "./HomePage/HomePage";
import UserList from "./UserList/UserList";
import UserDetails from "./UserDetails/UserDetails";
import AddUser from './AddUser/Adduser';
import UserEditForm from "./UserEditForm/EditUserForm.js";
import PubilcRoute from './PublicRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PubilcRoute component={LoginPage} path="/" exact />
          <PubilcRoute component={RegisterPage} path="/register" exact />
          <PrivateRoute component={HomePage} path="/home" />
          <PrivateRoute component={UserList} path="/userlist" />
          <PrivateRoute component={UserDetails} path="/userdetails/:id" />
          <PrivateRoute component={AddUser} path="/adduser" />
          <PrivateRoute component={UserEditForm} path="/usereditform/:id" />
          <Route render={() => <h2>Page not found</h2>} path="*" />
        </Switch>
      </Router>
    </div>
  );
}


export default App;