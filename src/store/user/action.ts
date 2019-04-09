import axios from 'src/config/axios'
import * as constants from '../constants'
import history from '../../config/history'

export const VerifyUser = ()=>async dispatch=>{
  try{
    const response = await axios.get('/me')
    if(history.location.pathname !== '/'){
      history.push('/')
    }
    dispatch({
      type: constants.VERIFY_USER_SUCCESS,
      data: response.data
    })
  }catch(error){
    if(history.location.pathname === '/'){
      history.push('/login')
    }
    dispatch({
      type: constants.VERIFY_USER_FAILURE,
      error
    })
  }
}

export const Login = (params)=>async dispatch=>{
  try{
    await axios.post('sign_in/user',params)
    const response = await axios.get('/me')
    dispatch({
      type: constants.VERIFY_USER_SUCCESS,
      data: response.data
    })
    history.push('/')
  }catch(error){
    dispatch({
      type: constants.VERIFY_USER_FAILURE,
      error
    })
  }
}

export const SignUp = (params)=>async dispatch=>{
  try{
    await axios.post('sign_up/user',params)
    const response = await axios.get('/me')
    dispatch({
      type: constants.VERIFY_USER_SUCCESS,
      data: response.data
    })
    history.push('/')
  }catch(error){
    dispatch({
      type: constants.VERIFY_USER_FAILURE,
      error
    })
  }
}

export const InitData= ()=>async dispatch=>{
  try{
    const tomatoes = await axios.get('/tomatoes')
    dispatch({
      data: tomatoes.data.resources,
      type: constants.FETCH_TOMATOES_SUCCESS
    })
    const todos = await axios.get('/todos')
    dispatch({
      data:todos.data.resources,
      type: constants.FETCH_TODOS_SUCCESS
    })
  }catch(error){
    console.log(error)
  }
}
