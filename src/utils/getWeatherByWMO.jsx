import { wmoCodes } from '../data'

export default function getWeatherByWMO(code) {
    return wmoCodes[code]
}