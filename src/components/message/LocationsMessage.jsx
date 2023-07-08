import { getStatus } from '../../features/locations/locationsSlice'

import StatusMessage from './StatusMessage'


export default function LocationsMessage() {
    const data = {
        idle: 'Please select location',
        loading: 'Receiving coorginates...',
        failure: 'An error occurred while receiving coorginates',
        success: 'Coordinates received successfully'
    }
    
    return <StatusMessage selector={getStatus} {...data} showIdle minified/>
}