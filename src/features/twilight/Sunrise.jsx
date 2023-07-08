import { useSelector } from 'react-redux'

import { getSunrise } from '../weather/weatherSlice'

import { ReactComponent as SunriseIcon } from '../../assets/icons/sunrise.svg'
import Twilight from './Twilight'


export default function Sunrise() {
    const sunrise = useSelector(getSunrise)
    const data = {icon: <SunriseIcon/>, ...sunrise}

    return <Twilight data={data} type='Sunrise'/>
}