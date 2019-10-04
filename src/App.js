import React, { Component, Fragment } from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom'
import Portfolio from './components/Portfolio'
import Transactions from './components/Transactions'
import Login from "./components/Login"
import SignUpForm from "./components/SignUpForm"
import { connect } from "react-redux"


class App extends Component {

  componentDidMount(){
    console.log("auto login");
    const jwt = localStorage.getItem('jwt')
		if (jwt){
			fetch("http://localhost:3000/api/v1/auto_login", {
				headers: {
					"Authorization": jwt
				}
			})
			.then(res => res.json())
			.then((response) => {
				if (response.errors) {
					alert(response.errors)
				} else {
					this.props.setCurrentUser(response)
				}
			})
		}
    console.log("investment");
    fetch(`http://localhost:3000/api/v1/investments`)
      .then(res => res.json())
      .then(investments => {
        // debugger
        let userInvestments = investments.filter(investment => investment.user_id === parseInt(this.props.currentUser.id))
        this.props.getInvestments(userInvestments)
      })
  }

  logout = () => {
		// localStorage.removeItem("token")
    console.log("logging out");
		this.props.logUserOut()
    localStorage.removeItem('jwt')
	}

  renderNav = () => {
    if (this.props.currentUser) {
      return(
        <Fragment>
          <Link to={`/portfolio`}>
            Portfolio
          </Link> |
          <Link to={`/transactions`}>
            Transactions
          </Link> |
          <Link to={`/`} onClick={this.logout}>
            Log Out
          </Link>
        </Fragment>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <div className="App">
      <div className="nav">
        {this.renderNav()}
      </div>
      <Switch>
        <Route path="/" exact render={routerProps =>  <Login {...routerProps}/>} />
        <Route path="/portfolio" render={routerProps => <Portfolio {...routerProps}/>} />
        <Route path="/transactions" render={routerProps => <Transactions {...routerProps}/>} />
        <Route path="/signup" component={routerProps => <SignUpForm {...routerProps}/>} />
      </Switch>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser,
    allInvestments: state.allInvestments,
  }
}

function mapDispatchToProps(dispatch){
  return {
    setCurrentUser: (user) => {dispatch({type: "SET_CURRENT_USER", payload: user })},
    getInvestments: (stocks) => {dispatch({type: "GET_INVESTMENTS", payload: stocks})},
    logUserOut: () => {dispatch({type: "LOGOUT"})},
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
