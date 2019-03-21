import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducer'

const enhance = applyMiddleware(thunk)

export default createStore(reducer,enhance)
