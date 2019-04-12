import axios from 'src/config/axios'
import * as constants from '../constants'

interface IAddData {
  description : string,
}

interface IUpdateData {
  description? : string,
  deleted? : boolean,
  completed? : boolean,
  extra? : any,
}

export const AddTodo = (data:IAddData)=>( async (dispatch:any)=>{
  try{
    const response = await axios.post('/todos',data)
    dispatch({
      data: response.data.resource,
      type: constants.ADD_TODO_SUCCESS
    })
  }catch(error){
    dispatch({
      error,
      type: constants.ADD_TODO_FAILURE
    })
  }
})

export const UpdateTodo = (id:number,data:IUpdateData)=> ( async (dispatch:any)=>{
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
  data:id,
  type: constants.TOGGLE_EDIT_ID,
})

export const ChangeNewTodoDesc = (description:string)=>({
  data:description,
  type: constants.CHANGE_NEW_TODO_DESCRIPTION
})

