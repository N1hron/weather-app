import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { changeTheme } from '../appearanceSlice'

const themesData = {
    'light': {
        mainColor: '#fafafa',
        secondaryColor: '#e4e5f1',
        additionalColor: '#484b6a',
        additionalColorHover: '#424561',
        additionalColorActive: '#3b3d56',
        borderColor: '#484b6a',
        fontSecondaryColor: '#FFFFFF',
        fontMainColor: '#484b6a',
        iconColor: '#484b6a'
    },
    'dark': {
        mainColor: '#1F2025',
        secondaryColor: '#292a31',
        additionalColor: '#adadad',
        additionalColorHover: '#888888',
        additionalColorActive: '#757575',
        borderColor: '#adadad',
        fontMainColor: '#dadada',
        fontSecondaryColor: '#393838',
        iconColor: '#dadada'
    },
    'dark-blue': {
        mainColor: '#1d232f',
        secondaryColor: '#212733',
        additionalColor: '#272b68',
        additionalColorHover: '#24285e',
        additionalColorActive: '#202353',
        borderColor: '#FFFFFF',
        fontSecondaryColor: '#FFFFFF',
        fontMainColor: '#FFFFFF',
        iconColor: '#FFFFFF'
    }
}

export default function useThemeSetter(callback) {
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
        const root = document.documentElement
        const themeData = themesData[theme]
        root.style.setProperty('--main-color', themeData.mainColor)
        root.style.setProperty('--secondary-color', themeData.secondaryColor)
        root.style.setProperty('--additional-color', themeData.additionalColor)
        root.style.setProperty('--additional-color-hover', themeData.additionalColorHover)
        root.style.setProperty('--additional-color-active', themeData.additionalColorActive)
        root.style.setProperty('--border-color', themeData.borderColor)
        root.style.setProperty('--font-main-color', themeData.fontMainColor)
        root.style.setProperty('--font-secondary-color', themeData.fontSecondaryColor)
        root.style.setProperty('--icon-color', themeData.iconColor)
    }

    function setTheme(theme) {
        if(currentTheme != theme) {
            dispatch(changeTheme(theme))
            applyTheme(theme)
            localStorage.setItem('theme', theme)
        }
        callback()
    }

    return { setTheme }
}