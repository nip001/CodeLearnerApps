import { combineReducers } from "redux"

const stateUser = {
    username:"",
    token:"",
    role:""
}

const baseUrlBE = {
    url:"http://77f5-103-130-128-141.ngrok.io",
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

const Reducer = combineReducers({
    LoginReducer,
    URLReducer
})

export default Reducer