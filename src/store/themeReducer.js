import { createSlice } from "@reduxjs/toolkit";


const themeInitialState = {
    activatePremium:false,
    darkMode:false
}

const themeSlice = createSlice({
    name:'Theme',
    initialState:themeInitialState,
    reducers:{
        togglePremium(state){
            state.activatePremium = !state.activatePremium
        },
        toggleTheme(state){
            state.darkMode = !state.darkMode
        }
    }
})


export const themeActions = themeSlice.actions

export default themeSlice.reducer