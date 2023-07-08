import { useMemo, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setDate, getDaysInfo } from '../weather/weatherSlice'
import getWeatherByWMO from '../../utils/getWeatherByWMO'
import getLocalDate from '../../utils/getLocalDate'

import './daysList.scss'


export default function DaysList() {
    const dispatch = useDispatch()
    const daysRef = useRef([])
    const daysInfo = useSelector(getDaysInfo)

    function createListItems({timestamps, utcOffset, weathercodes}) {
        let listItems = []
        
        for(let i = 0; i < timestamps.length; i++) {    
            const [weathercode, timestamp] = [weathercodes[i], timestamps[i]],
                  {year, month, day} = getLocalDate(timestamp, utcOffset),
                  weather = getWeatherByWMO(weathercode)  
            
            listItems = listItems.concat(
                <li key={timestamp} 
                    ref={node => {daysRef.current[i] = node}}
                    className='days-list__item' 
                    onClick={() => onDateChange([i, timestamp])}> 
                
                    <div className='days-list__shadow'></div>
                    <div className='days-list__content'>
                        <div className='days-list__description'>
                            <p>{`${year}-${month}-${day}`}</p>
                            <p>{weather.description}</p>
                        </div>
                        {weather.icon}
                    </div>
                </li>
            )
        }
        
        return listItems
    }

    function onDateChange(date) {
        dispatch(setDate(date))
        daysRef.current.forEach((node, i) => {
            date[0] === i ? node.classList.add('days-list__item_active') : node.classList.remove('days-list__item_active')
        })
    }

    const listItems = useMemo(() => createListItems(daysInfo), [daysInfo])
    return (
        <ul className='days-list'>
           {listItems}
        </ul>
    )
}