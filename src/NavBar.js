import React, { Component } from 'react';
import './App.css';
import { Link } from "react-router-dom";
import { Input } from 'semantic-ui-react'

class NavBar extends Component {

  // local state to handle email search
  state = {
    email: ''
  }

  // set state on change to keep track of email
  handleChange = (e) => {
    this.setState({email: e.target.value});
  }

  // render links to navbar and email input
  render() {
    return (
      <div id='nav-bar'>
        <div className='nav-link'>
          <Link to='/'>
            Home
          </Link>
        </div>
        <div className='nav-link'>
          <Link to='/about'>
            About
          </Link>
        </div>
        <div className='nav-link'>
          <Link to='/login-with-linkedin'>
            Login With Linkedin
          </Link>
        </div>
        <div className='nav-link'>
          <Link to='/user-info'>
            Users
          </Link>
        </div>
        <div className='nav-link' id='right'>
          <Input value={this.state.email} onChange={this.handleChange} placeholder='Find Someone via Email'></Input>
          <a target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/sales/gmail/profile/viewByEmail/${this.state.email}`}>
            <button className='ui button'>Search Email</button>
          </a>
        </div>
      </div>
    )
  }
}

export default NavBar;
