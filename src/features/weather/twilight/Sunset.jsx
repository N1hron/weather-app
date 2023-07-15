import { useSelector } from 'react-redux'

import { getSunset } from '../weatherSlice'

import { ReactComponent as SunsetIcon } from '../../../assets/icons/sunset.svg'
import Twilight from './Twilight'


export default function Sunset() {
    const sunset = useSelector(getSunset)
    const data = {icon: <SunsetIcon className='icon icon_sunset'/>, ...sunset}

    return <Twilight animationDelay={0.15} data={data} type='Sunset'/>
}