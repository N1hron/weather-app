import { useSelector } from 'react-redux'

import { getCurrentWeather } from '../weatherInfo/weatherInfoSlice'
import getWeatherByWMO from '../../utils/getWeatherByWMO'
import hasNullUndefinedOrNan from '../../utils/hasNullUndefinedOrNan'

import { ReactComponent as TemperatureIcon } from '../../assets/icons/thermometer.svg'
import { ReactComponent as WindIcon } from '../../assets/icons/wind.svg'
import { ReactComponent as HumidityIcon } from '../../assets/icons/water-drop.svg'
import { ReactComponent as PrecipitationIcon } from '../../assets/icons/heavy-rain.svg'
import { ReactComponent as VisibilityIcon } from '../../assets/icons/fog.svg'

import './currentWeather.scss'


export default function CurrentWeather() {
    const weather = useSelector(getCurrentWeather)
    
    if (hasNullUndefinedOrNan(weather)) return <div className='current'></div>

    const {
        weekday, 
        month,
        day, 
        hours,
        minutes, 
        utcString,
        temperature, 
        apparentTemperature, 
        weatherCode, 
        windSpeed,
        humidity,
        precipitation,
        precipitationProbability,
        visibility
    } = weather
          
    const {description, icon} = getWeatherByWMO(weatherCode)

    return (
        <div className='current'>
            <header>
                <h3>Current Weather</h3>
                <span>{description.toLowerCase()}</span>
            </header>
            <ul className='current__items'>
                <li className='current__item'>
                    <div className='current__item-heading'>
                        <span>temperature</span>
                        <TemperatureIcon/>
                    </div>
                    <p>{temperature} <span>&#8451;</span></p>
                    <span>feels like {apparentTemperature} &#8451;</span>
                </li>
                <li className='current__item'>
                    <div className='current__item-heading'>
                        <span>wind</span>
                        <WindIcon/>
                    </div>
                    <p>{windSpeed} <span>m/s</span></p>
                </li>
                <li className='current__item'>
                    <div className='current__item-heading'>
                        <span>humidity</span>
                        <HumidityIcon/>
                    </div>
                    <p>{humidity} <span>%</span></p>
                </li>
                <li className='current__item'>
                    <div className='current__item-heading'>
                        <span>precipitation</span>
                        <PrecipitationIcon/>
                    </div>
                    <p>{precipitation} <span>mm</span></p>
                    <span>{precipitationProbability} % probability</span>
                </li>
                <li className='current__item'>
                    <div className='current__item-heading'>
                        <span>visibility</span>
                        <VisibilityIcon/>
                    </div>
                    <p>{(visibility / 1000).toFixed(0)} <span>km</span></p>
                </li>
                <li className='current__item'>
                    {icon}
                    <p>
                        <span>{weekday} {day}.{month}</span>
                        <span>{hours}:{minutes} UTC{utcString}</span>
                    </p>
                </li>
            </ul>
        </div>
    )
}