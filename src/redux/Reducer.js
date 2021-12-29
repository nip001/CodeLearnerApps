import { combineReducers } from "redux"

const stateUser = {
    username:"",
    token:"",
    role:""
}

const stateDataRefresh = {
    hasilLatihan:{}
}

const baseUrlBE = {
    url:"http://3849-139-192-225-19.ngrok.io",
}

function LoginReducer(state=stateUser,action){
    if(action.type === 'SET_LOGIN'){
        return({
            ...state,
            [action.inputType]:action.inputValue
        })
    }
    return state
}

function URLReducer(state=baseUrlBE,action){
    if(action.type === 'SET_URL'){
        return({
            ...state,
            [action.inputType]:action.inputValue
        })
    }
    return state
}

function DataRefreshReducer(state=stateDataRefresh,action){
    if(action.type === 'SET_DATA'){
        return({
            ...state,
            [action.inputType]:action.inputValue
        })
    }
    return state
}

const Reducer = combineReducers({
    LoginReducer,
    URLReducer,
    DataRefreshReducer
})

export default Reducer