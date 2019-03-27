import * as constants from '../constants'

interface IState {
  tomatoes: any[]
}

const initState:IState = {
  tomatoes: []
}

export default (state=initState,action)=>{
  switch(action.type){
    case constants.ADD_TOMATO_SUCCESS:
      return {...state,tomatoes:[action.data,...state.tomatoes]}
    case constants.FETCH_TOMATOES_SUCCESS:
      return {...state,tomatoes:action.data}
    case constants.UPDATE_TOMATO_SUCCESS:
      const newTomatoes = state.tomatoes.map(tomato=> tomato.id === action.data.id ? action.data : tomato)
      return {...state,tomatoes:newTomatoes}
    case constants.ADD_TOMATO_FAILURE:
    case constants.FETCH_TOMATOES_FAILURE:
    case constants.UPDATE_TOMATO_FAILURE:
    default:
      return state
  }
}
