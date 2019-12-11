import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    code: '',
    firstName: null,
    lastName: null,
    id: null,
    pic: null
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

  getProfile = (res) => {
    console.log(res);
    fetch(`https://api.linkedin.com/v2/me?oauth2_access_token=${res.access_token}`)
    .then(res => res.json())
    .then(res => this.setState({
      firstName: res.localizedFirstName,
      lastName: res.localizedLastName,
      id: res.id,
      pic: res.profilePicture.displayImage
    }))

  }

  handleChange = (e) => {
    this.setState({code: e.target.value})
  }


  render() {
    console.log(this.state);
    return (
      <div className="App">
        <a target='blank' href='https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77i0orwyc6pvp2&redirect_uri=https://www.hunterz.io/about&state=xyz&scope=r_liteprofile'>click me for linkedin</a>
        <form id='get-info' onSubmit={this.handleSubmit}>
          <label>Once you've logged in with likedin, input here the characters after "code="</label>
          <input type='text' value={this.state.code} onChange={this.handleChange}/>
          <button>Let's Go!</button>
        </form>
        {this.state.firstName ? <h1>You are now sharing the following info with Dana-test-app</h1> : <h1>Currently not sharing data with Dana-test-app</h1>}
        {this.state.firstName && <p>First Name: {this.state.firstName}</p>}
        {this.state.lastName && <p>Last Name: {this.state.lastName}</p>}
        {this.state.id && <p>LinkedIn ID: {this.state.id}</p>}
        {this.state.pic && <p>Meta-Data re: LinkedIn Photo: {this.state.pic}</p>}
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
