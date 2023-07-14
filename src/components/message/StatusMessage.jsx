import { useState, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'

import Message from './Message'


export default function StatusMessage({status, message}) {
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

    return (
        <AnimatePresence>
            {message && isVisible && <Message type={status}>{message}</Message>}
        </AnimatePresence>
    )
}