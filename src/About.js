import React, { Component } from 'react';
import './App.css';

class About extends Component {
  render() {
    console.log('renderede');
    return (
      <div>
        <h1>About Dana's Test App</h1>
        <p>This application grant's access to user information via LinkedIn OAuth 2.0.</p>
      </div>
    )
  }
}

export default About;