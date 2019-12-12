import React, { Component } from 'react';
import './App.css';
import { Input, Menu } from 'semantic-ui-react'
import Home from './Home.js'
import About from './About.js'
import Login from './Login.js'

class NavBar extends Component {

  state = {
    activeItem: 'home'
  }

  handleItemClick = (e, { name }) => {
    this.setState({activeItem: name})
  }

  render() {
    const { activeItem } = this.state
    console.log('renderede');
    let component = this.state.activeItem[0].toUpperCase() + this.state.activeItem.slice(1);
    console.log(component);
    return (
      <div>
        <Menu secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='about'
            active={activeItem === 'about'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='login with linkedin'
            active={activeItem === 'login with linkedin'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        {component === 'Home' && <Home />}
        {component === 'About' && <About />}
        {component === 'Login with linkedin' && <Login />}
      </div>
    )
  }
}

export default NavBar;
