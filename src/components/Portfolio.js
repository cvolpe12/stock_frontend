import React from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom";


class Portfolio extends React.Component {

  state = {
    ticker: "",
    shares: "",
    stockInfo: ""
  }

  handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

  logout = () => {
		// localStorage.removeItem("token")
    console.log("logging out");
		this.props.logUserOut()
    localStorage.removeItem('jwt')
    this.props.history.push(`/`)
	}

  buyStock = (e) => {
    e.preventDefault()
    debugger
    console.log(this.props.currentUser);
    fetch(`http://localhost:3000/api/v1/investments`, {
      method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Accept": "application/json",
			},
			body: JSON.stringify({
        ticker: this.state.ticker,
        shares: this.state.shares,
        user_id: this.props.currentUser.id
      })
		})
		.then(res => res.json())
    .then(data => {
      this.setState({
        stockInfo: data
      })
      console.log(this.state.stockInfo);
    })
  }

  render() {
    console.log(this.props.currentUser.id);
    return (
      <div>
        <h1>Portfolio</h1>
        <form onSubmit={this.buyStock}>
          <input type="text" value={this.state.ticker} name="ticker" onChange={this.handleChange} placeholder="Ticker"></input>
          <br/>
          <input type="text" value={this.state.shares} name="shares" onChange={this.handleChange} placeholder="Shares"></input>
          <br/>
          <button type="submit" >Buy</button>
        </form>
        <button type="button" onClick={this.logout}>Logout</button>
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
    logUserOut: () => {dispatch({type: "LOGOUT"})},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
