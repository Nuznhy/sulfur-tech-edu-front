import {applyMiddleware, combineReducers, createStore} from 'redux'
import authReducer from './auth-reducer';
import thunkMiddleWare from 'redux-thunk'
import userReducer from './user-reducer';
import adminReducer from './admin-reducer';

let rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    admin: adminReducer,
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never
export type ActionsTypes<T extends {[key: string]: (...args: any[])=>any}> = ReturnType<PropertiesType<T>> 

let store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

export default store;