import axios from '../config/axios'
import cookies from 'universal-cookie'

import Swal from 'sweetalert2'

const cookie = new cookies()

// LOGIN 
export const onLoginUser = (username, password) => {
    // tembak data ke database
    return (dispatch) => {
       axios.post('/users/login', 
        {
            username,
            password
        }).then(res => {
            if(typeof(res.data) === 'string'){
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: res.data
                  })
            } else {
                const {id,name, username, email, gender, password, avatar} = res.data
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Login Success!',
                    showConfirmButton: false,
                    timer: 1500
                  })
            
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    id, name, username, email, gender, password, avatar
                }
            })
            cookie.set('usernameUser', {id,name,username, email, gender, password, avatar }, {path: '/'})
            }
        })
    }
}

// KEEP LOGIN
export const keepLogin = (objUser) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: {
            id: objUser.id,
            name: objUser.name,
            username: objUser.username,
            email: objUser.email, 
            avatar: objUser.avatar,
            gender: objUser.gender
        }
    }
}

// LOGOUT
export const onLogoutUser = () => {
    cookie.remove('usernameUser')
    return {
        type: 'LOGOUT_SUCCESS'
    }
}

export const updateProfile = (user) => {
    cookie.remove('usernameUser')
    return (dispatch) => {
        axios.get(
            'http://localhost:2019/users/'+user
        ).then( res => {
            if(typeof(res.data) == 'string'){
                // Print errornya
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: res.data
                  })
            } else {
                console.log(res.data);
                
            const {id, username,name, email, avatar, age, gender} = res.data[0]
            // console.log(res.data[0].username + " berhasil login");
            dispatch(
                {
                    type: 'LOGIN_SUCCESS', // untuk menentukan reducer mana yang akan memproses
                    payload: {
                        id, username, name, email, avatar, age, gender
                    } // berisi data yang akan di taruh di state
                }
            )
            // Save data kedalam cookie
            cookie.set('usernameUser', {id,username,name,email,avatar,age,gender})
            }
        })
    }
}

//------------------------------------------------------------------------------

// LOGIN ADMIN
export const onLoginAdmin = (username, password) => {
    // tembak data ke database
    return (dispatch) => {
       axios.post('/login/admin', 
        {
            username,
            password
        }).then(res => {
            if(typeof(res.data) === 'string'){
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: res.data
                  })
            } else {
                const {id, username, password} = res.data
            console.log(res.data);
            
            dispatch({
                type: 'LOGIN_ADMINSUCCESS',
                payload: {
                    id, username,password
                }
            })
            cookie.set('usernameAdmin', {username}, {path: '/'})
            }
        })
    }
}

// KEEP LOGIN ADMIN
export const keepLoginAdmin = (objUser) => {
    return {
        type: "LOGIN_ADMINSUCCESS",
        payload: {
            id: objUser.id,
            username: objUser.username,
        }
    }
}

// LOGOUT ADMIN
export const onLogoutAdmin = () => {
    cookie.remove('usernameAdmin')
    return {
        type: 'LOGOUT_ADMINSUCCESS'
    }
}