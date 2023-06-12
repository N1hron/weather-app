import { useEffect, forwardRef, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLocations, selectAllLocations, setCurrentLocation } from './locationsSlice'

import './locationsList.scss';

const LocationsList = forwardRef(function LocationsList({inputValue, setInputValue}, ref) {
    const dispatch = useDispatch()
    const locations = useSelector(selectAllLocations)
    const themesListOpen = useSelector(state => state.appearance.themesListOpen)
    const listData = useMemo(() => createListData(locations), [locations])

    useEffect(() => {
        dispatch(fetchLocations())
    }, [])

    function createListData(locations) {
        let data = []
        const temp = locations.map(country => country.cities.map(city => `${country.country}, ${city}`))
        temp.forEach(item => {data = data.concat(item)})
        return data;
    }

    function filterLocations(locations) {
        const regexp = new RegExp(inputValue, 'igm');
        return locations.filter(location => location.search(regexp) !== -1)
    }

    function onCurrentLocationChange(data) {
        dispatch(setCurrentLocation(data))
        setInputValue('')
    }

    function createListItems() {
        if(listData || listData.length) {
            const filteredListData = filterLocations(listData)
            return filteredListData.slice(0, 20).map((data, i) => {
                return <li key={i} tabIndex={0} className='locations__item' onClick={() => {onCurrentLocationChange(data)}}>{data}</li>
            })
        }
    }

    const listItems = useMemo(createListItems, [listData, inputValue]);

    const className = `locations${inputValue ? ' locations_active' : ''}${themesListOpen ? ' locations_short' : ''}`
    return (
        <div ref={ref} className={className}>
            <ul className='locations__content'>
                {listItems.length ? listItems : <p className='locations__message'>No matches</p>}
            </ul>
        </div>
    )
})

export default LocationsList;
