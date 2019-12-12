import React, { Component } from 'react';
import './App.css';
import { Link } from "react-router-dom";

class NavBar extends Component {

  state = {
    email: ''
  }

  handleChange = (e) => {
    this.setState({email: e.target.value});
  }

  render() {
    return (
      <div>
        <Link to='/'>
          Home
        </Link>
        <Link to='/about'>
          About
        </Link>
        <Link to='/login-with-linkedin'>
          Login With Linkedin
        </Link>
        <div>
          <input value={this.state.email} onChange={this.handleChange}></input>
          <a target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/sales/gmail/profile/viewByEmail/${this.state.email}`}>
            <button className='ui button'>submit</button>
          </a>
        </div>
      </div>
    )
  }
}

export default NavBar;
