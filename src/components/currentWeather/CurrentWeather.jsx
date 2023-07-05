import { useSelector } from 'react-redux'

import { getCurrentWeather } from '../weatherInfo/weatherInfoSlice'
import getWeatherByWMO from '../../utils/getWeatherByWMO'
import hasNullUndefinedOrNan from '../../utils/hasNullUndefinedOrNan'
import setHumidityDescription from '../../utils/setHumidityDescription'
import setWindDescription from '../../utils/setWindDescription'
import setVisibilityDescription from '../../utils/setVisibilityDescription'

import CardHeader from '../cardHeader/CardHeader'
import CurrentWeatherItem from './CurrentWeatherItem'
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
            <CardHeader
                title='Current Weather'
                description={description.toLowerCase()}
            />
            <ul className='current__items'>
                <CurrentWeatherItem
                    title='temperature'
                    icon={<TemperatureIcon/>}
                    info={weather.temperature}
                    unit='℃'
                    description={`feels like ${weather.apparentTemperature}℃`}
                />
                <CurrentWeatherItem
                    title='wind'
                    icon={<WindIcon/>}
                    info={weather.windSpeed}
                    unit='m/s'
                    description={setWindDescription(weather.windSpeed).toLowerCase()}
                />
                <CurrentWeatherItem
                    title='humidity'
                    icon={<HumidityIcon/>}
                    info={weather.humidity}
                    unit='%'
                    description={setHumidityDescription(weather.humidity).toLowerCase()}
                />
                <CurrentWeatherItem
                    title='precipitation'
                    icon={<PrecipitationIcon/>}
                    info={weather.precipitation}
                    unit='mm'
                    description={`${weather.precipitationProbability}% probability`}
                />
                <CurrentWeatherItem
                    title='visibility'
                    icon={<VisibilityIcon/>}
                    info={(weather.visibility / 1000).toFixed(2)}
                    unit='km'
                    description={setVisibilityDescription(weather.visibility).toLowerCase()}
                />
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