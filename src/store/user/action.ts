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
    let errorInfo
    if(!error.response){
      errorInfo = '请检查网络是否正常'
    }else{
      const {errors} = error.response.data
      if(errors instanceof Array) {
        errorInfo = errors
      }
    }
    dispatch({
      type: constants.VERIFY_USER_FAILURE,
      error:errorInfo
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
    let errorInfo
    if(!error.response){
      errorInfo = '请检查网络是否正常'
    }else{
      const {errors} = error.response.data
      if(errors instanceof Array) {
        errorInfo = errors
      }
    }
    dispatch({
      type: constants.VERIFY_USER_FAILURE,
      error:errorInfo
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

export const HasReadErrorInfo =()=>({
  type: constants.HAS_READ_USER_ERROR
})