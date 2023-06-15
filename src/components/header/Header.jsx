import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchLocations } from '../locations/locationsSlice'

import ThemeSwitcher from './ThemeSwitcher';
import Locations from '../locations/Locations'
import CurrentLocation from './CurrentLocation'

import './header.scss'

export default function Header() {
    const [inputValue, setInputValue] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchLocations())
    }, [])

    return (
        <header className='header'>
            <div className="header__line-wrapper"><div className='header__line'></div></div>
            <div className="header__content">
                <div className='header__logo'>Weather App</div>
                <div className='header__location'>
                    <input className='header__input' type='text' placeholder='Enter your location' value={inputValue} onChange={(event) => setInputValue(event.target.value)}/>
                    <div className='header__geolocation'>
                        <p>Or let browser detect your position:</p>
                        <svg tabIndex={0} fill="var(--icon-color)" height="35px" width="35px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 447.342 447.342" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M443.537,3.805c-3.84-3.84-9.686-4.893-14.625-2.613L7.553,195.239c-4.827,2.215-7.807,7.153-7.535,12.459 c0.254,5.305,3.727,9.908,8.762,11.63l129.476,44.289c21.349,7.314,38.125,24.089,45.438,45.438l44.321,129.509 c1.72,5.018,6.325,8.491,11.63,8.762c5.306,0.271,10.244-2.725,12.458-7.535L446.15,18.429 C448.428,13.491,447.377,7.644,443.537,3.805z"></path> </g></svg>
                    </div>
                </div>
                <ThemeSwitcher/>
            </div>

            {inputValue ? 
            <Locations inputValue={inputValue} setInputValue={setInputValue}/>
            : <CurrentLocation/>}
            
        </header>
    )
}