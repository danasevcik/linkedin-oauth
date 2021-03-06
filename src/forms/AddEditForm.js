import React from 'react';
import { Form, FormGroup, Label } from 'reactstrap';

class AddEditForm extends React.Component {

  // local state to keep track of updated user info
  state = {
    id: 0,
    first: '',
    last: '',
    email: '',
  }

  // update state onchange
  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  // called on submit
  // send fetch to backend to create a new user
  // check if response item is an array (w obj in it)
  // add response obj to state in UserInfo component
  // call toggle in ModalForm component
  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3000/createNewUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first: this.state.first,
        last: this.state.last,
        email: this.state.email,
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure', item)
        }
      })
      .catch(err => console.log(err))
  }

  // called on submit (has item prop from mapping over items in state)
  // fetch to backend to edit user
  // call updateState in UserInfo component
  // call toggle in ModalForm component
  submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/editUser', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: this.state.id,
        first: this.state.first,
        last: this.state.last,
        email: this.state.email,
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, first, last, email } = this.props.item
      this.setState({ id, first, last, email })
    }
  }

  // render form to add/edit based on toggle state in modal form
  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd} id='edit-form'>
        <FormGroup className='ui input'>
          <Label for='first'>First Name</Label>
          <p></p>
          <input type='text' name='first' id='first' onChange={this.onChange} value={this.state.first === null ? '' : this.state.first} />
        </FormGroup>
        <FormGroup className='ui input'>
          <Label for='last'>Last Name</Label>
          <input type='text' name='last' id='last' onChange={this.onChange} value={this.state.last === null ? '' : this.state.last}  />
        </FormGroup>
        <FormGroup className='ui input'>
          <Label for='email'>Email</Label>
          <input type='email' name='email' id='email' onChange={this.onChange} value={this.state.email === null ? '' : this.state.email}  />
        </FormGroup>

        <button className='ui button'>Submit</button>
      </Form>
    );
  }
}

export default AddEditForm
