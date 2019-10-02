import React from "react";

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
        user_id: 1
      })
		})
		.then(res => res.json())
    .then(data => {
      debugger
      this.setState({
        stockInfo: data
      })
      console.log(this.state.stockInfo);
    })
  }

  render() {
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
      </div>
    )
  }
}
export default Portfolio
