import { useSelector } from 'react-redux'

import { getStatus, getMessage } from './weatherSlice'

import StatusMessage from '../../components/message/StatusMessage'


export default function WeatherMessage() {
    const status = useSelector(getStatus),
          message = useSelector(getMessage)
    
    return <StatusMessage absolute status={status} message={message}/>
}