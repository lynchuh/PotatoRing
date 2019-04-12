import * as constants from '../constants'

interface IInitState{
  todos: any[],
  editingId: number,
  newDescription: string
}

const initState:IInitState = {
  editingId: -1,
  newDescription:'',
  todos:[],
}

export default (state=initState,action:any)=>{
  switch(action.type){
    case constants.ADD_TODO_SUCCESS:
      const todos = [action.data,...state.todos]
      return {...state,todos,newDescription:''}
    case constants.FETCH_TODOS_SUCCESS:
      return {...state,todos:action.data}
    case constants.COMPLETED_TODO_SUCCESS:
    case constants.UPDATE_TODO_SUCCESS:
      const newTodos = state.todos.map(todo=>todo.id===action.data.id?action.data : todo)
      return {...state,todos: newTodos,editingId:-1}
    case constants.TOGGLE_EDIT_ID:
      return {...state,editingId:action.data}
    case constants.CHANGE_NEW_TODO_DESCRIPTION:
      return {...state, newDescription:action.data}
    default:
      return state
  }
}
