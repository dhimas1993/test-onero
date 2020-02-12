import {combineReducers} from 'redux'

const init = {
    id: '',
    name: '',
    username: '', 
    email: '', 
    avatar: '',
    gender: ''

}

const initAdmin = {
    id: '',
    username: '',
}

const AuthReducers = (data = init, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...data,
                id: action.payload.id,
                name: action.payload.name,
                username: action.payload.username,
                email: action.payload.email, 
                avatar: action.payload.avatar,
                gender: action.payload.gender
            }
        case "LOGOUT_SUCCESS":
            return {
                ...data,
                id: "",
                username: ""
            }
        
            default:
                return data
    }
}

const AdminReducers = (data = initAdmin, action) => {
    switch (action.type) {
        case "LOGIN_ADMINSUCCESS":
            return {
                ...data,
                id: action.payload.id,
                username: action.payload.username
            }
        case "LOGOUT_ADMINSUCCESS":
            return {
                ...data,
                id: "",
                username: ""
            }
        
            default:
                return data
    }
}

export default combineReducers (
    {
        auth: AuthReducers,
        admin_auth: AdminReducers
    }
)