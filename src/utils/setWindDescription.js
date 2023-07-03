export default function setWindDescription(value) { // m/s
    if (value >= 33) return 'Hurricane force'
    else if (value >= 28) return 'Violent storm'
    else if (value >= 24) return 'Storm whole gale'
    else if (value >= 21) return 'Severe gale'
    else if (value >= 17) return 'Gale'
    else if (value >= 14) return 'Near gale'
    else if (value >= 11) return 'Strong breeze'
    else if (value >= 8) return 'Fresh breeze'
    else if (value >= 5) return 'Moderate breeze'
    else if (value >= 2) return 'Gentle breeze'
    else if (value > 0) return 'Light air'
    else return 'Calm'
}