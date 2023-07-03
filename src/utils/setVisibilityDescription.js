export default function setVisibilityDescription(value) { // meters
    if (value > 20000) return 'Very clear'
    else if (value > 10000) return 'Clear'
    else if (value > 4000) return 'Light haze'
    else if (value > 1000) return 'Light fog'
    else if (value > 200) return 'Moderate fog'
    else if (value > 50) return 'Thick fog'
    else return 'Dense fog'
}