import React, { Component } from 'react';
import './App.css';

class Home extends Component {

  // render text and welcome photo
  render() {
    return (
      <div>
        <h1>Welcome to Dana's Test App</h1>
        <img id='welcome-photo' alt='smiley face' src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/SNice.svg/1200px-SNice.svg.png'/>
      </div>
    )
  }
}

export default Home;
