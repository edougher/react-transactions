import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

class AccountContainer extends Component {
  constructor(){
    super()
    this.state = {
      transactions: [],
      filterTerm: ''
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

  handleFilter = (value) => {
    this.setState({filterTerm: value})
    //return this.state.transactions.filter(t => t.description.toLowerCase().includes(value))
    console.log(value);
  }
  showTransactions = () => {
    //console.log(value.toString());
    let newTrans = this.state.transactions
    if(this.state.filterTerm !== ''){
    return newTrans.filter(t => t.description.toLowerCase().includes(this.state.filterTerm.toLowerCase()))
    }
    return newTrans
    //return this.state.transactions.filter(t => console.log(t))
    //console.log(ftr);
  }
 
  render() {

  
    return (
      <div>
        <Search filter={this.handleFilter}/>
        <AddTransactionForm handleSubmit={this.handleFormSubmit}/>
        <TransactionsList hello={this.filterTr}transactions={this.showTransactions()} delete={this.handleDelete}/>
      </div>
    );
  }
}

export default AccountContainer;
