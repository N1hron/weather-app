import { useSelector } from 'react-redux'
import { getPrecipitation } from '../weatherInfo/weatherInfoSlice'
import hasNullUndefinedOrNan from '../../utils/hasNullUndefinedOrNan'

import './precipitation.scss'

export default function Precipitation() {
    const precipitationData = useSelector(getPrecipitation)
    
    if(hasNullUndefinedOrNan(precipitationData)) return <div className='precipitation'></div>
    const [hours, sum, probability] = precipitationData
    return (
        <div className='precipitation'>
            <h3>Precipitation</h3>
            <div className='precipitation__text-item'>
                {hours}<p><span>hours</span><span>/24</span></p>
            </div>
            <div className='precipitation__text-item'>
                {sum}<p><span>mm</span><span>sum</span></p>
            </div>
            <div className='precipitation__probability'>
                <h4>day probability</h4>
                <div className='precipitation__probability-container'>
                    <p>{probability}<span>%</span></p>
                    <div className='precipitation__container'>
                        <div style={{height: `${probability}%`}} className='precipitation__filling'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}