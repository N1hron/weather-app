import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { fetchGeographicalCoordinates } from '../locations/locationsSlice'

import '../../scss/animations.scss'
import './currentLocation.scss'

export default function CurrentLocation({inputValue}) {
    const dispatch = useDispatch()
    const locationData = useSelector(state => state.locations.currentLocation)
    const themesListOpen = useSelector(state => state.appearance.themesListOpen)
    const nodeRef = useRef(null)

    const location = Object.keys(locationData).length ? `${locationData.city}, ${locationData.country}` : ''

    useEffect(() => {
        if(location) {
            dispatch(fetchGeographicalCoordinates({city: locationData.city, countryCode: locationData.countryCode}))
        }
    }, [location])

    const className = `current-location${themesListOpen ? ' current-location_short' : ''}`

    if(!location || inputValue) return

    return (
        <CSSTransition nodeRef={nodeRef} in={true} appear={true} classNames='current-location' timeout={100}>
            <div ref={nodeRef} className={className}> 
                <p>{location}</p>
            </div>
        </CSSTransition>
    )
}