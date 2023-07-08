import { createPortal } from 'react-dom'
import ReactLoading from 'react-loading'

import { ReactComponent as ErrorIcon } from '../../assets/icons/error.svg'
import { ReactComponent as InfoIcon } from '../../assets/icons/info.svg'
import { ReactComponent as SuccessIcon } from '../../assets/icons/success.svg'

import './message.scss'


export default function Message({children, type, minified = false}) {
    function setIcon() {
        switch(type) {
            case 'loading':
                return <ReactLoading height={50} width={50} type='spin' color='var(--icon-color)'/>
            case 'error':
                return <ErrorIcon/>
            case 'success':
                return <SuccessIcon/>
            default: 
                return <InfoIcon/>
        }
    }

    const icon = setIcon()
    return (
        <div className={minified ? 'message message_minified' : 'message'}>
            {icon}
            {children}
        </div>
    )
}