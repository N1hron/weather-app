import { ReactComponent as CloudyIcon } from '../assets/icons/cloudy.svg'
import { ReactComponent as FogIcon } from '../assets/icons/fog.svg'
import { ReactComponent as HeavyRainIcon } from '../assets/icons/heavy-rain.svg'
import { ReactComponent as LightRainIcon } from '../assets/icons/light-rain.svg'
import { ReactComponent as SnowIcon } from '../assets/icons/snow.svg'
import { ReactComponent as SunIcon } from '../assets/icons/sun.svg'
import { ReactComponent as SunnyIcon } from '../assets/icons/sunny.svg'
import { ReactComponent as ThunderstormIcon } from '../assets/icons/thunderstorm.svg'


export const wmoCodes = {
    '0': {
        description: 'Clear Sky',
        icon: <SunIcon className='icon'/>,
        coloredIcon: <SunIcon className='icon icon_sun-colored'/>
    },
    '1': {
        description: 'Mainly Clear',
        icon: <SunIcon className='icon'/>,
        coloredIcon: <SunIcon className='icon icon_sun-colored'/>
    },
    '2': {
        description: 'Partly Cloudy',
        icon: <SunnyIcon className='icon'/>,
        coloredIcon: <SunnyIcon className='icon icon_sunny-colored'/>
    },
    '3': {
        description: 'Cloudy',
        icon: <CloudyIcon className='icon'/>,
        coloredIcon: <CloudyIcon className='icon icon_cloudy-colored'/>
    },
    '45': {
        description: 'Fog',
        icon: <FogIcon className='icon'/>,
        coloredIcon: <FogIcon className='icon icon_fog-colored'/>
    },
    '48': {
        description: 'Rime Fog',
        icon: <FogIcon className='icon'/>,
        coloredIcon: <FogIcon className='icon icon_fog-colored'/>
    },
    '51': {
        description: 'Light Drizzle',
        icon: <LightRainIcon className='icon'/>,
        coloredIcon: <LightRainIcon className='icon icon_light-rain-colored'/>
    },
    '53': {
        description: 'Moderate Drizzle',
        icon: <LightRainIcon className='icon'/>,
        coloredIcon: <LightRainIcon className='icon icon_light-rain-colored'/>
    },
    '55': {
        description: 'Heavy Drizzle',
        icon: <LightRainIcon className='icon'/>,
        coloredIcon: <LightRainIcon className='icon icon_light-rain-colored'/>
    },
    '56': {
        description: 'Light Freezing Drizzle',
        icon: <LightRainIcon className='icon'/>,
        coloredIcon: <LightRainIcon className='icon icon_light-rain-colored'/>
    },
    '57': {
        description: 'Freezing Drizzle',
        icon: <LightRainIcon className='icon'/>,
        coloredIcon: <LightRainIcon className='icon icon_light-rain-colored'/>
    },
    '61': {
        description: 'Light Rain',
        icon: <LightRainIcon className='icon'/>,
        coloredIcon: <LightRainIcon className='icon icon_light-rain-colored'/>
    },
    '63': {
        description: 'Moderate Rain',
        icon: <HeavyRainIcon className='icon'/>,
        coloredIcon: <HeavyRainIcon className='icon icon_heavy-rain-colored'/>
    },
    '65': {
        description: 'Heavy Rain',
        icon: <HeavyRainIcon className='icon'/>,
        coloredIcon: <HeavyRainIcon className='icon icon_heavy-rain-colored'/>
    },
    '66': {
        description: 'Light Freezing Rain',
        icon: <LightRainIcon className='icon'/>,
        coloredIcon: <LightRainIcon className='icon icon_light-rain-colored'/>
    },
    '67': {
        description: 'Heavy Freezing Rain',
        icon: <HeavyRainIcon className='icon'/>,
        coloredIcon: <HeavyRainIcon className='icon icon_heavy-rain-colored'/>
    },
    '71': {
        description: 'Light Snow',
        icon: <SnowIcon className='icon'/>,
        coloredIcon: <SnowIcon className='icon icon_snow-colored'/>
    },
    '73': {
        description: 'Moderate Snow',
        icon: <SnowIcon className='icon'/>,
        coloredIcon: <SnowIcon className='icon icon_snow-colored'/>
    },
    '75': {
        description: 'Heavy Snow',
        icon: <SnowIcon className='icon'/>,
        coloredIcon: <SnowIcon className='icon icon_snow-colored'/>
    },
    '77': {
        description: 'Snow Grains',
        icon: <SnowIcon className='icon'/>,
        coloredIcon: <SnowIcon className='icon icon_snow-colored'/>
    },
    '80': {
        description: 'Slight Rain Showers',
        icon: <HeavyRainIcon className='icon'/>,
        coloredIcon: <HeavyRainIcon className='icon icon_heavy-rain-colored'/>
    },
    '81': {
        description: 'Moderate Rain Showers',
        icon: <HeavyRainIcon className='icon'/>,
        coloredIcon: <HeavyRainIcon className='icon icon_heavy-rain-colored'/>
    },
    '82': {
        description: 'Heavy Rain Showers',
        icon: <HeavyRainIcon className='icon'/>,
        coloredIcon: <HeavyRainIcon className='icon icon_heavy-rain-colored'/>
    },
    '85': {
        description: 'Slight Snow Showers',
        icon: <SnowIcon className='icon'/>,
        coloredIcon: <SnowIcon className='icon icon_snow-colored'/>
    },
    '86': {
        description: 'Heavy Snow Showers',
        icon: <SnowIcon className='icon'/>,
        coloredIcon: <SnowIcon className='icon icon_snow-colored'/>
    },
    '95': {
        description: 'Thunderstorm',
        icon: <ThunderstormIcon className='icon'/>,
        coloredIcon: <ThunderstormIcon className='icon icon_thunder-colored'/>
    },
    '96': {
        description: 'Thunderstorm With Slight Hail',
        icon: <ThunderstormIcon className='icon'/>,
        coloredIcon: <ThunderstormIcon className='icon icon_thunder-colored'/>
    },
    '99': {
        description: 'Thunderstorm With Heavy Hail',
        icon: <ThunderstormIcon className='icon'/>,
        coloredIcon: <ThunderstormIcon className='icon icon_thunder-colored'/>
    }
}

