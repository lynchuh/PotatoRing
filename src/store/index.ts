import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './rootReducer'

const enhance = composeWithDevTools(applyMiddleware(thunk))
// const enhance = applyMiddleware(thunk)

export default createStore(reducer,enhance)
