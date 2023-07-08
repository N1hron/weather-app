import { ReactComponent as WindIcon } from '../../assets/icons/wind.svg'
import { ReactComponent as HumidityIcon } from '../../assets/icons/water-drop.svg'
import { ReactComponent as PrecipitationIcon } from '../../assets/icons/heavy-rain.svg'

export default function HourlyForecastItem({time, icon, temperature, humidity, precipitation, windSpeed}) {
    return (
        <li className='hourly__item'>
            <span>{time}</span>
            <ul>
                <li><span>{temperature}℃</span></li>
                <li><span>{humidity}%</span><HumidityIcon/></li>
                <li><span>{precipitation}%</span><PrecipitationIcon/></li>
                <li><span>{windSpeed}m/s</span><WindIcon/></li>
            </ul>
            {icon}
        </li>
    )
}