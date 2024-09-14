import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser : null,
    loading : false,
    error : null
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        loginInStart : (state) =>{
            state.loading = true,
            state.error = null
        },
        loginInSuccess : (state,action) =>{
            state.currentUser = action.payload;
            state.loading = false,
            state.error = null 
        },
        loginInError : (state,action) =>{
            state.loading = false,
            state.error = action.payload;
        },
        updateInStart : (state) =>{
            state.loading = true,
            state.error = null
        },
        updateInSuccess : (state,action) =>{
            state.currentUser = action.payload;
            state.loading = false,
            state.error = null 
        },
        updateInError : (state,action) =>{
            state.loading = false,
            state.error = action.payload;
        },
        logoutInSuccess : (state) =>{
            state.currentUser = null,
            state.loading = false,
            state.error = null
        }
    }
})

export const {loginInStart,loginInSuccess,loginInError,updateInStart,updateInSuccess,updateInError,logoutInSuccess} = userSlice.actions;
export default userSlice.reducer;
