import { useState, useEffect } from 'react';


export default function useLocalStorage(key, defaultValue = null) {
    const saved = tryToParseJSON(localStorage.getItem(key), defaultValue),
          initial = (saved === null ? defaultValue : saved)
    
    const [value, setValue] = useState(initial)

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [value])

    return [value, setValue]
}

function tryToParseJSON(json, defaultValue) {
    try {
        return JSON.parse(json)
    } catch(e) {
        return defaultValue
    }
}


