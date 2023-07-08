import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import Message from './Message'


export default function StatusMessage({selector, showIdle = false, minified = false, idle, failure, loading, success}) {
    const [isVisible, setIsVisible] = useState(true)
    const status = useSelector(selector)
    const timerId = useRef(null)
    
    useEffect(() => {
        setIsVisible(true)

        if (status === 'success') {
            timerId.current = setTimeout(() => setIsVisible(false), 3000)
        }

        return () => {
            clearTimeout(timerId.current)
        }
    }, [status])

    function setMessage() {
        switch (status) {
            case 'idle':
                return showIdle ? {type: 'info', description: idle || 'Nothing is happening...'} : null
            case 'failure':
                return {type: 'error', description: failure || 'An error occured!'}
            case 'loading':
                return {type: 'loading', description: loading || 'Loading...'}
            case 'success':
                return {type: 'success', description: success || 'Success!'}
            default:
                return null
        }
    }

    const message = setMessage()
    return message && isVisible && <Message minified={minified} type={message.type}>{message.description}</Message>
}