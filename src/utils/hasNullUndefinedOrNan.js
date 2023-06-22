export default function hasNullUndefinedOrNan(value) {

    if ([null, undefined].includes(value) || Number.isNaN(value)) return true

    else if (Array.isArray(value)) {
        for(let i of value) if([null, undefined].includes(i) || Number.isNaN(i)) return true
    } 

    else if (typeof value === 'object') {
        for(let i of Object.values(value)) if([null, undefined].includes(i) || Number.isNaN(i)) return true
    }

    return false
}
