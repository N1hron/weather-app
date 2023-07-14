import { useSelector } from 'react-redux'

import { getUVIndex } from '../weatherSlice'
import hasNullOrUndefined from '../../../utils/hasNullUndefinedOrNan'

import WeatherCard from '../WeatherCard'

import './uvIndex.scss'


export default function UVIndex({animationDelay}) {
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

    if(hasNullOrUndefined(uvIndex)) return (
        <WeatherCard 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1, delay: animationDelay }}
            className='uv-index'>
        </WeatherCard>
    )

    const description = setDescription(uvIndex),
          positionStyles = getPointerPositionStyle(uvIndex)

    return (
        <WeatherCard 
            animationDelay={animationDelay}
            className='uv-index' 
            title='UV Index' 
            subtitle='day max'>

            <p>{uvIndex}<span>{description}</span></p>
            <div className='uv-index__measure'>
                <div style={positionStyles} className='uv-index__pointer'></div>
            </div>
        </WeatherCard>
    )
}