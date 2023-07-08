import { forwardRef, useState } from 'react'
import { createPortal } from 'react-dom'

import useThemeSetter from '../../hooks/themeSetter.hook'

import { ReactComponent as ColorsIcon } from '../../assets/icons/color-filter.svg'

import './themeSwitcher.scss'


const ThemeSwitcher = forwardRef(function ThemeSwitcher(_, ref) {
    const [isThemeListOpen, setIsThemeListOpen] = useState(false)
    const { setTheme } = useThemeSetter()
    const themeListContainer = ref.current

    const onButtonClick = () => {setIsThemeListOpen(isThemeListOpen => !isThemeListOpen)}
    
    return (
        <div className='theme-switcher'>
            <button onClick={onButtonClick} className='theme-switcher__open-btn'>
                <ColorsIcon/>
            </button>
            {
                themeListContainer && isThemeListOpen ?
                createPortal(
                    <ul className='theme-switcher__themes-list'>
                        <li><button onClick={() => setTheme('dark-blue', onButtonClick)}></button></li>
                        <li><button onClick={() => setTheme('dark', onButtonClick)}></button></li>
                        <li><button onClick={() => setTheme('light', onButtonClick)}></button></li>
                    </ul>, themeListContainer
                ) 
                : null
            }
        </div>
    )
})

export default ThemeSwitcher