import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import AddEditForm from '../forms/AddEditForm.js'

class ModalForm extends Component {

  // local state to check if modal is clicked
  state = {
    modal: false
  }

  // fcn to toggle modal click in state
  // called in AddEditForm when a user edits or adds a user
  // also called in modalForm when user clicks close button and open button
  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  // recieve props from data table and rendered from userinfo
  // check edit/add user
  // render add edit form based on local state
  render() {
    const closeBtn = <button className="close ui button" onClick={this.toggle}>&times;</button>
    const label = this.props.buttonLabel

    let button = ''
    let title = ''

    if(label === 'Edit') {
      button = <Button
                color="warning"
                onClick={this.toggle}
                className='ui button'
                >{label}
              </Button>
      title = 'Edit'
    } else {
      button = <Button
                color="success"
                onClick={this.toggle}
                className='ui button'
                >{label}
              </Button>
      title = 'Add User'
    }


    return (
      <div>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
          <ModalBody>
            <AddEditForm
              addItemToState={this.props.addItemToState}
              updateState={this.props.updateState}
              toggle={this.toggle}
              item={this.props.item} />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

export default ModalForm
