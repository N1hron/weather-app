import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { getIsThemesListOpen } from '../../appearanceSlice'
import { fetchGeographicalCoordinates, getCurrentLocation } from '../locations/locationsSlice'

import '../../scss/animations.scss'
import './currentLocation.scss'

export default function CurrentLocation({inputValue}) {
    const nodeRef = useRef(null)
    const dispatch = useDispatch()
    const currentLocation = useSelector(getCurrentLocation)
    const isThemesListOpen = useSelector(getIsThemesListOpen)

    const {city, country, countryCode} = currentLocation
    
    useEffect(getGeographicalCoordinates, [city, countryCode])

    function getGeographicalCoordinates() {
        if(city && countryCode) dispatch(fetchGeographicalCoordinates({city, countryCode}))
    }

    const className = `current-location${isThemesListOpen ? ' current-location_short' : ''}`
    const title = Object.keys(currentLocation).length ? `${city}, ${country}` : ''

    if(!title || inputValue) return
    return (
        <CSSTransition nodeRef={nodeRef} in={true} appear={true} classNames='current-location' timeout={100}>
            <div ref={nodeRef} className={className}> 
                <h2>{title}</h2>
            </div>
        </CSSTransition>
    )
}