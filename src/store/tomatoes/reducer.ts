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
  const unfinishedTomato = state.tomatoes
  .filter(tomato=>!tomato.aborted)
  .filter(tomato=>!tomato.description && !tomato.ended_at)[0]
  switch(action.type){
    case constants.FETCH_TODOS_SUCCESS:
    let desc = ''
    if(unfinishedTomato){
      desc = action.data
        .filter(todo=>!todo.deleted)
        .filter(todo=>todo.completed)
        .filter(todo=>Date.parse(todo.completed_at) - Date.parse(unfinishedTomato.started_at) > 0)
        .reduce((a,b)=>a.concat(`${b.description}+`),'')
        .slice(0,-1)
    }
    return {...state,description:desc}
    case constants.COMPLETED_TODO_SUCCESS:
      let description = state.description
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
      return {...state,tomatoes:newTomatoes,description:''}
    case constants.ADD_TOMATO_FAILURE:
    case constants.UPDATE_TOMATO_FAILURE:
    default:
      return state
  }
}
