import { useSelector } from 'react-redux'
import { getSunrise, getUTCOffset } from '../weatherInfo/weatherInfoSlice'
import hasNullUndefinedOrNan from '../../utils/hasNullUndefinedOrNan'

import { ReactComponent as SunriseIcon } from '../../assets/icons/sunrise.svg'

import './sunrise.scss'

export default function Sunrise() {
    const sunrise = useSelector(getSunrise)
    const utcOffset = useSelector(getUTCOffset)

    if(hasNullUndefinedOrNan(sunrise)) return <div className='sunrise'></div>
    const {hours, minutes} = sunrise
    return (
        <div className='sunrise'>
            <h3>Sunrise</h3>
            <SunriseIcon/>
            <p>{`${hours}:${minutes}`} <span>UTC{utcOffset >= 0 ? '+' : ''}{utcOffset}</span></p>
        </div>
    )
}