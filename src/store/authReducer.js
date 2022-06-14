import { createSlice } from "@reduxjs/toolkit";


const initialToken = localStorage.getItem('userToken')
const initialEmail = localStorage.getItem('userEmail')

const authInitialState = {
    token:initialToken || '',
    email:initialEmail || '',
    isLoggedIn:!!initialToken,
}

const authSlice = createSlice({
    name:'authentication',
    initialState:authInitialState,
    reducers:{
        login(state,action){
            state.token = action.payload.token
            state.email = action.payload.email
            state.isLoggedIn = !!state.token
            localStorage.setItem('userToken',state.token)
            localStorage.setItem('userEmail',state.email)
        },
        logout(state){
            state.token = null
            state.email = null
            state.isLoggedIn = false
            localStorage.removeItem('userToken')
            localStorage.removeItem('userEmail')
        }
    }
})

export const authActions = authSlice.actions
export default authSlice.reducer