import { forwardRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

import useThemeSetter from '../../hooks/themeSetter.hook'

import { ReactComponent as ColorsIcon } from '../../assets/icons/color-filter.svg'

import './themeSwitcher.scss'


const ThemeSwitcher = forwardRef(function ThemeSwitcher(_, ref) { // ref is a container for the list of themes
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
                themeListContainer &&
                createPortal(
                    <AnimatePresence>
                        {
                            isThemeListOpen &&
                            <motion.ul 
                                initial={{ opacity: 0, scale: 0.5 }} 
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{duration: 0.05}}
                                className='theme-switcher__themes-list'>

                                <li><button onClick={() => setTheme('dark-blue', onButtonClick)}></button></li>
                                <li><button onClick={() => setTheme('dark', onButtonClick)}></button></li>
                                <li><button onClick={() => setTheme('light', onButtonClick)}></button></li>
                            </motion.ul>
                        }
                    </AnimatePresence>, themeListContainer
                )
            }
        </div>
    )
})

export default ThemeSwitcher