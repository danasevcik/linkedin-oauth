import React, { Component } from 'react';
import './App.css';
import { Container, Row, Col } from 'reactstrap'
import DataTable from './tables/DataTable.js'
import ModalForm from './modals/ModalForm.js'
import { CSVLink } from "react-csv"

class UserInfo extends Component {

  state = {
     items: []
   }

   componentDidMount(){
     this.getItems()
   }

   getItems(){
     fetch('http://localhost:3000/getAllUsers')
       .then(response => response.json())
       .then(items => this.setState({items}))
       .catch(err => console.log(err))
   }

   addItemToState = (item) => {
     this.setState(prevState => ({
       items: [...prevState.items, item]
     }))
   }

   updateState = (item) => {
     const itemIndex = this.state.items.findIndex(data => data.id === item.id)
     const newArray = [
       ...this.state.items.slice(0, itemIndex),
       item,
       ...this.state.items.slice(itemIndex + 1)
     ]
     this.setState({ items: newArray })
   }

   deleteItemFromState = (id) => {
     const updatedItems = this.state.items.filter(item => item.id !== id)
     this.setState({ items: updatedItems })
   }

   render() {
     return (
       <Container className="App">
         <Row>
           <Col>
             <h1>Dana's Test App Users</h1>
           </Col>
         </Row>
         <Row>
           <Col>
             <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState}/>
             <CSVLink
             filename={"db.csv"}
             color="primary"
             className="ui button"
             style={{marginTop: '2px'}}
             data={this.state.items}>
             Download CSV
             </CSVLink>
           </Col>
         </Row>
         <Row>
           <Col>
             <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
           </Col>
         </Row>
       </Container>
     )
   }

}

export default UserInfo;
