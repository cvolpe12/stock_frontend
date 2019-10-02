import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Portfolio from './components/Portfolio'
import Login from "./components/Login"
import SignUpForm from "./components/SignUpForm"
import { connect } from "react-redux"


class App extends Component {

  componentDidMount(){
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
  }

  render() {
    return (
      <div className="App">
      <Switch>
      <Route path="/" exact render={routerProps =>  <Login {...routerProps}/>} />
      <Route path="/portfolio" render={routerProps => <Portfolio {...routerProps}/>} />

      <Route path="/signup" component={routerProps => <SignUpForm {...routerProps}/>} />
      </Switch>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch){
  return {
    setCurrentUser: (user) => {dispatch({type: "SET_CURRENT_USER", payload: user })}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
