import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchForecast, getStatus as getWeatherStatus, getGographicalCoordinates, clearDate } from './weatherSlice'

import Days from './days/Days'
import CurrentWeather from './currentWeather/CurrentWeather'
import UVIndex from './uvIndex/UVIndex'
import Wind from './wind/Wind'
import Sunrise from './twilight/Sunrise'
import Sunset from './twilight/Sunset'
import Precipitation from './precipitation/Precipitation'
import HourlyForecast from './hourlyForecast/HourlyForecast'
import WeatherMessage from './WeatherMessage'

import './weather.scss'


export default function Weather() {
    const dispatch = useDispatch()
    const {lat, lon} = useSelector(getGographicalCoordinates)
    const weatherStatus = useSelector(getWeatherStatus)
    
    useEffect(getForecast, [lat, lon])

    function getForecast() {
        if(lat && lon) {
            dispatch(clearDate())
            dispatch(fetchForecast({lat, lon}))
        }
    }
    
    if (weatherStatus !== 'success') return <WeatherMessage/>
    return(
        <div className='weather'>
            <Days/>
            <CurrentWeather animationDelay={0}/>
            <UVIndex animationDelay={0.05}/>
            <Sunrise animationDelay={0.1}/>
            <Wind animationDelay={0.15}/>
            <Sunset animationDelay={0.15}/>
            <Precipitation animationDelay={0.2}/>
            <HourlyForecast animationDelay={0.25}/>
        </div>
    )
}

