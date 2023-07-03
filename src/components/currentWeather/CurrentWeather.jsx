import { useSelector } from 'react-redux'

import { getCurrentWeather } from '../weatherInfo/weatherInfoSlice'
import getWeatherByWMO from '../../utils/getWeatherByWMO'
import hasNullUndefinedOrNan from '../../utils/hasNullUndefinedOrNan'
import setHumidityDescription from '../../utils/setHumidityDescription'
import setWindDescription from '../../utils/setWindDescription'
import setVisibilityDescription from '../../utils/setVisibilityDescription'

import { ReactComponent as TemperatureIcon } from '../../assets/icons/thermometer.svg'
import { ReactComponent as WindIcon } from '../../assets/icons/wind.svg'
import { ReactComponent as HumidityIcon } from '../../assets/icons/water-drop.svg'
import { ReactComponent as PrecipitationIcon } from '../../assets/icons/heavy-rain.svg'
import { ReactComponent as VisibilityIcon } from '../../assets/icons/fog.svg'

import './currentWeather.scss'


export default function CurrentWeather() {
    const weather = useSelector(getCurrentWeather)
    
    if (hasNullUndefinedOrNan(weather)) return <div className='current'></div>
          
    const {description, icon} = getWeatherByWMO(weather.weatherCode)

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
                    <p>{weather.temperature} <span>℃</span></p>
                    <span>feels like {weather.apparentTemperature}℃</span>
                </li>
                <li className='current__item'>
                    <div className='current__item-heading'>
                        <span>wind</span>
                        <WindIcon/>
                    </div>
                    <p>{weather.windSpeed} <span>m/s</span></p>
                    <span>{setWindDescription(weather.windSpeed).toLowerCase()}</span>
                </li>
                <li className='current__item'>
                    <div className='current__item-heading'>
                        <span>humidity</span>
                        <HumidityIcon/>
                    </div>
                    <p>{weather.humidity} <span>%</span></p>
                    <span>{setHumidityDescription(weather.humidity).toLowerCase()}</span>
                </li>
                <li className='current__item'>
                    <div className='current__item-heading'>
                        <span>precipitation</span>
                        <PrecipitationIcon/>
                    </div>
                    <p>{weather.precipitation} <span>mm</span></p>
                    <span>{weather.precipitationProbability}% probability</span>
                </li>
                <li className='current__item'>
                    <div className='current__item-heading'>
                        <span>visibility</span>
                        <VisibilityIcon/>
                    </div>
                    <p>{(weather.visibility / 1000).toFixed(2)} <span>km</span></p>
                    <span>{setVisibilityDescription(weather.visibility).toLowerCase()}</span>
                </li>
                <li className='current__item'>
                    {icon}
                    <p>
                        <span>{weather.weekday} {weather.day}.{weather.month}</span>
                        <span>{weather.hours}:{weather.minutes} UTC{weather.utcString}</span>
                    </p>
                </li>
            </ul>
        </div>
    )
}