export const themes = {
    'light': {
        mainColor: '#fafafa',
        secondaryColor: '#e4e5f1',
        additionalColor: '#484b6a',
        additionalColorHover: '#424561',
        additionalColorActive: '#3b3d56',
        smallCardBgColor: 'rgba($color: #e4e5f1, $alpha: 0.5)',
        borderColor: '#484b6a',
        fontSecondaryColor: '#FFFFFF',
        fontMainColor: '#484b6a',
        iconColor: '#484b6a'
    },
    'dark': {
        mainColor: '#1F2025',
        secondaryColor: '#292a31',
        additionalColor: '#adadad',
        additionalColorHover: '#888888',
        additionalColorActive: '#757575',
        smallCardBgColor: 'rgba($color: #adadad, $alpha: 0.5)',
        borderColor: '#adadad',
        fontMainColor: '#dadada',
        fontSecondaryColor: '#393838',
        iconColor: '#dadada'
    },
    'dark-blue': {
        mainColor: '#1d232f',
        secondaryColor: '#212733',
        additionalColor: '#272b68',
        additionalColorHover: '#24285e',
        additionalColorActive: '#202353',
        smallCardBgColor: 'rgba(39, 43, 104, 0.5)',
        borderColor: '#FFFFFF',
        fontSecondaryColor: '#FFFFFF',
        fontMainColor: '#FFFFFF',
        iconColor: '#FFFFFF'
    }
}