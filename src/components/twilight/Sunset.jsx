import { useSelector } from 'react-redux'

import { getSunset } from '../weatherInfo/weatherInfoSlice'
import { ReactComponent as SunsetIcon } from '../../assets/icons/sunset.svg'
import Twilight from './Twilight'


export default function Sunset() {
    const sunset = useSelector(getSunset)
    const data = {icon: <SunsetIcon/>, ...sunset}

    return <Twilight data={data} type='Sunset'/>
}