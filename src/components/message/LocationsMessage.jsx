import { useSelector } from 'react-redux'

import { getStatus, getMessage } from '../../features/locations/locationsSlice'

import StatusMessage from './StatusMessage'


export default function LocationsMessage() {
    const status = useSelector(getStatus),
          message = useSelector(getMessage)
    
    return <StatusMessage status={status} message={message} showIdle/>
}