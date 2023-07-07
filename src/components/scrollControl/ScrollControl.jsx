import { forwardRef } from 'react';

import {ReactComponent as ArrowIcon} from '../../assets/icons/arrow.svg'

import './scrollControl.scss'


const ScrollControl = forwardRef(function ScrollControl({step = 150}, ref) {
    function handleClick(direction) {
        const element = ref.current,
              scrollLeft = element.scrollLeft
        
        switch(direction) {
            case 'forward':
                element.scrollTo({
                    top: 0,
                    left: scrollLeft + step,
                    behavior: 'smooth'
                })
                
                break
            case 'backward':
                element.scrollTo({
                    top: 0,
                    left: scrollLeft - step,
                    behavior: 'smooth'
                })
                break
        }
    }


    return (
        <div className='scroll-control'>
            <button className='scroll-control__back' onClick={() => handleClick('backward')}><ArrowIcon/></button>
            <button className='scroll-control__forward' onClick={() => handleClick('forward')}><ArrowIcon/></button>
        </div>
    )
})

export default ScrollControl