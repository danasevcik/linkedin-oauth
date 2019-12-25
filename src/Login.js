import React, { Component } from 'react';
import './App.css';

class Login extends Component {

  state = {
    email: '',
    firstName: null,
    lastName: null,
    id: null,
    pic: null,
    accessToken: null
  }

  componentDidMount() {
    let authcode = window.location.href.slice(47, -10);
      if (authcode) {
      fetch(`https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${authcode}&redirect_uri=http://localhost:3001/login-with-linkedin&client_id=77i0orwyc6pvp2&client_secret=WvZdgMEKMohjJUqK`)
        .then(res => res.json())
        .then(res => this.getProfile(res))
    }
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

  render() {
    return (
      <div>
        {this.state.firstName ?
            <div>
              <h1>You are now sharing the following info with Dana-test-app</h1>
              <p>First Name: {this.state.firstName}</p>
              <p>Last Name: {this.state.lastName}</p>
              <p>LinkedIn ID: {this.state.id}</p>
              <p>Photo Info: {this.state.pic}</p>
            </div>
          :
            <div>
              <h1>Currently not sharing data with Dana's Test App</h1>
              <h3>Login with LinkedIn below!</h3>
              <a target='blank' href='https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77i0orwyc6pvp2&redirect_uri=http://localhost:3001/login-with-linkedin&state=xyz&scope=r_liteprofile,r_emailaddress'>
              <button className="ui linkedin button">
              <i aria-hidden="true" className="linkedin icon"></i>
                LinkedIn
              </button>
              </a>
            </div>
        }
      </div>
    )
  }
}

export default Login;
