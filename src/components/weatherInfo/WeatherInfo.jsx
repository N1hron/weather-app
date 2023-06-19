import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchForecast, getStatus, getGographicalCoordinates, clearDate } from './weatherInfoSlice'

import DaysList from '../daysList/DaysList'
import CurrentWeather from '../currentWeather/CurrentWeather'
import Sunrise from '../sunrise/Sunrise'
import Sunset from '../sunset/Sunset'
import HourlyForecast from '../hourlyForecast/HourlyForecast'
import UVIndex from '../uvIndex/UVIndex'
import MoonPhase from '../moonPhase/MoonPhase'

import './weatherInfo.scss'

export default function WeatherInfo() {
    const dispatch = useDispatch()
    const {lat, lon} = useSelector(getGographicalCoordinates)
    const status = useSelector(getStatus)
    
    useEffect(getForecast, [lat, lon])

    function getForecast() {
        if(lat && lon) {
            dispatch(clearDate())
            dispatch(fetchForecast({lat, lon}))
        }
    }
    
    if(status !== 'success') return
    return (
        <div className='weather'>
            <DaysList/>
            <CurrentWeather/>
            <UVIndex/>
            <MoonPhase/>
            <Sunrise/>
            <Sunset/>
            <HourlyForecast/>
        </div>
    )
}

