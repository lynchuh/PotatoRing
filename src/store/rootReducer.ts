import { combineReducers } from 'redux'
import Todo from './todos/reducer'
import Tomato from './tomatoes/reducer'

export default combineReducers({
  Todo,
  Tomato
})
