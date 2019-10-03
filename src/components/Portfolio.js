import React from "react";
import { connect } from "react-redux"
import { Link } from "react-router-dom";


class Portfolio extends React.Component {

  state = {
    ticker: "",
    shares: "",
    stockInfo: ""
  }

  // componentDidMount() {
  //   console.log("portfolio");
  //   fetch(`http://localhost:3000/api/v1/investments`)
  //     .then(res => res.json())
  //     .then(investments => {
  //       // debugger
  //       let userInvestments = investments.filter(investment => investment.user_id === parseInt(this.props.currentUser.id))
  //       this.props.getInvestments(userInvestments)
  //     })
  // }

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

  renderPortfolio = () => {
    console.log(this.props.allInvestments);
    if (this.props.allInvestments){
      return this.props.allInvestments.map(investment => {
        return (
          <h4 key={investment.id}>{investment.ticker} - {investment.shares} ${investment.shares* investment.current_price}</h4>
        )
      })
    } else {
      return null
    }
  }

  render() {
    return (
      <div>
        <h1>Portfolio (${this.props.currentUser.balance})</h1>
        <div className="portfolio">
          {this.renderPortfolio()}
        </div>
        <div className="buyForm">
          <form onSubmit={this.buyStock}>
            <input type="text" value={this.state.ticker} name="ticker" onChange={this.handleChange} placeholder="Ticker"></input>
            <br/>
            <input type="text" value={this.state.shares} name="shares" onChange={this.handleChange} placeholder="Shares"></input>
            <br/>
            <button type="submit" >Buy</button>
          </form>
        </div>
        <button type="button" onClick={this.logout}>Logout</button>
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    allInvestments: state.allInvestments,
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch){
  return {
    getInvestments: (stocks) => {dispatch({type: "GET_INVESTMENTS", payload: stocks})},
    logUserOut: () => {dispatch({type: "LOGOUT"})},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
