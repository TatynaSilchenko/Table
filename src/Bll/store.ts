import {applyMiddleware, combineReducers, createStore} from "redux";
import TableReducer from "./TableReducer";
import  thunk from "redux-thunk"

const reducers = combineReducers({
    table: TableReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))

export type AppStateType = ReturnType<typeof reducers>
export type GetStateType = () => AppStateType