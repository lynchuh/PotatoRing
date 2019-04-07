import { combineReducers } from 'redux'
import TodoReducer from './todos/reducer'
import TomatoReducer from './tomatoes/reducer'
import UserReducer from './user/reducer'

export default combineReducers({
  TodoReducer,
  TomatoReducer,
  UserReducer
})
