import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {
  constructor(){
    super()
    this.state = {
      transactions: [],
      filter: 'none'
    }
  }
  //Fetch from BE
  componentDidMount(){
    fetch('http://localhost:6001/transactions')
    .then(resp => resp.json())
    .then( tData => {
      this.setState({transactions: tData})
      console.log(tData);
    })
  }
  //Update FE after successfull BE update
  handleFormSubmit = (newTr) => {
    this.setState({
      transactions: [...this.state.transactions, newTr]
    })
  }

  // state.filter update based on searchField input but overall filter functionalit does not work
  handleFilter = (value) => {
    this.setState({filter: value})
  }

// Delete from BE
  handleDelete = (id) => {
    fetch(`http://localhost:6001/transactions/${id}`, {method: 'DELETE'})
    .then(resp => resp.json())
    .then(trObj => {
      console.log(trObj);
    })
    this.removeObj(id)
  }
  //Delete from FE
  removeObj = id => {
   const newObj = this.state.transactions.filter(x => x.id !== id)
    this.setState({transactions: newObj})
  }

  // ### Filter Not Working, instead added Delete functionality ####
  //filteredTr = () => {
  // if(!this.state.filter === 'none' || !this.state.filter === ''){
  //   //const tr = this.state.transactions.map(tr => tr.name.includes(this.state.filter))
  //   console.log('hello');
  // }

  
  render() {
     
    return (
      <div>
        <Search filter={this.handleFilter}/>
        <AddTransactionForm handleSubmit={this.handleFormSubmit}/>
        <TransactionsList transactions={this.state.transactions} delete={this.handleDelete}/>
      </div>
    );
  }
}

export default AccountContainer;
