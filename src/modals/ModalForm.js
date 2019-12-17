import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import AddEditForm from '../forms/AddEditForm.js'

class ModalForm extends Component {

  state = {
    modal: false
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

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
