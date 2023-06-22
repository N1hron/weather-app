import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { changeTheme } from '../appearanceSlice'

import { themes } from '../data'

export default function useThemeSetter() {
    const dispatch = useDispatch()
    const currentTheme = useSelector(state => state.appearance.currentTheme)

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if(savedTheme) {
            applyTheme(savedTheme)
            dispatch(changeTheme(savedTheme))
        }
    }, [])

    function applyTheme(theme) {
        const themeData = themes[theme]
        const rootStyle = document.documentElement.style
        
        rootStyle.setProperty('--main-color', themeData.mainColor)
        rootStyle.setProperty('--secondary-color', themeData.secondaryColor)
        rootStyle.setProperty('--additional-color', themeData.additionalColor)
        rootStyle.setProperty('--additional-color-hover', themeData.additionalColorHover)
        rootStyle.setProperty('--additional-color-active', themeData.additionalColorActive)
        rootStyle.setProperty('--border-color', themeData.borderColor)
        rootStyle.setProperty('--font-main-color', themeData.fontMainColor)
        rootStyle.setProperty('--font-secondary-color', themeData.fontSecondaryColor)
        rootStyle.setProperty('--icon-color', themeData.iconColor)
    }

    function setTheme(theme, callback) {
        if(currentTheme != theme) {
            dispatch(changeTheme(theme))
            applyTheme(theme)
            localStorage.setItem('theme', theme)
        }
        if(callback) callback()
    }

    return { setTheme }
}