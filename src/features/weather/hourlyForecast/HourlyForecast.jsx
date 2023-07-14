import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { getHourlyForecast } from '../weatherSlice';

import hasNullUndefinedOrNan from '../../../utils/hasNullUndefinedOrNan';
import getLocalDate from '../../../utils/getLocalDate';
import getWeatherByWMO from '../../../utils/getWeatherByWMO';

import WeatherCard from '../WeatherCard';
import HourlyForecastItem from './HourlyForecastItem'
import ScrollControl from '../../../components/scrollControl/ScrollControl'

import './hourlyForecast.scss'


export default function HourlyForecast({animationDelay}) {
    const data = useSelector(getHourlyForecast)
    const listRef = useRef(null)

    if(hasNullUndefinedOrNan(data)) return (
        <WeatherCard
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1, delay: animationDelay }}
            className='hourly'>
        </WeatherCard>
    )

    const {timestamp, utcOffset, weatherCode, temperature, humidity, precipitation, windSpeed} = data;
          
    function createListItems() {
        return timestamp.map((timestamp, i) => {
            const {hours, minutes} = getLocalDate(timestamp, utcOffset),
                  {icon} = getWeatherByWMO(weatherCode[i])
            
            return <HourlyForecastItem 
                        key={timestamp}
                        time={`${hours}:${minutes}`} 
                        icon={icon}
                        temperature={temperature[i].toFixed(0)} 
                        humidity={humidity[i]} 
                        precipitation={precipitation[i]} 
                        windSpeed={windSpeed[i].toFixed(1)}
                    />
        })
    }

    const listItems = createListItems()
    return (
        <WeatherCard 
            animationDelay={animationDelay}
            className='hourly' 
            title='Hourly forecast' 
            headerChild={<ScrollControl ref={listRef}/>}>

            <div className='hourly__content'>
                <ul ref={listRef} className='hourly__items'>
                    {listItems}
                </ul>
                <div className='hourly__shadow'></div>
            </div>
            <div className='line-wrapper'><div className='line line_bottom'></div></div>
        </WeatherCard>
    )
}