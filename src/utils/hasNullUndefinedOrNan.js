const check = (value) => [null, undefined].includes(value) || Number.isNaN(value)

export default function hasNullUndefinedOrNan(value) {
    if (check(value)) return true // May return true if value is primitive

    else if (Array.isArray(value)) { // If value is Array
        for(let item of value) {
            if(check(item)) return true
        }
    }

    else if (typeof value === 'object') { // If value is Object
        for(let item of Object.values(value)) {
            if(check(item)) return true
        }
    }

    return false
}
 