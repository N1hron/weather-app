import { useSelector } from 'react-redux'

import { getCurrentWeather } from '../weatherSlice'
import getWeatherByWMO from '../../../utils/getWeatherByWMO'
import hasNullUndefinedOrNan from '../../../utils/hasNullUndefinedOrNan'
import setHumidityDescription from '../../../utils/setHumidityDescription'
import setWindDescription from '../../../utils/setWindDescription'
import setVisibilityDescription from '../../../utils/setVisibilityDescription'

import WeatherCard from '../WeatherCard'
import CurrentWeatherItem from './CurrentWeatherItem'
import { ReactComponent as TemperatureIcon } from '../../../assets/icons/thermometer.svg'
import { ReactComponent as WindIcon } from '../../../assets/icons/wind.svg'
import { ReactComponent as HumidityIcon } from '../../../assets/icons/water-drop.svg'
import { ReactComponent as PrecipitationIcon } from '../../../assets/icons/heavy-rain.svg'
import { ReactComponent as VisibilityIcon } from '../../../assets/icons/fog.svg'

import './currentWeather.scss'


export default function CurrentWeather({animationDelay}) {
    const weather = useSelector(getCurrentWeather)
    
    if (hasNullUndefinedOrNan(weather)) return <WeatherCard className='current'></WeatherCard>
    const {description, icon} = getWeatherByWMO(weather.weatherCode)
    return (
        <WeatherCard 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1, delay: animationDelay }}
            className='current' title='Current Weather' description={description}>
            <ul>
                <CurrentWeatherItem
                    caption='temperature'
                    icon={<TemperatureIcon className='icon'/>}
                    info={weather.temperature}
                    unit='℃'
                    description={`feels like ${weather.apparentTemperature}℃`}
                />
                <CurrentWeatherItem
                    caption='wind'
                    icon={<WindIcon className='icon'/>}
                    info={weather.windSpeed}
                    unit='m/s'
                    description={setWindDescription(weather.windSpeed)}
                />
                <CurrentWeatherItem
                    caption='humidity'
                    icon={<HumidityIcon className='icon'/>}
                    info={weather.humidity}
                    unit='%'
                    description={setHumidityDescription(weather.humidity)}
                />
                <CurrentWeatherItem
                    caption='precipitation'
                    icon={<PrecipitationIcon className='icon'/>}
                    info={weather.precipitation}
                    unit='mm'
                    description={`${weather.precipitationProbability}% probability`}
                />
                <CurrentWeatherItem
                    caption='visibility'
                    icon={<VisibilityIcon className='icon'/>}
                    info={(weather.visibility / 1000).toFixed(2)}
                    unit='km'
                    description={setVisibilityDescription(weather.visibility)}
                />
                <li className='current__item'>
                    {icon}
                    <p>
                        <span>{weather.weekday} {weather.day}.{weather.month}</span><br/>
                        <span>{weather.hours}:{weather.minutes} UTC{weather.utcString}</span>
                    </p>
                </li>
            </ul>
        </WeatherCard>
    )
}