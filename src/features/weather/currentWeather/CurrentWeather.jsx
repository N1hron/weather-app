import { useSelector } from 'react-redux'

import { getCurrentWeather } from '../weatherSlice'
import { getWeatherByWMO, hasNullUndefinedOrNan, setHumidityDescription, setWindDescription, setVisibilityDescription } from '../../../utils'

import WeatherCard from '../WeatherCard'
import CurrentWeatherItem from './CurrentWeatherItem'
import { ReactComponent as TemperatureIcon } from '../../../assets/icons/thermometer.svg'
import { ReactComponent as WindIcon } from '../../../assets/icons/wind.svg'
import { ReactComponent as HumidityIcon } from '../../../assets/icons/water-drop.svg'
import { ReactComponent as PrecipitationIcon } from '../../../assets/icons/heavy-rain.svg'
import { ReactComponent as VisibilityIcon } from '../../../assets/icons/fog.svg'

import './currentWeather.scss'


export default function CurrentWeather() {
    let data = useSelector(getCurrentWeather)
    
    const {description, icon} = getWeatherByWMO(data?.weatherCode) || {}
    return (
        <WeatherCard 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1}}
            className='current' title='Current Weather' description={description}>
            {
                !hasNullUndefinedOrNan(data) &&
                <ul>
                    <CurrentWeatherItem
                        caption='temperature'
                        icon={<TemperatureIcon className='icon'/>}
                        info={data.temperature}
                        unit='℃'
                        description={`feels like ${data.apparentTemperature}℃`}
                    />
                    <CurrentWeatherItem
                        caption='wind'
                        icon={<WindIcon className='icon'/>}
                        info={data.windSpeed}
                        unit='m/s'
                        description={setWindDescription(data.windSpeed)}
                    />
                    <CurrentWeatherItem
                        caption='humidity'
                        icon={<HumidityIcon className='icon'/>}
                        info={data.humidity}
                        unit='%'
                        description={setHumidityDescription(data.humidity)}
                    />
                    <CurrentWeatherItem
                        caption='precipitation'
                        icon={<PrecipitationIcon className='icon'/>}
                        info={data.precipitation}
                        unit='mm'
                        description={`${data.precipitationProbability}% probability`}
                    />
                    <CurrentWeatherItem
                        caption='visibility'
                        icon={<VisibilityIcon className='icon'/>}
                        info={(data.visibility / 1000).toFixed(2)}
                        unit='km'
                        description={setVisibilityDescription(data.visibility)}
                    />
                    <li className='current__item'>
                        {icon}
                        <p>
                            <span>{data.weekday} {data.day}.{data.month}</span><br/>
                            <span>{data.hours}:{data.minutes} UTC{data.utcString}</span>
                        </p>
                    </li>
                </ul>
            }
        </WeatherCard>
    )
}