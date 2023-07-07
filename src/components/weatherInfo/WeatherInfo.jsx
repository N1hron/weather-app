import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchForecast, getStatus, getGographicalCoordinates, clearDate } from './weatherInfoSlice'
import useStatus from '../../hooks/status.hook'

import DaysList from '../daysList/DaysList'
import CurrentWeather from '../currentWeather/CurrentWeather'
import UVIndex from '../uvIndex/UVIndex'
import Wind from '../wind/Wind'
import Sunrise from '../twilight/Sunrise'
import Sunset from '../twilight/Sunset'
import Precipitation from '../precipitation/Precipitation'
import HourlyForecast from '../hourlyForecast/HourlyForecast'

import './weatherInfo.scss'


export default function WeatherInfo() {
    const dispatch = useDispatch()
    const {lat, lon} = useSelector(getGographicalCoordinates)
    const Message = useStatus(getStatus, {idle: 'Please enter your location'})
    
    useEffect(getForecast, [lat, lon])

    function getForecast() {
        if(lat && lon) {
            dispatch(clearDate())
            dispatch(fetchForecast({lat, lon}))
        }
    }
    
    if (Message) return Message
    return(
        <div className='weather'>
            <DaysList/>
            <CurrentWeather/>
            <UVIndex/>
            <Wind/>
            <Sunrise/>
            <Sunset/>
            <Precipitation/>
            <HourlyForecast/>
        </div>
    )
}

