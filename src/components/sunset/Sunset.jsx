import { useSelector } from 'react-redux'
import { getSunset } from '../weatherInfo/weatherInfoSlice'
import hasNullUndefinedOrNan from '../../utils/hasNullUndefinedOrNan'

import { ReactComponent as SunsetIcon } from '../../assets/icons/sunset.svg'

import './sunset.scss'

export default function Sunset() {
    const sunset = useSelector(getSunset)

    if(hasNullUndefinedOrNan(sunset)) return <div className='sunset'></div>
    const {hours, minutes, utcString} = sunset
    return (
        <div className='sunset'>
            <h3>Sunset</h3>
            <SunsetIcon/>
            <p>{`${hours}:${minutes}`} <span>UTC{utcString}</span></p>
        </div>
    )
}