import { useSelector } from 'react-redux'

import { getWind } from '../weatherInfo/weatherInfoSlice'
import hasNullOrUndefined from '../../utils/hasNullUndefinedOrNan'

import { ReactComponent as ArrowIcon } from '../../assets/icons/arrow.svg'

import './wind.scss'


export default function MoonPhase() {
    const windData = useSelector(getWind)
    
    if(hasNullOrUndefined(windData)) return <div className='wind'></div>
    const [windSpeed, windDirection, units] = windData
    return (
        <div className='wind'>
            <h3>Wind</h3>
            <div className='wind__speed'>
                {windSpeed.toFixed(1)} <p><span>{units}</span><span>day max</span></p>
            </div>
            <div className='wind__direction'>
                <span className='wind__direction-N'>N</span>
                <span className='wind__direction-E'>E</span>
                <span className='wind__direction-S'>S</span>
                <span className='wind__direction-W'>W</span>
                <ArrowIcon style={{transform: `translate(-50%, -50%) rotate(${windDirection + 180}deg)`}} className='wind__arrow' />
            </div>
        </div>
    )
}