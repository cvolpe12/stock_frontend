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

  findStock = (e) => {
    e.preventDefault()
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.state.ticker}&apikey=O5GDC24ELGAH28VW`)
      .then(res => res.json())
      .then(data => {
        console.log("fetched");
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
        <form onSubmit={this.findStock}>
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
