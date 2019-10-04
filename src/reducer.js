
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
      return {...state, currentUser: "", allInvestments: []}
    case "ADD_INVESTMENT":
      return {...state, allInvestments: [...state.allInvestments, action.payload]}
    // case "EMPTY_INVESTMENT":
    //   return {...state, allInvestments: []}
    default:
      return state
  }
}

export default reducer;
