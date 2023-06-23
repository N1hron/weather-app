import { useSelector } from 'react-redux'
import { getSunrise } from '../weatherInfo/weatherInfoSlice'
import hasNullUndefinedOrNan from '../../utils/hasNullUndefinedOrNan'

import { ReactComponent as SunriseIcon } from '../../assets/icons/sunrise.svg'

import './sunrise.scss'

export default function Sunrise() {
    const sunrise = useSelector(getSunrise)

    if(hasNullUndefinedOrNan(sunrise)) return <div className='sunrise'></div>
    const {hours, minutes, utc} = sunrise
    return (
        <div className='sunrise'>
            <h3>Sunrise</h3>
            <SunriseIcon/>
            <p>{`${hours}:${minutes}`} <span>UTC{utc}</span></p>
        </div>
    )
}