import { useEffect } from 'react'

import useLocalStorage from './localStorage.hook'
import { themes } from '../data'


export default function useThemeSetter() {
    const [value, setValue] = useLocalStorage('theme', 'dark-blue')

    useEffect(() => {changeColors(value)}, [value])

    const changeColors = (theme) => {
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
        if(theme !== value) setValue(theme)
        if(callback) callback()
    }

    return { setTheme }
}