export default function setHumidityDescription(value) { // %
    if (value > 60) return 'High'
    else if (value < 40) return 'Low'
    else return 'Optimal'
}