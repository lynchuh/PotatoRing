import * as constants from '../constants'

interface IState {
  userInfo: any
}

const initState:IState = {
  userInfo: null,
}

export default (state=initState,action)=>{
  switch(action.type){
    case constants.VERIFY_USER_SUCCESS:
      return {userInfo: action.data}
    default:
      return state
  }
}
