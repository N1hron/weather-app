import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchGeographicalCoordinates, getCurrentLocation } from '../locations/locationsSlice'

import './currentLocation.scss'

export default function CurrentLocation({inputValue}) {
    const nodeRef = useRef(null)
    const dispatch = useDispatch()
    const currentLocation = useSelector(getCurrentLocation)

    const {city, country, countryCode} = currentLocation
    
    useEffect(getGeographicalCoordinates, [city, countryCode])

    function getGeographicalCoordinates() {
        if(city && countryCode) dispatch(fetchGeographicalCoordinates({city, countryCode}))
    }

    const title = Object.keys(currentLocation).length ? `${city}, ${country}` : ''

    if(!title || inputValue) return
    return (
        <div ref={nodeRef} className='current-location'> 
            <h2>{title}</h2>
        </div>
    )
}