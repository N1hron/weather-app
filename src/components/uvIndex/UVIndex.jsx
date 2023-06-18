import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'

import './uvIndex.scss'

export default function UVIndex() {
    const getDateInfo = createSelector(
        state => state.weatherInfo.selectedDate[0],
        state => state.weatherInfo.selectedDate[1],
        (index, date) => [index, date]
    )
    const [index] = useSelector(getDateInfo)
    const uvIndex = useSelector(state => state.weatherInfo.data.daily.uv_index_max[index])
    const description = setDescription(uvIndex)

    function setDescription(uvIndex) {
        if(uvIndex <= 2) return 'Low'
        else if(uvIndex <= 5) return 'Moderate'
        else if(uvIndex <= 7) return 'High'
        else if(uvIndex <= 10) return 'Very High'
        else return 'Extreme'
    }

    function setPointerPositionStyle(uvIndex) {
        let position = (uvIndex / 12) * 100
        if(uvIndex > 12) position = 97
        else if(uvIndex === 0) position = 3
        
        return {
            left: `${position}%`
        }
    }

    return (
        <div className='uv-index'>
            {
                uvIndex ?
                <>
                    <h3>UV Index</h3>
                    <p>{uvIndex}<span>{description}</span></p>
                    <div className='uv-index__measure'>
                        <div style={setPointerPositionStyle(uvIndex)} className='uv-index__pointer'></div>
                    </div>
                </> : null
            }
        </div>
    )
}