import { ReactComponent as CloudyIcon } from '../assets/icons/cloudy.svg'
import { ReactComponent as FogIcon } from '../assets/icons/fog.svg'
import { ReactComponent as HeavyRainIcon } from '../assets/icons/heavy-rain.svg'
import { ReactComponent as LightRainIcon } from '../assets/icons/light-rain.svg'
import { ReactComponent as SnowIcon } from '../assets/icons/snow.svg'
import { ReactComponent as SunIcon } from '../assets/icons/sun.svg'
import { ReactComponent as SunnyIcon } from '../assets/icons/sunny.svg'
import { ReactComponent as ThunderstormIcon } from '../assets/icons/thunderstorm.svg'

const data = {
    "0": {
        description: "Clear Sky",
        icon: <SunIcon/>
    },
    "1": {
        description: "Mainly Clear",
        icon: <SunIcon/>
    },
    "2": {
        description: "Partly Cloudy",
        icon: <SunnyIcon/>
    },
    "3": {
        description: "Cloudy",
        icon: <CloudyIcon/>
    },
    "45": {
        description: "Fog",
        icon: <FogIcon/>
    },
    "48": {
        description: "Rime Fog",
        icon: <FogIcon/>
    },
    "51": {
        description: "Light Drizzle",
        icon: <LightRainIcon/>
    },
    "53": {
        description: "Moderate Drizzle",
        icon: <LightRainIcon/>
    },
    "55": {
        description: "Heavy Drizzle",
        icon: <LightRainIcon/>
    },
    "56": {
        description: "Light Freezing Drizzle",
        icon: <LightRainIcon/>
    },
    "57": {
        description: "Freezing Drizzle",
        icon: <LightRainIcon/>
    },
    "61": {
        description: "Light Rain",
        icon: <LightRainIcon/>
    },
    "63": {
        description: "Moderate Rain",
        icon: <HeavyRainIcon/>
    },
    "65": {
        description: "Heavy Rain",
        icon: <HeavyRainIcon/>
    },
    "66": {
        description: "Light Freezing Rain",
        icon: <LightRainIcon/>
    },
    "67": {
        description: "Heavy Freezing Rain",
        icon: <HeavyRainIcon/>
    },
    "71": {
        description: "Light Snow",
        icon: <SnowIcon/>
    },
    "73": {
        description: "Moderate Snow",
        icon: <SnowIcon/>
    },
    "75": {
        description: "Heavy Snow",
        icon: <SnowIcon/>
    },
    "77": {
        description: "Snow Grains",
        icon: <SnowIcon/>
    },
    "80": {
        description: "Slight Rain Showers",
        icon: <HeavyRainIcon/>
    },
    "81": {
        description: "Moderate Rain Showers",
        icon: <HeavyRainIcon/>
    },
    "82": {
        description: "Heavy Rain Showers",
        icon: <HeavyRainIcon/>
    },
    "85": {
        description: "Slight Snow Showers",
        icon: <SnowIcon/>
    },
    "86": {
        description: "Heavy Snow Showers",
        icon: <SnowIcon/>
    },
    "95": {
        description: "Thunderstorm",
        icon: <ThunderstormIcon/>
    },
    "96": {
        description: "Thunderstorm With Slight Hail",
        icon: <ThunderstormIcon/>
    },
    "99": {
        description: "Thunderstorm With Heavy Hail",
        icon: <ThunderstormIcon/>
    }
  }

export default function getWeatherByWMO(code) {
    return data[code]
}