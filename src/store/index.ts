import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './rootReducer'

const ENV = process.env.NODE_ENV
let enhance = applyMiddleware(thunk)

if(ENV ==='production'){
    enhance = applyMiddleware(thunk)
}else if(ENV === 'development'){
    enhance = composeWithDevTools(applyMiddleware(thunk))
}

export default createStore(reducer,enhance)
