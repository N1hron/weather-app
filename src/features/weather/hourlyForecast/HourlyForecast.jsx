import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { getHourlyForecast } from '../weatherSlice';

import { hasNullUndefinedOrNan, getLocalDate, getWeatherByWMO } from '../../../utils';

import WeatherCard from '../WeatherCard';
import HourlyForecastItem from './HourlyForecastItem'
import ScrollControl from '../../../components/scrollControl/ScrollControl'

import './hourlyForecast.scss'


export default function HourlyForecast() {
    const data = useSelector(getHourlyForecast)
    const listRef = useRef(null)
          
    function createListItems() {
        if (hasNullUndefinedOrNan(data)) return null
        
        const {timestamp, utcOffset, weatherCode, temperature, humidity, precipitation, windSpeed} = data;

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
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1, delay: 0.25 }}
            className='hourly' 
            title='Hourly forecast' 
            headerChild={<ScrollControl ref={listRef}/>}>

            {
                listItems &&
                <>
                    <div className='hourly__content'>
                        <ul ref={listRef} className='hourly__items'>
                            {listItems}
                        </ul>
                        <div className='hourly__shadow'></div>
                    </div>
                    <div className='line-wrapper'><div className='line line_bottom'></div></div>
                </>
            }
        </WeatherCard>
    )
}