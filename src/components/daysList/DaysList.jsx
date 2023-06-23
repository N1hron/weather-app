import { useSelector, useDispatch } from 'react-redux'
import { setDate, getSelectedDate, getDailyForecast } from '../weatherInfo/weatherInfoSlice'
import getWeatherByWMO from '../../utils/getWeatherByWMO'
import getDateInfoByTimestamp from '../../utils/getDateInfoByTimestamp'

import './daysList.scss'

export default function DaysList() {
    const dispatch = useDispatch()
    const dailyForecast = useSelector(getDailyForecast)
    const selectedDate = useSelector(getSelectedDate)

    function createListItems(data) {
        let listItems = []
        
        for(let i = 0; i < data.time.length; i++) { 

            const timestamp = data.time[i],
                  weather = getWeatherByWMO(data.weathercode[i]),
                  {year, month, day} = getDateInfoByTimestamp(timestamp)

            const dateInfo = [i, timestamp]

            const isActive = selectedDate[1] === data.time[i]
            
            const listItem = 
            <li key={i} className={`days-list__item${isActive ? ' days-list__item_active' : ''}`} onClick={() => onDateChange(dateInfo)}> 
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

    const listItems = createListItems(dailyForecast)

    return (
        <ul className='days-list'>
           {listItems}
        </ul>
    )
}