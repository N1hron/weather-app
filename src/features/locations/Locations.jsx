import { useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'

import { selectAllLocations, setCurrentLocation } from './locationsSlice'

import ScrollControl from '../../components/scrollControl/ScrollControl'

import './locations.scss'


export default function LocationsList({inputValue, setInputValue}) {
    const dispatch = useDispatch()
    const listRef = useRef(null)
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

    const listData = useMemo(createListData, [locations])
    const listItems = useMemo(createListItems, [inputValue, listData])
    
    if(!inputValue) return
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.5 }} 
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{duration: 0.1}}
            className='locations'>

            <ul ref={listRef} className='locations__content'>
                {listItems.length ? listItems : <p className='locations__message'>No matches</p>}
            </ul>
            {listItems.length ? <ScrollControl ref={listRef} step={200}/> : null}
        </motion.div>
    )
}
