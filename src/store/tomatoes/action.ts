import axios from 'src/config/axios'
import * as constants from '../constants'

interface IAdd {
  duration: number
}
interface IReplenish {
  started_at: any
  ended_at: any
  description: string,
  manually_created: true
}

interface IAbort{
  aborted?: boolean,
  ended_at?: string,
  description?: string
}

export const AddTomatoes = (params:IAdd|IReplenish)=>async dispatch=>{
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

export const UpdateTomato = (id:number,params:IAbort)=> async dispatch=>{
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

export const ChangeTomatoDesc = (data)=>({
  type: constants.CHANGE_NEW_TOMATO_DESCRIPTION,
  data
})
