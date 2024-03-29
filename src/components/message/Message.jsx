import { ReactComponent as ErrorIcon } from '../../assets/icons/error.svg'
import { ReactComponent as InfoIcon } from '../../assets/icons/info.svg'
import { ReactComponent as SuccessIcon } from '../../assets/icons/success.svg'
import { ReactComponent as SpinnerIcon } from '../../assets/icons/spinner.svg'

import './message.scss'


export default function Message({children, type, absolute = false}) {
    function setIcon() {
        switch(type) {
            case 'loading':
                return <SpinnerIcon className='icon icon_spinner'/>
            case 'error':
                return <ErrorIcon className='icon'/>
            case 'success':
                return <SuccessIcon className='icon'/>
            default: 
                return <InfoIcon className='icon icon_info'/>
        }
    }

    const icon = setIcon()
    return (
        <div className={'message' + (absolute ? ' message_absolute' : '')}>
            {icon}
            {children}
        </div>
    )
}