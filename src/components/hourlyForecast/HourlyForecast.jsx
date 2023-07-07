import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { getHourlyForecast } from '../weatherInfo/weatherInfoSlice';

import hasNullUndefinedOrNan from '../../utils/hasNullUndefinedOrNan';
import getLocalDate from '../../utils/getLocalDate';
import getWeatherByWMO from '../../utils/getWeatherByWMO';

import CardHeader from '../cardHeader/CardHeader'
import HourlyForecastItem from './HourlyForecastItem'
import ScrollControl from '../scrollControl/ScrollControl'

import './hourlyForecast.scss'


export default function HourlyForecast() {
    const data = useSelector(getHourlyForecast)
    const listRef = useRef(null)

    if(hasNullUndefinedOrNan(data)) return <div className='hourly'></div>

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
        <div className='hourly'>
            <CardHeader title='Hourly forecast'>
                <ScrollControl ref={listRef}/>
            </CardHeader>
            <div className='hourly__content'>
                <ul ref={listRef} className='hourly__items'>
                    {listItems}
                </ul>
                <div className='hourly__shadow'></div>
            </div>
            <div className='line-wrapper'><div className='line line_bottom'></div></div>
        </div>
    )
}