import { useSelector, useDispatch } from 'react-redux'
import { setDate } from '../weatherInfo/weatherInfoSlice'
import getWeatherByWMO from '../../utils/getWeatherByWMO'

import './daysList.scss'

export default function DaysList() {
    const dispatch = useDispatch()
    const dailyForecast = useSelector(state => state.weatherInfo.data.daily)
    const selectedDate = useSelector(state => state.weatherInfo.selectedDate)

    function createListItems(data) {
        let listItems = []
        for(let i = 0; i < data.time.length; i++) { 
            const weather = getWeatherByWMO(data.weathercode[i])
            const isActive = selectedDate === data.time[i]
            const listItem = 
            <li key={i} className={`days-list__item${isActive ? ' days-list__item_active' : ''}`} onClick={() => dispatch(setDate(data.time[i]))}> 
                <div className="days-list__hover-shadow"></div>
                <div className="days-list__content">
                    <div className='days-list__description'>
                        <p>{data.time[i].split('T')[0]}</p>
                        <p>{weather.description}</p>
                    </div>
                    {weather.icon}
                </div>
            </li>
            listItems = listItems.concat(listItem)
        }
        
        return listItems
    }

    const listItems = createListItems(dailyForecast)

    return (
        <ul className='days-list'>
           {listItems}
        </ul>
    )
}