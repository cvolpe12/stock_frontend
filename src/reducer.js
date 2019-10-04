
const initialState = {
  allInvestments: [],
  currentUser: ""
}

function reducer(state = initialState, action){
  switch (action.type) {
    case "GET_INVESTMENTS":
      return {...state, allInvestments: action.payload}
    case "SET_CURRENT_USER":
      return {...state, currentUser: action.payload}
    case "LOGOUT":
      return {...state, currentUser: ""}
    case "ADD_INVESTMENT":
      return {...state, allInvestments: [...state.allInvestments, action.payload]}
    default:
      return state
  }
}

export default reducer;
