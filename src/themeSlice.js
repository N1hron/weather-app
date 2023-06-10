import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentTheme: 'dark-blue'
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state, action) => {state.currentTheme = action.payload}
    }
})

const { actions, reducer} = themeSlice
const { changeTheme } = actions

export default reducer
export { changeTheme }