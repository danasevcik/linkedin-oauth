import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../modals/ModalForm.js'

class DataTable extends Component {

  // call this fcn when delete button is clicked
  // confirm
  // if confirmDelete is true, send fetch to backend
  // call deleteItemFromState in userinfo
  deleteItem = id => {
    let confirmDelete = window.confirm('Delete user from database?')
    console.log(confirmDelete);
    // call fetch if confirmDelete is true
    if(confirmDelete){
      fetch('http://localhost:3000/deleteUser', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
      .then(response => response.json())
      .then(item => {
        this.props.deleteItemFromState(id)
      })
      .catch(err => console.log(err))
    }

  }

  // rendered from userinfo / recieve props
  // for each user, map and create a table row with associated info
  // render delete and find on linkedin buttons
  render() {

    const items = this.props.items.map(item => {
      return (
        <tr key={item.id}>
          <td>{item.first}</td>
          <td>{item.last}</td>
          <td>{item.email}</td>
          <td style={{display: 'flex'}}>

              <ModalForm buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
              {' '}
              <button color="danger" className='ui button' onClick={() => this.deleteItem(item.id)}>Delete</button>
              <a target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/sales/gmail/profile/viewByEmail/${item.email}`}>
                <button color="danger" className='ui button'>Find On LinkedIn</button>
              </a>

          </td>
        </tr>
        )
      })

    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>First</th>
            <th>Last</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody style={{alignSelf: 'center'}}>
          {items}
        </tbody>
      </Table>
    )
  }
}

export default DataTable
