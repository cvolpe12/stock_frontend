
const initialState = {
  allUserStocks: []
}

function reducer(state = initialState, action){
  switch (action.type) {
    case "GET_STOCKS":
      return {...state, allUserStocks: action.payload}
    default:
      return state
  }
}

export default reducer;
