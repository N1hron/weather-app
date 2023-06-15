import { useSelector } from "react-redux"

export default function CurrentLocation() {
    const locationData = useSelector(state => state.locations.currentLocation)
    const themesListOpen = useSelector(state => state.appearance.themesListOpen)

    const location = Object.keys(locationData).length ? `${locationData.city}, ${locationData.country}` : ''

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