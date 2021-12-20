export function LoginAction(value,type){
    return {type:"SET_LOGIN",inputType:type,inputValue:value}
}

export function URLAction(value,type){
    return {type:"SET_URL",inputType:type,inputValue:value}
}