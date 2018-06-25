import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import newPost from './addPostReducer'

const reducer = combineReducers({
  newPost
})

const middleware = applyMiddleware(thunkMiddleware)

const store = createStore(reducer, middleware)

export default store
