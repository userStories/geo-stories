import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createLogger} from 'redux-logger'
import {postReducer} from './postReducer'

const reducer = combineReducers({
    postReducer
})

const middleware = composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger({collapsed: true})
))

const store = createStore(reducer, middleware)

export default store
export * from './postReducer'
