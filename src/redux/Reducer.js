import { combineReducers } from "redux"

const stateUser = {
    username:"",
    nama:"",
    iduser:"",
    fotouser:"",
    token:"",
    role:""
}

const stateDataRefresh = {
    hasilLatihan:{},
    soal:{}
}

const baseUrlBE = {
    url:"http://a9cd-139-192-156-157.ngrok.io",
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