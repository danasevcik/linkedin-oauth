import React, { Component } from 'react';
import './App.css';
import { Route, Switch, withRouter, Link } from "react-router-dom";
import { Input, Menu } from 'semantic-ui-react'
import Home from './Home.js'
import About from './About.js'
import Login from './Login.js'
import NavBar from './NavBar.js'

class App extends Component {

  state = {
    email: '',
    firstName: null,
    lastName: null,
    id: null,
    pic: null,
    activeItem: 'home'
  }

  componentDidMount() {
    let authcode = window.location.href.slice(28, -10);
      if (authcode) {
      fetch(`https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${authcode}&redirect_uri=http://localhost:3000/&client_id=77i0orwyc6pvp2&client_secret=WvZdgMEKMohjJUqK`)
        .then(res => res.json())
        .then(res => this.getProfile(res))
    }
  }

  handleChange = (e) => {
    this.setState({email: e.target.value})
  }


  handleSubmit = (e) => {
    e.preventDefault();
    let code = this.state.code;
    fetch(`https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=https://www.hunterz.io/about&client_id=77i0orwyc6pvp2&client_secret=WvZdgMEKMohjJUqK`)
      .then(res => res.json())
      .then(res => this.getProfile(res))
    this.setState({code: ''})
  }

  getProfile = (token) => {
    console.log(token);
    fetch(`https://api.linkedin.com/v2/me?oauth2_access_token=${token.access_token}`)
    .then(res => res.json())
    .then(res => {
      if (res.profilePicture) {
        this.setState({
          firstName: res.localizedFirstName,
          lastName: res.localizedLastName,
          id: res.id,
          pic: res.profilePicture.displayImage
        })

      }})
    this.setState({accessToken: token.access_token})
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    console.log('state',this.state);
    const { activeItem } = this.state
    return (
      <div className="App">
        <NavBar />
        
        <Switch>
          <Route
            path='/'
            component={Home}
            />
          <Route
            path='/about'
            component={About}
            />
          <Route
            path='/login-with-linkedin'
            component={Login}
            />
      </Switch>

        <a target='blank' href='https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77i0orwyc6pvp2&redirect_uri=http://localhost:3000/&state=xyz&scope=r_liteprofile,r_emailaddress'>
          <button className="ui linkedin button">
            <i aria-hidden="true" className="linkedin icon"></i>
            LinkedIn
          </button>
        </a>
        {this.state.accessToken &&
          <div>
            <input value={this.state.email} onChange={this.handleChange}></input>

            <a target="_blank" href={`https://www.linkedin.com/sales/gmail/profile/proxy/${this.state.email}`}>
              <button className='ui button'>submit</button>

            </a>
          </div>
        }
        {this.state.firstName ?
            <h1>You are now sharing the following info with Dana-test-app</h1>
          :
            <h1>Currently not sharing data with Dana-test-app</h1>
        }
        {this.state.firstName &&
          <p>First Name: {this.state.firstName}</p>
        }
        {this.state.lastName &&
          <p>Last Name: {this.state.lastName}</p>
        }
        {this.state.id &&
          <p>LinkedIn ID: {this.state.id}</p>
        }
        {this.state.pic &&
          <p>Photo Info: {this.state.pic}</p>
        }
      </div>
    );
  }
}


export default withRouter(App);
