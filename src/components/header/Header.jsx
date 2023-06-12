import { useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeTheme } from '../../themeSlice'

import LocationsList from '../locationsList/LocationsList'

import './header.scss'

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

export default function Header() {
    const [inputValue, setInputValue] = useState('');
    const currentTheme = useSelector(state => state.theme.currentTheme)
    const dispatch = useDispatch()
    const themeListRef = useRef(null)
    const locationsRef = useRef(null)

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
        locationsRef.current.classList.toggle('locations_short')
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

    // function getGeolocation() {
    //     navigator.geolocation.getCurrentPosition(onSuccess, onError);
    // }

    // function onSuccess(position) {
    //     console.log(position)
    // }

    // function onError(error) {
    //     console.error(error)
    // }

    return (
        <div className='header'>
            <div className="header__line-wrapper">
                <div className='header__line'></div>
            </div>
            <div className='header__logo'>Weather App</div>
            <div className='header__location'>
                <input className='header__input' type='text' placeholder='Enter your location' value={inputValue} onChange={(event) => setInputValue(event.target.value)}/>
                <div className='header__geolocation'>
                    <p>Or let browser detect your position:</p>
                    <svg onClick={getGeolocation} tabIndex={0} fill="var(--icon-color)" height="35px" width="35px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 447.342 447.342" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M443.537,3.805c-3.84-3.84-9.686-4.893-14.625-2.613L7.553,195.239c-4.827,2.215-7.807,7.153-7.535,12.459 c0.254,5.305,3.727,9.908,8.762,11.63l129.476,44.289c21.349,7.314,38.125,24.089,45.438,45.438l44.321,129.509 c1.72,5.018,6.325,8.491,11.63,8.762c5.306,0.271,10.244-2.725,12.458-7.535L446.15,18.429 C448.428,13.491,447.377,7.644,443.537,3.805z"></path> </g></svg>
                </div>
            </div>
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
            <LocationsList ref={locationsRef} inputValue={inputValue} setInputValue={setInputValue}/>
        </div>
    )
}