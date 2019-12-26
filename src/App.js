import React, { Component } from 'react';
import './App.css';
import { Route, Switch, withRouter } from "react-router-dom";
import Home from './Home.js'
import About from './About.js'
import Login from './Login.js'
import NavBar from './NavBar.js'
import UserInfo from './UserInfo.js'

class App extends Component {

  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route
            path='/about'
            component={About}
            />
          <Route
            path='/login-with-linkedin'
            component={Login}
            />
          <Route
            path='/user-info'
            component={UserInfo}
            />
          <Route
            path='/'
            component={Home}
            />
        </Switch>
      </div>
    );
  }
}


export default withRouter(App);
