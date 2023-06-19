import { useSelector } from 'react-redux'
import { getSunset, getUTCOffset } from '../weatherInfo/weatherInfoSlice'

import { ReactComponent as SunsetIcon } from '../../assets/icons/sunset.svg'

import './sunset.scss'

export default function Sunset() {
    const sunset = useSelector(getSunset)
    const utcOffset = useSelector(getUTCOffset)

    return (
        <div className='sunset'>
            {
                sunset ? 
                <>
                    <h3>Sunset</h3>
                    <SunsetIcon/>
                    <p>{sunset} <span>UTC{utcOffset >= 0 ? '+' : ''}{utcOffset}</span></p>
                </> : null
            }
        </div>
    )
}