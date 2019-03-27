import axios from 'src/config/axios'
import * as constants from '../constants'

interface IAdd {
  duration: number
}
interface IAbort{
  aborted?: boolean,
  ended_at?: string,
  description?: string
}

export const AddTomatoes = (params:IAdd)=>async dispatch=>{
  try{
    const response = await axios.post('/tomatoes',params)
    dispatch({
      data: response.data.resource,
      type: constants.ADD_TOMATO_SUCCESS
    })
  }catch(error){
    dispatch({
      error,
      type: constants.ADD_TOMATO_FAILURE,
    })
  }
}

export const FetchTomatoes =()=> async dispatch=>{
  try{
    const response = await axios.get('/tomatoes')
    dispatch({
      data: response.data.resources,
      type: constants.FETCH_TOMATOES_SUCCESS
    })
  }catch(error){
    dispatch({
      error,
      type: constants.FETCH_TOMATOES_FAILURE
    })
  }
}

export const AbortTomatoes = (id:number,params:IAbort)=> async dispatch=>{
  try{
    const response = await axios.put(`/tomatoes/${id}`,params)
    dispatch({
      data: response.data.resource,
      type: constants.UPDATE_TOMATO_SUCCESS
    })
  }catch(error){
    dispatch({
      error,
      type: constants.UPDATE_TOMATO_FAILURE
    })
  }
}
