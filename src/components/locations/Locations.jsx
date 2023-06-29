import { useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllLocations, setCurrentLocation } from './locationsSlice'

import './locations.scss'

export default function LocationsList({inputValue, setInputValue}) {
    const nodeRef = useRef(null)
    const dispatch = useDispatch()
    const locations = useSelector(selectAllLocations)

    function onCurrentLocationChange(data) {
        dispatch(setCurrentLocation(data))
        setInputValue('')
    }

    function createListData() {
        const dataArrays = locations.map(country => country.cities.map(city => ({
            country: country.country,
            city: city,
            countryCode: country.iso3
        })))

        return dataArrays.reduce((accumulator, currArr) => [...accumulator, ...currArr], [])
    }

    function filterLocations(locations) {
        const filter = inputValue.toString().toLowerCase()
        return locations.filter(loc => loc.country.concat(loc.city).toLowerCase().includes(filter))
    }

    function createListItems() {
        return filterLocations(listData).slice(0, 50).map((data, i) => {
            const location = `${data.city}, ${data.country}`
            return <li key={i} tabIndex={0} className='locations__item' onClick={() => {onCurrentLocationChange(data)}}>{location}</li>
        })
    }

    const listData = useMemo(() => createListData(), [locations])
    const listItems = useMemo(() => createListItems(), [inputValue, listData])
    
    if(!inputValue) return
    return (
        <div ref={nodeRef} className='locations'>
            <ul className='locations__content'>
                {listItems.length ? listItems : <p className='locations__message'>No matches</p>}
            </ul>
        </div>
    )
}
