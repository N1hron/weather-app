import { useSelector } from 'react-redux'

import './weatherInfo.scss'

export default function WeatherInfo() {
    const currentLocation = useSelector(state => state.locations.currentLocation)
    
    return (
        <div className='weather'>
            
        </div>
    )
}