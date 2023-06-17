import { useSelector, useDispatch } from 'react-redux'
import { useRef } from 'react'
import { setThemesListIsOpen } from '../../appearanceSlice'
import useThemeSetter from '../../hooks/themeSetter.hook'

import { ReactComponent as ColorsIcon } from '../../assets/icons/color-filter.svg'

import './themeSwitcher.scss'

export default function ThemeSwitcher() {
    const dispatch = useDispatch()
    const isThemesListOpen = useSelector(state => state.appearance.themesListOpen)
    const themesListRef = useRef(null)
    const { setTheme } = useThemeSetter(onButtonClick)

    function onButtonClick() {
        themesListRef.current.classList.toggle('theme-switcher_active')
        dispatch(setThemesListIsOpen(!isThemesListOpen))
    }

    return (
        <div ref={themesListRef} className='theme-switcher'>
            <button onClick={onButtonClick} className='theme-switcher__open-btn'>
                <ColorsIcon/>
            </button>
            <ul className='theme-switcher__themes-list'>
                <li><button onClick={() => setTheme('dark-blue')}></button></li>
                <li><button onClick={() => setTheme('dark')}></button></li>
                <li><button onClick={() => setTheme('light')}></button></li>
            </ul>
        </div>
    )
}