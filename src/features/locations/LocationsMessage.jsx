import { useSelector } from 'react-redux'

import { getStatus, getMessage } from './locationsSlice'

import StatusMessage from '../../components/message/StatusMessage'


export default function LocationsMessage() {
    const status = useSelector(getStatus),
          message = useSelector(getMessage)
    
    return <StatusMessage status={status} message={message} showIdle/>
}