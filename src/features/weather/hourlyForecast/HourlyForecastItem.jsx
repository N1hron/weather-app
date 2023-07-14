import { ReactComponent as TemperatureIcon } from '../../../assets/icons/thermometer.svg'
import { ReactComponent as WindIcon } from '../../../assets/icons/wind.svg'
import { ReactComponent as HumidityIcon } from '../../../assets/icons/water-drop.svg'
import { ReactComponent as PrecipitationIcon } from '../../../assets/icons/heavy-rain.svg'

export default function HourlyForecastItem({time, icon, temperature, humidity, precipitation, windSpeed}) {
    return (
        <li className='hourly__item'>
            <span className='secondary-text'>{time}</span>
            <ul>
                <li><span className='secondary-text'>{temperature}℃</span><TemperatureIcon className='icon'/></li>
                <li><span className='secondary-text'>{humidity}%</span><HumidityIcon className='icon'/></li>
                <li><span className='secondary-text'>{precipitation}%</span><PrecipitationIcon className='icon'/></li>
                <li><span className='secondary-text'>{windSpeed}m/s</span><WindIcon className='icon'/></li>
            </ul>
            {icon}
        </li>
    )
}