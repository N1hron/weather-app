import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchGeographicalCoordinates, getCurrentLocation } from '../locations/locationsSlice'

import './currentLocation.scss'


export default function CurrentLocation({inputValue}) {
    const dispatch = useDispatch()
    const currentLocation = useSelector(getCurrentLocation)

    const {city, country, countryCode} = currentLocation
    
    useEffect(() => {
        if(city && countryCode) dispatch(fetchGeographicalCoordinates({city, countryCode}))
        // eslint-disable-next-line
    }, [city, countryCode])

    const title = (city && country) ? `${city}, ${country}` : ''

    if(!title || inputValue) return
    return (
        <div className='current-location'> 
            <h2>{title}</h2>
        </div>
    )
}