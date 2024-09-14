import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode:"dark"
}

const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
        changeTheme : (state)=>{
            state.mode = state.mode === "light"? "dark" : "light";
        }
    }
})

export const {changeTheme} = themeSlice.actions;
export default themeSlice.reducer;