import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentTheme: 'dark-blue',
    themesListOpen: false
}

const appearanceSlice = createSlice({
    name: 'appearance',
    initialState,
    reducers: {
        changeTheme: (state, action) => {state.currentTheme = action.payload},
        setThemesListIsOpen: (state, action) => {state.themesListOpen = action.payload}
    }
})

export const getIsThemesListOpen = state => state.appearance.themesListOpen

const { actions, reducer} = appearanceSlice
const { changeTheme, setThemesListIsOpen } = actions

export default reducer
export { changeTheme, setThemesListIsOpen }