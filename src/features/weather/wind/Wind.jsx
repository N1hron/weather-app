import { useSelector } from 'react-redux'

import { getWind } from '../weatherSlice'
import hasNullOrUndefined from '../../../utils/hasNullUndefinedOrNan'

import WeatherCard from '../WeatherCard'
import { ReactComponent as ArrowIcon } from '../../../assets/icons/arrow.svg'

import './wind.scss'


export default function Wind({animationDelay}) {
    const data = useSelector(getWind)
    
    if(hasNullOrUndefined(data)) return (
        <WeatherCard 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1, delay: animationDelay }}
            className='wind'>
        </WeatherCard>
    )
    const [windSpeed, windDirection, units] = data
    return (
        <WeatherCard animationDelay={animationDelay} className='wind' title='Wind' subtitle='dominant'>
            <p className='wind__speed'>
                {windSpeed.toFixed(1)} <span className='wind__speed-caption'>{units}<span>day max</span></span>
            </p>
            <div className='wind__direction'>
                <span className='wind__direction-N'>N</span>
                <span className='wind__direction-E'>E</span>
                <span className='wind__direction-S'>S</span>
                <span className='wind__direction-W'>W</span>
                <ArrowIcon style={{transform: `translate(-50%, -50%) rotate(${windDirection + 180}deg)`}} className='icon wind__arrow'/>
            </div>
        </WeatherCard>
    )
}