import { useSelector } from 'react-redux'

import { getSunrise } from '../weatherSlice'

import { ReactComponent as SunriseIcon } from '../../../assets/icons/sunrise.svg'
import Twilight from './Twilight'


export default function Sunrise({animationDelay}) {
    const sunrise = useSelector(getSunrise)
    const data = {icon: <SunriseIcon className='icon icon_sunrise'/>, ...sunrise}

    return <Twilight animationDelay={animationDelay} data={data} type='Sunrise'/>
}