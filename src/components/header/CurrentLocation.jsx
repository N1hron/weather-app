import { useSelector } from "react-redux"

export default function CurrentLocation() {
    const currentLocation = useSelector(state => state.locations.currentLocation)
    const themesListOpen = useSelector(state => state.appearance.themesListOpen)

    const className = `
    header__current-location
    ${currentLocation ? ' header__current-location_active' : ''}
    ${themesListOpen ? ' header__current-location_short' : ''}`

    return (
        <div className={className}> 
            <p>{currentLocation}</p>
        </div>
    )
}