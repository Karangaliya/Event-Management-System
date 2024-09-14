import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentEvent : null,
    loading : false,
    error : null
}

const eventSlice = createSlice({
    name:'event',
    initialState,
    reducers:{
        createStart : (state) =>{
            state.loading = true,
            state.error = null
        },
        createSuccess : (state,action) =>{
            state.currentEvent = action.payload;
            state.loading = false,
            state.error = null
        },
        createError : (state,action) =>{
            state.loading = false,
            state.error = action.payload.error;
        },
        updateStart : (state) =>{
            state.loading = true,
            state.error = null
        },
        updateSuccess : (state,action) =>{
            state.currentEvent = action.payload;
            state.loading = false,
            state.error = null 
        },
        updateError : (state,action) =>{
            state.loading = false,
            state.error = action.payload.error;
        },
        deleteSuccess : (state) =>{
            state.currentEvent = null,
            state.loading = false,
            state.error = null
        }
    }
})

export const {createStart,createSuccess,createError,updateStart,updateSuccess,updateError,deleteSuccess} = eventSlice.actions;
export default eventSlice.reducer;
