import { useSelector } from 'react-redux'

import { getPrecipitation } from '../weatherSlice'
import hasNullUndefinedOrNan from '../../../utils/hasNullUndefinedOrNan'

import WeatherCard from '../WeatherCard'

import './precipitation.scss'


export default function Precipitation({animationDelay}) {
    const precipitationData = useSelector(getPrecipitation)
    
    if(hasNullUndefinedOrNan(precipitationData)) return (
        <WeatherCard 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1, delay: animationDelay }}
            className='precipitation'>
        </WeatherCard>
    )
    const [hours, sum, probability] = precipitationData
    return (
        <WeatherCard 
            animationDelay={animationDelay}
            className='precipitation' 
            title='Precipitation' 
            subtitle='day probability'>

            <p>{hours} <span className='secondary-text precipitation__caption'><span>hours</span><span>/24</span></span></p>
            <p>{sum}<span className='secondary-text precipitation__caption'><span>mm</span><span>sum</span></span></p>
            <div className='precipitation__probability'>
                <p>{probability}<span className='secondary-text precipitation__caption'><span>%</span><span>mean</span></span></p>

                <div className='precipitation__tank'>
                    <div style={{height: `${probability}%`}} className='precipitation__filling'></div>
                </div>
            </div>
        </WeatherCard>
    )
}