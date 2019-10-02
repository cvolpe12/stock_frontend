
const initialState = {
  allUserStocks: []
}

function reducer(state = initialState, action){
  switch (action.type) {
    case "GET_STOCKS":
      return {...state, allUserStocks: action.payload}
    case "SET_CURRENT_USER":
      return {...state, currentUser: action.payload}
    default:
      return state
  }
}

export default reducer;
