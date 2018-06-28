import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import newPost from './addPostReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createLogger } from 'redux-logger'
import { postReducer } from './postReducer'
import { categoryReducer } from './categoryReducer'
import { userReducer } from './userReducer'
import authReducer from './authReducer'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const reducer = combineReducers({
    postReducer, categoryReducer, newPost, authReducer, userReducer
})

const pReducer = persistReducer(persistConfig, reducer);

// export const store = createStore(pReducer)


const middleware = composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    createLogger({ collapsed: true })
))

const store = createStore(pReducer, middleware)
export const persistor = persistStore(store)

export default store
export * from './addPostReducer'
export * from './postReducer'
export * from './categoryReducer'
export * from './authReducer'
export * from './userReducer'
