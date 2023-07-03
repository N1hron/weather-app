const check = (value) => [null, undefined].includes(value) || Number.isNaN(value)

export default function hasNullUndefinedOrNan(value, shallow = true) {
    // May return true if value is primitive:
    if (check(value)) return true 

    // If value is Array then check every value:
    else if (Array.isArray(value)) { 
        for(let item of value) {
            if (hasNullUndefinedOrNan(item) && !shallow) return true
            else if(check(item)) return true
        }
    }

    // If value is Object then check every value:
    else if (typeof value === 'object') { 
        for(let item of Object.values(value)) {
            if (hasNullUndefinedOrNan(item) && !shallow) return true
            else if(check(item)) return true
        }
    }

    return false
}

