import { useSelector } from 'react-redux'
import ReactLoading from 'react-loading'

import Message from '../components/message/Message'
import { ReactComponent as ErrorIcon } from '../assets/icons/error.svg'
import { ReactComponent as InfoIcon } from '../assets/icons/info.svg'

export default function useStatus(selector, {error, loading, idle}) {
    const status = useSelector(selector)

    function render() {
        switch(status) {
            case 'idle': {
                return <Message><InfoIcon/>{idle || 'Idle'}</Message>
            }
            case 'loading':
                return <Message><ReactLoading height={50} width={50} type='spin' color='var(--icon-color)'/> {loading || 'Loading...'}</Message>
            case 'error':
                return <Message><ErrorIcon/> {error || 'An error occured'}</Message>
            default:
                return null
        }
    }
    return render()
}