import React from "react";
import { Link } from "react-router-dom";
import { Form, Button } from 'semantic-ui-react'
import { connect } from "react-redux"

class Login extends React.Component {

  state = {
    email: "",
    password: ""
  }

  handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

  handleSubmit = e => {
    e.preventDefault()
    fetch("http://localhost:3000/api/v1/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify(this.state)
		})
		.then(res => res.json())
    .then((response) => {
      // console.log(response);
			if (response.errors) {
				alert(response.errors)
			} else {
					// we need to login at the top level where we are holding our current user!
					// setState in App to currentuser
          // debugger
					this.props.setCurrentUser(response.user)
					localStorage.setItem('jwt', response.jwt)
					this.props.history.push(`/portfolio`)
				}
			})
	}


  render() {
    return (
      <div className="application">
      <br/><br/><br/><br/><br/>
      <div className="welcome">
        <h3 className="welcome-font">Sign In</h3>
        <div>
        <Form inverted onSubmit={this.handleSubmit}>
          <Form.Field>
            <input name="email" value={this.state.email} placeholder='Email' onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field>
            <input type="password" name="password" value={this.state.password} placeholder='Password' onChange={this.handleChange}/>
          </Form.Field>
          <Button type='submit'>Login</Button>
        </Form>
        <br/>
        <br/>
        <Link to={`/signup`}>
          <Button type='submit'>Sign Up</Button>
        </Link>
        </div>
      </div>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
