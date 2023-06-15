import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchGeographicalCoordinates } from '../locations/locationsSlice'

export default function CurrentLocation() {
    const dispatch = useDispatch()
    const locationData = useSelector(state => state.locations.currentLocation)
    const themesListOpen = useSelector(state => state.appearance.themesListOpen)

    const location = Object.keys(locationData).length ? `${locationData.city}, ${locationData.country}` : ''

    useEffect(() => {
        if(location) {
            dispatch(fetchGeographicalCoordinates({city: locationData.city, countryCode: locationData.countryCode}))
        }
    }, [location])

    const className = `
    header__current-location
    ${location ? ' header__current-location_active' : ''}
    ${themesListOpen ? ' header__current-location_short' : ''}`

    return (
        <div className={className}> 
            <p>{location}</p>
        </div>
    )
}