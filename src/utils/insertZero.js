export default function insertZero(value) {
    if(!['string', 'number', 'bigint'].includes(typeof value) || Number.isNaN(value)) return value

    const string = value.toString().trim()

    switch (string.length) {
        case 0: return '00'
        case 1: return '0' + string
    }
    
    return string
}