import { hasNullUndefinedOrNan } from '../../../utils'

import './twilight.scss'

import WeatherCard from '../WeatherCard'

export default function Twilight({data, type, animationDelay}) {
    const {hours, minutes, utcString, icon} = data

    return (
        <WeatherCard
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1, delay: animationDelay }}
            className={`twilight twilight_${type.toLowerCase()}`} 
            title={type}>

            {
                !hasNullUndefinedOrNan(data) &&
                <>
                    {icon}
                    <p>{`${hours}:${minutes}`} <span className='secondary-text'>UTC{utcString}</span></p>
                </>
            }
        </WeatherCard>
    )
}
