import * as constants from '../constants'

interface IState {
  tomatoes: any[]
  description: string
}

const initState:IState = {
  tomatoes: [],
  description: ''
}

export default (state=initState,action)=>{
  switch(action.type){
    case constants.COMPLETED_TODO_SUCCESS:
      let description = state.description
      const unfinishedTomato = state.tomatoes
        .filter(tomato=>!tomato.aborted)
        .filter(tomato=>!tomato.description && !tomato.ended_at)[0]
      if(unfinishedTomato && action.data.completed && !description.includes(action.data.description)){
        description = !description ? description.concat(action.data.description) : description.concat(`+${action.data.description}`)
      }
      return {...state,description}
    case constants.CHANGE_NEW_TOMATO_DESCRIPTION:
      return {...state,description: action.data}
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
