import { useSelector } from 'react-redux'
import { getSunrise, getUTCOffset } from '../weatherInfo/weatherInfoSlice'

import { ReactComponent as SunriseIcon } from '../../assets/icons/sunrise.svg'

import './sunrise.scss'

export default function Sunrise() {
    const sunrise = useSelector(getSunrise)
    const utcOffset = useSelector(getUTCOffset)
    
    return (
        <div className='sunrise'>
            {
                sunrise ? 
                <>
                    <h3>Sunrise</h3>
                    <SunriseIcon/>
                    <p>{sunrise} <span>UTC{utcOffset >= 0 ? '+' : ''}{utcOffset}</span></p>
                </> : null
            }
        </div>
    )
}