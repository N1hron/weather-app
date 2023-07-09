import { useSelector } from 'react-redux'

import { getStatus, getMessage } from '../../features/weather/weatherSlice'

import StatusMessage from './StatusMessage'


export default function WeatherMessage() {
    const status = useSelector(getStatus),
          message = useSelector(getMessage)
    
    return <StatusMessage status={status} message={message}/>
}