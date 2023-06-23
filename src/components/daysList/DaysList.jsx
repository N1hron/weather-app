import { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setDate, getSelectedDate, getDaysInfo } from '../weatherInfo/weatherInfoSlice'
import getWeatherByWMO from '../../utils/getWeatherByWMO'
import getLocalDate from '../../utils/getLocalDate'

import './daysList.scss'

export default function DaysList() {
    const dispatch = useDispatch()
    const daysInfo = useSelector(getDaysInfo)
    const selectedDate = useSelector(getSelectedDate)

    function createListItems({timestamps, utcOffset, weathercodes}) {
        let listItems = []
        
        for(let i = 0; i < timestamps.length; i++) {    
            const [weathercode, timestamp] = [weathercodes[i], timestamps[i]]     

            const weather = getWeatherByWMO(weathercode),
                  {year, month, day} = getLocalDate(timestamp, utcOffset)

            const isActive = selectedDate[1] === timestamp
            
            const listItem = 
            <li key={timestamp} className={`days-list__item${isActive ? ' days-list__item_active' : ''}`} onClickCapture={() => onDateChange([i, timestamp])}> 
                <div className='days-list__hover-shadow'></div>
                <div className='days-list__content'>
                    <div className='days-list__description'>
                        <p>{`${year}-${month}-${day}`}</p>
                        <p>{weather.description}</p>
                    </div>
                    {weather.icon}
                </div>
            </li>

            listItems = listItems.concat(listItem)
        }
        
        return listItems
    }

    function onDateChange(date) {
        dispatch(setDate(date))
    }

    const listItems = useMemo(() => createListItems(daysInfo), [daysInfo, selectedDate]) // SOLVE THIS LATER
    return (
        <ul className='days-list'>
           {listItems}
        </ul>
    )
}