export function LoginAction(value,type){
    return {type:"SET_LOGIN",inputType:type,inputValue:value}
}

export function URLAction(value,type){
    return {type:"SET_URL",inputType:type,inputValue:value}
}
export function DataRefreshAction(value,type){
    return {type:"SET_DATA",inputType:type,inputValue:value}
}