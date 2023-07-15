import { useSelector } from 'react-redux'

import { getUVIndex } from '../weatherSlice'

import WeatherCard from '../WeatherCard'

import './uvIndex.scss'


export default function UVIndex({animationDelay}) {
    const uvIndex = useSelector(getUVIndex)

    function setDescription() {
        if(uvIndex <= 2) return 'Low'
        else if(uvIndex <= 5) return 'Moderate'
        else if(uvIndex <= 7) return 'High'
        else if(uvIndex <= 10) return 'Very High'
        else return 'Extreme'
    }

    function getPointerPositionStyle() {
        let position = (uvIndex / 12) * 100
        if(uvIndex > 12) position = 97
        else if(uvIndex === 0) position = 3
        
        return {
            left: `${position}%`
        }
    }

    const description = setDescription(),
          positionStyles = getPointerPositionStyle()

    return (
        <WeatherCard 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.1, delay: 0.05 }}
            className='uv-index' 
            title='UV Index' 
            subtitle='day max'>

            {
                uvIndex &&
                <>
                    <p>{uvIndex}<span>{description}</span></p>
                    <div className='uv-index__measure'>
                        <div style={positionStyles} className='uv-index__pointer'></div>
                    </div>
                </>
            }
        </WeatherCard>
    )
}