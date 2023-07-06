import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getHourlyForecast } from '../weatherInfo/weatherInfoSlice';

import hasNullUndefinedOrNan from '../../utils/hasNullUndefinedOrNan';
import getLocalDate from '../../utils/getLocalDate';
import getWeatherByWMO from '../../utils/getWeatherByWMO';

import CardHeader from '../cardHeader/CardHeader'
import HourlyForecastItem from './HourlyForecastItem'

import './hourlyForecast.scss'


export default function HourlyForecast() {
    const data = useSelector(getHourlyForecast)

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
                        temperature={temperature[i]} 
                        humidity={humidity[i]} 
                        precipitation={precipitation[i]} 
                        windSpeed={windSpeed[i]}
                    />
        })
    }

    const listItems = useMemo(createListItems, [data])
    return (
        <div className='hourly'>
            <CardHeader title='Hourly forecast'/>
            <div className='hourly__content'>
                <ul className='hourly__items'>
                    {listItems}
                </ul>
                <div className='hourly__shadow'></div>
            </div>
            <div className='line-wrapper'><div className='line line_bottom'></div></div>
        </div>
    )
}