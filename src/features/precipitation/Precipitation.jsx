import { useSelector } from 'react-redux'

import { getPrecipitation } from '../weather/weatherSlice'
import hasNullUndefinedOrNan from '../../utils/hasNullUndefinedOrNan'

import CardHeader from '../../components/cardHeader/CardHeader'

import './precipitation.scss'


export default function Precipitation() {
    const precipitationData = useSelector(getPrecipitation)
    
    if(hasNullUndefinedOrNan(precipitationData)) return <div className='precipitation idle'></div>
    const [hours, sum, probability] = precipitationData
    return (
        <div className='precipitation'>
            <CardHeader title='Precipitation'/>
            <div className='precipitation__text-item'>
                {hours}<p><span>hours</span><span>/24</span></p>
            </div>
            <div className='precipitation__text-item'>
                {sum}<p><span>mm</span><span>sum</span></p>
            </div>
            <div className='precipitation__probability'>
                <span className='precipitation__probability-title'>day probability</span>
                <div className='precipitation__probability-container'>
                    <div className='precipitation__text-item'>
                        {probability}<p><span>%</span><span>mean</span></p>
                    </div>  
                    <div className='precipitation__container'>
                        <div style={{height: `${probability}%`}} className='precipitation__filling'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}