import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import Message from './Message'


export default function StatusMessage({status, message, showIdle = false, minified = false}) {
    const [isVisible, setIsVisible] = useState(true)
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

    return message && isVisible && <Message minified={minified} type={status}>{message}</Message>
}