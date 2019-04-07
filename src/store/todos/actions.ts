import axios from 'src/config/axios'
import * as constants from '../constants'

interface IaddData {
  description : string,
}

interface IupdateData {
  description? : string,
  deleted? : boolean,
  completed? : boolean,
  extra? : any,
}

export const FetchTodo = ()=>( async (dispatch:any)=>{
  try{
    const response = await axios.get('/todos')
    dispatch({
      data:response.data.resources.filter( (todo:any)=>!todo.deleted),
      type: constants.FETCH_TODOS_SUCCESS
    })
  }catch(error){
    dispatch({
      error,
      type: constants.FETCH_TODOS_FAILURE
    })
  }
}
)

export const AddTodo = (data:IaddData)=>( async (dispatch:any)=>{
  try{
    const response = await axios.post('/todos',data)
    dispatch({
      data: response.data.resource,
      type: constants.ADD_TODO_SUCCESS
    })
  }catch(error){
    console.log('addtodofail,errorInfo:',error)
    dispatch({
      error,
      type: constants.ADD_TODO_FAILURE
    })
  }
})

export const UpdateTodo = (id:number,data:IupdateData)=> ( async (dispatch:any)=>{
  try{
    const response = await axios.put(`/todos/${id}`,data)
    dispatch({
      data:response.data.resource,
      type: constants.UPDATE_TODO_SUCCESS
    })
  }catch(error){
    dispatch({
      error,
      type: constants.UPDATE_TODO_FAILURE
    })
  }
})

export const CompletedTodo =(id:number,data)=>(async dispatch=>{
  try{
    const response = await axios.put(`/todos/${id}`,data)
    dispatch({
      data:response.data.resource,
      type: constants.COMPLETED_TODO_SUCCESS
    })
  }catch(error){
    dispatch({
      error,
      type: constants.COMPLETED_TODO_FAILURE
    })
  }
})

export const ToggleEditId = (id:number)=>({
  id,
  type: constants.TOGGLE_EDIT_ID,
})

export const ChangeNewTodoDesc = (description:string)=>({
  description,
  type: constants.CHANGE_NEW_TODO_DESCRIPTION
})

