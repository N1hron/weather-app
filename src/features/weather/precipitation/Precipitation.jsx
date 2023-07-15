import { useSelector } from 'react-redux'

import { getPrecipitation } from '../weatherSlice'
import { hasNullUndefinedOrNan } from '../../../utils'

import WeatherCard from '../WeatherCard'

import './precipitation.scss'


export default function Precipitation() {
    const data = useSelector(getPrecipitation)
    
    const [hours, sum, probability] = data
    return (
        <WeatherCard 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1, delay: 0.2 }}
            className='precipitation' 
            title='Precipitation' 
            subtitle='day probability'>

            {
                !hasNullUndefinedOrNan(data) &&
                <>
                    <p>{hours} <span className='secondary-text precipitation__caption'><span>hours</span><span>/24</span></span></p>
                    <p>{sum}<span className='secondary-text precipitation__caption'><span>mm</span><span>sum</span></span></p>
                    <div className='precipitation__probability'>
                        <p>{probability}<span className='secondary-text precipitation__caption'><span>%</span><span>mean</span></span></p>

                        <div className='precipitation__tank'>
                            <div style={{height: `${probability}%`}} className='precipitation__filling'></div>
                        </div>
                    </div>
                </>
            }
        </WeatherCard>
    )
}