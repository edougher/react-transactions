import React, { Component } from "react";

class AddTransactionForm extends Component {
  constructor(){
    super()
    this.state ={
      date: '',
      description: '',
      category: ''
    }
  }

  handleChange = (e) => {
    this.setState({
    [e.target.name]: e.target.value
  })
  }

  handleSubmit = e => {
    e.preventDefault()
    const newTr = {
      ...this.state
    }
    e.target.reset()
    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTr)
    }
    fetch('http://localhost:6001/transactions', reqObj)
    .then(resp => resp.json()) 
    .then(newToy => {
      this.props.handleSubmit(newToy)
      
    })
    
  }
    
 

  render() {
    return (
      <div className="ui segment">
        <form className="ui form" onChange={this.handleChange} onSubmit={this.handleSubmit}>
          <div className="inline fields">
            <input type="date" name="date" onChange={this.handleChange}/>
            <input type="text" name="description" placeholder="Description" />
            <input type="text" name="category" placeholder="Category" />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              step="0.01"
            />
          </div>
          <button className="ui button" type="submit">
            Add Transaction
          </button>
        </form>
      </div>
    );
  }
}

export default AddTransactionForm;
