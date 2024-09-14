import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentCompany : null,
    loading : false,
    error : null
}

const companySlice = createSlice({
    name:'company',
    initialState,
    reducers:{
        cloginInStart : (state) =>{
            state.loading = true,
            state.error = null
        },
        cloginInSuccess : (state,action) =>{
            state.currentCompany = action.payload;
            state.loading = false,
            state.error = null
        },
        cloginInError : (state,action) =>{
            state.loading = false,
            state.error = action.payload;
        },
        cupdateInStart : (state) =>{
            state.loading = true,
            state.error = null
        },
        cupdateInSuccess : (state,action) =>{
            state.currentCompany = action.payload;
            state.loading = false,
            state.error = null 
        },
        cupdateInError : (state,action) =>{
            state.loading = false,
            state.error = action.payload;
        },
        clogoutInSuccess : (state) =>{
            state.currentCompany = null,
            state.loading = false,
            state.error = null
        }
    }
})

export const {cloginInStart,cloginInSuccess,cloginInError,cupdateInStart,cupdateInSuccess,cupdateInError,clogoutInSuccess} = companySlice.actions;
export default companySlice.reducer;
