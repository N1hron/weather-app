import { useSelector } from 'react-redux'
import getWeatherByWMO from '../../utils/getWeatherByWMO'

import './daysList.scss'

export default function DaysList() {
    const dailyForecast = useSelector(state => state.weatherInfo.data.daily)

    function createListItems(data) {
        let listItems = []
        for(let i = 0; i < data.time.length; i++) {
            const weather = getWeatherByWMO(data.weathercode[i])
            const listItem = 
            <li key={i} className='days-list__item'> 
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