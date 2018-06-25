import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import newPost from './addPostReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createLogger} from 'redux-logger'
import {postReducer} from './postReducer'
import {categoryReducer} from './categoryReducer'

const reducer = combineReducers({
    postReducer, categoryReducer, newPost
})

const middleware = composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger({collapsed: true})
))

const store = createStore(reducer, middleware)

export default store
export * from './addPostReducer'
export * from './postReducer'
export * from './categoryReducer'
