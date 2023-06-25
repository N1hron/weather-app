import { useSelector, useDispatch } from 'react-redux'
import { forwardRef } from 'react'
import { createPortal } from 'react-dom'
import { setThemesListIsOpen } from '../../appearanceSlice'
import useThemeSetter from '../../hooks/themeSetter.hook'

import { ReactComponent as ColorsIcon } from '../../assets/icons/color-filter.svg'

import './themeSwitcher.scss'

function ThemeSwitcher(props, ref) {
    const dispatch = useDispatch()
    const isThemesListOpen = useSelector(state => state.appearance.themesListOpen)
    const { setTheme } = useThemeSetter()
    const container = ref.current

    function onButtonClick() {
        dispatch(setThemesListIsOpen(!isThemesListOpen))
    }
    
    return (
        <div className='theme-switcher'>
            <button onClick={onButtonClick} className='theme-switcher__open-btn'>
                <ColorsIcon/>
            </button>
            {
                container && isThemesListOpen ?
                createPortal(
                    <ul className='theme-switcher__themes-list'>
                        <li><button onClick={() => setTheme('dark-blue', onButtonClick)}></button></li>
                        <li><button onClick={() => setTheme('dark', onButtonClick)}></button></li>
                        <li><button onClick={() => setTheme('light', onButtonClick)}></button></li>
                    </ul>, container
                ) 
                : null
            }
        </div>
    )
}

export default forwardRef(ThemeSwitcher)