import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../modals/ModalForm.js'

class DataTable extends Component {

  deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    console.log(confirmDelete);
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

  findOnLinkedIn = (id) => {

  }

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
              <button color="danger" className='ui button' onClick={() => this.findOnLinkedIn(item.id)}>Find On LinkedIn</button>

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
