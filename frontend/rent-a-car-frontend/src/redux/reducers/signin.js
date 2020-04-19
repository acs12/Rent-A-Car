import { SIGNUP,LOGIN } from '../types/typeSignin'

const initialState = {
    
    data : [],
    admin : "",
    manager : "",
    username:"",
    dlState: "",
    dlNumber: "",
    emailAddress: "",
    creditCardInfo: "",
    residenceAddress: "",
    phoneNumber : ""
}

const singin = (state = initialState, action) => {
    switch(action.type){
        case SIGNUP: return {
            ...state,
            data : action.payload    
        }

        case LOGIN: 
        console.log("AP",action.payload)
        return Object.assign({},state,{
            
            data : action.payload.data,
            admin : action.payload.admin,
            manager : action.payload.manager,
            name : action.payload.name,
            dlState : action.payload.dlState,
            dlNumber : action.payload.dlNumber,
            emailAddress : action.payload.emailAddress,
            creditCardInfo : action.payload.creditCardInfo,
            residenceAddress : action.payload.residenceAddress,
            phoneNumber : action.payload.phoneNumber

        })

        default : return state
    }
}

export default singin