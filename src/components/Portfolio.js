import React from "react";
import { connect } from "react-redux"


class Portfolio extends React.Component {

  state = {
    ticker: "",
    shares: "",
    currentStock: ""
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
      if (stock.errors) {
				alert(stock.errors)
			} else {
      this.setState({
        ticker: "",
        shares: ""
      })
      this.props.addInvestment(stock)
      fetch(`http://localhost:3000/api/v1/users/${this.props.currentUser.id}`, {
        method: "PATCH",
  			headers: {
  				"Content-Type": "application/json",
  				"Accept": "application/json",
  			},
  			body: JSON.stringify({
          balance: this.props.currentUser.balance - (parseInt(stock.shares)* parseInt(stock.current_price))
        })
  		})
      .then(res => res.json())
      .then(user => {
        this.props.setCurrentUser(user)
        })
      }
    })
  }

  stockStatus = inv => {
    if (inv.current_price < inv.open_price) {
      return {color:"Red"}
    } else if (inv.current_price > inv.open_price) {
      return {color:"green"}
    } else if (inv.current_price === inv.open_price) {
      return {color:"grey"}
    }
  }

  // updateStocks = () => {
  //   fetch(`http://localhost:3000/api/v1/investments/${investment.id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json",
  //     },
  //   })
  //   .then(res => res.json())
  //   .then(stock => {
  //     return (
  //       <h4 key={investment.id} className="investment" style={this.stockStatus(investment)}>
  //       {investment.ticker} - {investment.shares} Shares ${(investment.shares* investment.current_price).toFixed(2)}
  //       </h4>
  //     )
  //   })
  // }

  renderPortfolio = () => {
    // console.log(this.props.allInvestments)
    if (this.props.allInvestments){
      return this.props.allInvestments.map(investment => {
        return (
          <h4 key={investment.id} className="investment" style={this.stockStatus(investment)}>
          {investment.ticker} - {investment.shares} Shares ${(investment.shares* investment.current_price).toFixed(2)}
          </h4>
        )
      })
    } else {
      return null
    }
  }

  renderInvesting = () => {
    let investing = 0
    this.props.allInvestments.forEach(inv =>{
      investing += (inv.shares* inv.current_price)
    })
    return investing.toFixed(2)
  }



  render() {
    return (
      <div>
        <div className="portfolio">
          <h1 className="pageTitle">Portfolio (${this.renderInvesting()})</h1>
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
    setCurrentUser: (user) => {dispatch({type: "SET_CURRENT_USER", payload: user })},
    getInvestments: (stocks) => {dispatch({type: "GET_INVESTMENTS", payload: stocks})},
    logUserOut: () => {dispatch({type: "LOGOUT"})},
    addInvestment: (stock) => {dispatch({type: "ADD_INVESTMENT", payload: stock})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
