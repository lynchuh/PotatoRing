import * as constants from '../constants'

interface IState {
  userInfo: any,
  error: any
}

const initState:IState = {
  userInfo: null,
  error: null
}

export default (state=initState,action)=>{
  switch(action.type){
    case constants.VERIFY_USER_SUCCESS:
      return {userInfo: action.data}
    case constants.VERIFY_USER_FAILURE:
      return {...state,error:action.error}
    case constants.HAS_READ_USER_ERROR:
      return {...state,error:null}
    default:
      return state
  }
}
