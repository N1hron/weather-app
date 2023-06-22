export default function insertZero(value) {
    if (!['string', 'number'].includes(typeof value) || isNaN(value)) return value

    const string = value.toString()
    switch (string.length) {
        case 0: return '00'
        case 1: return '0' + string
    }
    return string
}