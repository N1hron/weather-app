import { getStatus } from '../../features/weather/weatherSlice'

import StatusMessage from './StatusMessage'


export default function WeatherMessage() {
    const data = {
        loading: 'Loading weather...',
        failure: 'An error occurred while receiving weather',
        success: 'Weather received successfully'
    }
    
    return <StatusMessage selector={getStatus} {...data}/>
}