import React from "react";
import { connect } from "react-redux"


class Portfolio extends React.Component {

  state = {
    ticker: "",
    shares: "",
  }


  handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
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
    .then(stock => {
      this.props.addInvestment(stock)
    })
  }

  renderPortfolio = () => {
    console.log(this.props.allInvestments);
    if (this.props.allInvestments){
      return this.props.allInvestments.map(investment => {
        return (
          <h4 key={investment.id} className="investment">{investment.ticker} - {investment.shares} Shares ${investment.shares* investment.current_price}</h4>
        )
      })
    } else {
      return null
    }
  }

  render() {
    return (
      <div>
        <div className="portfolio">
          <h1 className="pageTitle">Portfolio (${this.props.currentUser.balance})</h1>
          {this.renderPortfolio()}
        </div>
        <div className="vl"></div>
        <div className="buyForm">
          <form onSubmit={this.buyStock}>
            <h3>Cash - ${this.props.currentUser.balance}</h3>
            <input type="text" value={this.state.ticker} name="ticker" onChange={this.handleChange} placeholder="Ticker"></input>
            <br/>
            <input type="text" value={this.state.shares} name="shares" onChange={this.handleChange} placeholder="Shares"></input>
            <br/>
            <button type="submit" >Buy</button>
          </form>
        </div>
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
    addInvestment: (stock) => {dispatch({type: "ADD_INVESTMENT", payload: stock})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
