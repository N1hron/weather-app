import { useSelector } from 'react-redux'

import { getUVIndex } from '../weather/weatherSlice'
import hasNullOrUndefined from '../../utils/hasNullUndefinedOrNan'

import CardHeader from '../../components/cardHeader/CardHeader'

import './uvIndex.scss'


export default function UVIndex() {
    const uvIndex = useSelector(getUVIndex)

    function setDescription(uvIndex) {
        if(uvIndex <= 2) return 'Low'
        else if(uvIndex <= 5) return 'Moderate'
        else if(uvIndex <= 7) return 'High'
        else if(uvIndex <= 10) return 'Very High'
        else return 'Extreme'
    }

    function getPointerPositionStyle(uvIndex) {
        let position = (uvIndex / 12) * 100
        if(uvIndex > 12) position = 97
        else if(uvIndex === 0) position = 3
        
        return {
            left: `${position}%`
        }
    }

    if(hasNullOrUndefined(uvIndex)) return <div className='uv-index idle'></div>

    const description = setDescription(uvIndex),
          positionStyles = getPointerPositionStyle(uvIndex)

    return (
        <div className='uv-index'>
            <CardHeader 
                title='UV Index'
                subtitle='day max'
            />
            <p>{uvIndex}<span>{description}</span></p>
            <div className='uv-index__measure'>
                <div style={positionStyles} className='uv-index__pointer'></div>
            </div>
        </div>
    )
}