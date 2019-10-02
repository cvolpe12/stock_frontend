
const initialState = {
  allUserStocks: [],
  currentUser: ""
}

function reducer(state = initialState, action){
  switch (action.type) {
    case "GET_STOCKS":
      return {...state, allUserStocks: action.payload}
    case "SET_CURRENT_USER":
      return {...state, currentUser: action.payload}
    case "LOGOUT":
      return {...state, currentUser: ""}
    default:
      return state
  }
}

export default reducer;
