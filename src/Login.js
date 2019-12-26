import React, { Component } from 'react';
import './App.css';
import { Table } from 'reactstrap';

class Login extends Component {

  // local state to display what information is being shared with the test app
  state = {
    email: '',
    firstName: null,
    lastName: null,
    id: null,
    pic: null,
    accessToken: null
  }

  // when compnent renders, check if there is an authcode in the url
  // if there is, call get profile with the token
  // this authcode is neeeded to fetch to linkedin oauth api
  componentDidMount() {
    let authcode = window.location.href.slice(47, -10);
      if (authcode) {
      fetch(`https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${authcode}&redirect_uri=http://localhost:3001/login-with-linkedin&client_id=77i0orwyc6pvp2&client_secret=WvZdgMEKMohjJUqK`)
        .then(res => res.json())
        .then(res => this.getProfile(res))
    }
  }

  // fetch to linkedin oauth api using the response token from previous fetch (in component did mount)
  // set state with user info
  getProfile = (token) => {
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

  // if there is first name info in state, show the user's information
  // otherwise, render a button to share info
  // on click, go to linkedin oauth page
  render() {
    const items = (
      <tr key={this.state.id}>
        <td>{this.state.firstName}</td>
        <td>{this.state.lastName}</td>
        <td>{this.state.id}</td>
        <td>{this.state.pic}</td>
      </tr>
      )

    return (
      <div>
        {this.state.firstName ?
          <div>
          <h1>You are now sharing the following info with Dana-test-app</h1>
            <Table style={{margin: 'auto'}}>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>LinkedIn ID Number</th>
                  <th>LinkedIn Photo Information</th>
                </tr>
              </thead>
              <tbody style={{alignSelf: 'center'}}>
                {items}
              </tbody>
            </Table>
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
