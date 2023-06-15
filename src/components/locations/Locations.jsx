import { useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { selectAllLocations, setCurrentLocation } from './locationsSlice'

import './locations.scss'

export default function LocationsList({inputValue, setInputValue}) {
    const nodeRef = useRef(null)
    const dispatch = useDispatch()
    const locations = useSelector(selectAllLocations)
    const themesListOpen = useSelector(state => state.appearance.themesListOpen)

    function createListData(locations) {
        let data = []
        const temp = locations.map(country => country.cities.map(city => ({
            country: country.country,
            city: city,
            countryCode: country.iso3
        })))
        temp.forEach(item => {data = data.concat(item)})
        return data;
    }

    function filterLocations(locations) {
        const regexp = new RegExp(inputValue, 'igm');
        return locations.filter(location => location.country.search(regexp) !== -1 || location.city.search(regexp) !== -1)
    }

    function onCurrentLocationChange(data) {
        dispatch(setCurrentLocation(data))
        setInputValue('')
    }

    function createListItems(listData) {
        return listData.slice(0, 20).map((data, i) => {
            const location = `${data.city}, ${data.country}`
            return <li key={i} tabIndex={0} className='locations__item' onClick={() => {onCurrentLocationChange(data)}}>{location}</li>
        })
    }

    const listData = useMemo(() => createListData(locations), [locations])
    const filteredListData = useMemo(() => filterLocations(listData), [inputValue, listData])
    const listItems = useMemo(() => createListItems(filteredListData), [filteredListData])

    const className = `locations${themesListOpen ? ' locations_short' : ''}`
    
    return (
        <CSSTransition nodeRef={nodeRef} in={true} appear={true} classNames='locations' timeout={100}>
            <div ref={nodeRef} className={className}>
                <ul className='locations__content'>
                    {listItems.length ? listItems : <p className='locations__message'>No matches</p>}
                </ul>
            </div>
        </CSSTransition>
    )
}
