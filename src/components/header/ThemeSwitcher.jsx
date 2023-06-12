import { useSelector, useDispatch } from "react-redux"
import { useEffect, useRef } from "react"
import { changeTheme } from '../../appearanceSlice'
import { setThemesListIsOpen } from "../../appearanceSlice"

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

export default function ThemeSwitcher() {
    const dispatch = useDispatch()
    const currentTheme = useSelector(state => state.appearance.currentTheme)
    const isThemesListOpen = useSelector(state => state.appearance.themesListOpen)
    const themeListRef = useRef(null)

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme')
        if(savedTheme) {
            applyTheme(savedTheme)
            dispatch(changeTheme(savedTheme))
        }
    }, [])

    function onThemeChange(theme) {
        if(currentTheme != theme) {
            dispatch(changeTheme(theme))
            applyTheme(theme)
            localStorage.setItem('theme', theme)
        }
        onButtonClick()
    }

    function onButtonClick() {
        themeListRef.current.classList.toggle('header__theme-select_active')
        dispatch(setThemesListIsOpen(!isThemesListOpen))
    }

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

    return (
        <div ref={themeListRef} className='header__theme-select'>
            <button onClick={onButtonClick} className='header__theme-select-open-btn'>
                <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 40.9444C26.123 42.8446 28.9266 44 32 44C38.6274 44 44 38.6274 44 32C44 26.4085 40.1757 21.7102 35 20.3781" stroke="var(--icon-color)" strokeWidth="4" strokeLinejoin="round"/><path d="M13 20.3781C7.82432 21.7102 4 26.4085 4 32C4 38.6274 9.37258 44 16 44C22.6274 44 28 38.6274 28 32C28 30.4506 27.7063 28.9697 27.1716 27.6101" stroke="var(--icon-color)" strokeWidth="4" strokeLinejoin="round"/><path d="M24 28C30.6274 28 36 22.6274 36 16C36 9.37258 30.6274 4 24 4C17.3726 4 12 9.37258 12 16C12 22.6274 17.3726 28 24 28Z" fill="none" stroke="var(--icon-color)" strokeWidth="4" strokeLinejoin="round"/>
                </svg>
            </button>
            <ul className='header__themes-list'>
                <li><button onClick={() => onThemeChange('dark-blue')} style={{backgroundColor: '#1d232f'}}></button></li>
                <li><button onClick={() => onThemeChange('dark')} style={{backgroundColor: '#1F2025'}}></button></li>
                <li><button onClick={() => onThemeChange('light')} style={{backgroundColor: '#FFFFFF'}}></button></li>
            </ul>
        </div>
    )
}