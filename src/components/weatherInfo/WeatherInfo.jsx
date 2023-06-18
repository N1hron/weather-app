import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchForecast } from './weatherInfoSlice'
import { clearDate } from './weatherInfoSlice'

import DaysList from '../daysList/DaysList'
import DayOverall from '../dayOverall/DayOverall'
import Sunrise from '../sunrise/Sunrise'
import HourlyForecast from '../hourlyForecast/HourlyForecast'
import UVIndex from '../uvIndex/UVIndex'
import MoonPhase from '../moonPhase/MoonPhase'

import './weatherInfo.scss'

export default function WeatherInfo() {
    console.log('render')
    const dispatch = useDispatch()
    const {lat, lon} = useSelector(state => state.locations.geographicalCoordinates)
    const status = useSelector(state => state.weatherInfo.status)
    
    useEffect(() => {
        if(lat && lon) {
            dispatch(clearDate())
            dispatch(fetchForecast({lat, lon}))
        }
    }, [lat, lon])
    
    if(status !== 'success') return
    return (
        <div className='weather'>
            <DaysList/>
            <DayOverall/>
            <UVIndex/>
            <MoonPhase/>
            <Sunrise/>
            <HourlyForecast/>
        </div>
    )
}

