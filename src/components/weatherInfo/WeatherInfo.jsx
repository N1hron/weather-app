import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { fetchForecast } from './weatherInfoSlice'
import DaysList from '../daysList/DaysList'

import './weatherInfo.scss'

export default function WeatherInfo() {
    const dispatch = useDispatch()
    const getGeographicalCoordinates = createSelector(
        state => state.locations.geographicalCoordinates.lat,
        state => state.locations.geographicalCoordinates.lon,
        (lat, lon) => {
            return {lat, lon}
        }
    )
    const {lat, lon} = useSelector(getGeographicalCoordinates)
    const status = useSelector(state => state.weatherInfo.status)
    
    useEffect(() => {
        if(lat && lon) {
            dispatch(fetchForecast({lat, lon}))
        }
    }, [lat, lon])
    
    return (
        <div className='weather'>
            {status === 'success' ? <DaysList/> : null}
        </div>
    )
}