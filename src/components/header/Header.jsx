import { useEffect, useState, useDeferredValue, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { fetchLocations } from '../locations/locationsSlice'

import ThemeSwitcher from '../themeSwitcher/ThemeSwitcher'
import Locations from '../locations/Locations'
import CurrentLocation from '../currentLocation/CurrentLocation'

import './header.scss'


export default function Header() {
    const dispatch = useDispatch()
    const [inputValue, setInputValue] = useState('')
    const bottomRef = useRef(null)
    const deferredInputValue = useDeferredValue(inputValue)

    useEffect(() => {
        dispatch(fetchLocations())
    }, [])

    function onInputChange(event) {
        setInputValue(event.target.value)
    }

    return (
        <header className='header'>
            <div className='header__top'>
                <div className='header__logo'>Weather App</div>
                <input className='header__input' name='location' type='text' placeholder='Enter your location' value={inputValue} onChange={onInputChange}/>
                <ThemeSwitcher ref={bottomRef}/>
            </div>
            <div ref={bottomRef} className='header__bottom'>
                <Locations inputValue={deferredInputValue} setInputValue={setInputValue}/>
                <CurrentLocation inputValue={deferredInputValue}/>
            </div>
            <div className='header__line-wrapper'><div className='header__line'></div></div>
        </header>
    )
}