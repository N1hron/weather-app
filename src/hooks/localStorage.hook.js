import { useState, useEffect } from 'react';


export default function useLocalStorage(key, defaultValue = null) {
    const saved = localStorage.getItem(key),
          initial = (saved === null ? defaultValue : JSON.parse(saved))

    const [value, setValue] = useState(initial)

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])

    return [value, setValue]
}


