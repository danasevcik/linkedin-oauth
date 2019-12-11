import React, { Component } from 'react';
import './App.css';
// Login with LinkedIn - the screen should show the icon, when clicked it should show a small pop up requesting permission from current user to share his\her basic profile details, once approved, it should display profile lite details. Info on Profile lite can be found here - https://docs.microsoft.com/en-us/linkedin/shared/references/v2/profile/lite-profile
// Find linked in page using email - another alternative is to find LinkedIn profile page using email (not via the API), can you think of a way to do so and show that in the app?
class App extends Component {

  state = {
    email: '',
    firstName: null,
    lastName: null,
    id: null,
    pic: null
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
    console.log(this.state.code);
    let code = this.state.code;
    fetch(`https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=https://www.hunterz.io/about&client_id=77i0orwyc6pvp2&client_secret=WvZdgMEKMohjJUqK`)
      .then(res => res.json())
      .then(res => this.getProfile(res))
    this.setState({code: ''})
  }

  handleEmail = () => {
    console.log(this.state.email);
    // let token = window.location.href.slice(28, -10);
    // fetch(`https://www.linkedin.com/sales/gmail/profile/proxy/${this.state.email}`)
    // .then(res => res.json())
    // .then(res => console.log(res))
    // fetch(`https://api.linkedin.com/v2/people/email=${this.state.email}?X-RestLi-Protocol-Version:2.0.0&oauth2_access_token=${this.state.accessToken}`)
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
    console.log('state',this.state);
    return (
      <div className="App">
        <a target='blank' href='https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77i0orwyc6pvp2&redirect_uri=http://localhost:3000/&state=xyz&scope=r_liteprofile,r_emailaddress'>click me for linkedin</a>
        {this.state.accessToken &&
          <div>
            <input value={this.state.email} onChange={this.handleChange}></input>
            <button className='ui button' onClick={this.handleEmail}>submit</button>
            <a target="_blank" href={`https://www.linkedin.com/sales/gmail/profile/proxy/${this.state.email}`}>go!</a>
          </div>
        }
        {this.state.firstName ? <h1>You are now sharing the following info with Dana-test-app</h1> : <h1>Currently not sharing data with Dana-test-app</h1>}
        {this.state.firstName && <p>First Name: {this.state.firstName}</p>}
        {this.state.lastName && <p>Last Name: {this.state.lastName}</p>}
        {this.state.id && <p>LinkedIn ID: {this.state.id}</p>}
        {this.state.pic && <p>Photo Info: {this.state.pic}</p>}
      </div>
    );
  }
}


export default App;


// send request from backend

// <br></br>
// <button onClick={this.handleClick}>click 4 express linkedin</button>
// <br></br>
// <button onClick={this.handleURLClick}>URL?</button>
// // <button id='linkedin-button'>jquery</button>
// <p>{this.state.response}</p>

// callApi = async () => {
//   const response = await fetch('/api/hello');
//   const body = await response.json();
//   if (response.status !== 200) throw Error(body.message);
//
//   return body;
// };
//
// handleClick = async e => {
//   console.log('here');
//   const response = await fetch('http://localhost:5000/api/getlinkedin');
//   const body = await response.json();
//   if (response.status !== 200) throw Error(body.message);
//   console.log('no error', body);
// }
//
// handleURLClick = () => {
//   // window.history.pushState('http://localhost:3000');
// }


// modal pop up
// problem with cross domain

// jquery to open/close modal
// $(".open").on("click", function(){
//   $(".popup, .popup-content").addClass("active");
// });
// $(".close, .popup").on("click", function(){
//   $(".popup, .popup-content").removeClass("active");
// });


// html for modal
// <div className="popup-overlay">
//   <div className="popup-content">
//     <h2>Pop-Up</h2>
//     <p> This is an example pop-up that you can make using jQuery.</p>
//
//     <embed src="https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77i0orwyc6pvp2&redirect_uri=https://www.hunterz.io/about&state=xyz&scope=r_liteprofile" style={{width:'500px', height: '300px'}}/>
//     <button className="close">Close</button>
//   </div>
// </div>
//
// <h2>jQuery Pop-Up Example</h2>
// <button className="open">Open</button>
