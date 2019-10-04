import React from "react";
import { connect } from "react-redux"

class Transactions extends React.Component {

  renderTransactions = () => {
    if (this.props.allInvestments){
      return this.props.allInvestments.map(investment => {
        return (
          <h4 key={investment.id} className="investment"> BUY ({investment.ticker}) - {investment.shares} Shares @  ${investment.price_per_share}</h4>
        )
      })
    } else {
      return null
    }
  }

  render() {
    return (
      <div className="transactions">
        <h1 className="pageTitle">Transactions</h1>
        {this.renderTransactions()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
