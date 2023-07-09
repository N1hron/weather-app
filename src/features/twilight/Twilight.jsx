import hasNullUndefinedOrNan from '../../utils/hasNullUndefinedOrNan'

import './twilight.scss'

import CardHeader from '../../components/cardHeader/CardHeader'

export default function Twilight({data, type}) {
    const {hours, minutes, utcString, icon} = data

    if(hasNullUndefinedOrNan(data)) return <div className={`twilight twilight_${type.toLowerCase()} idle`}></div>
    return (
        <div className={`twilight twilight_${type.toLowerCase()}`}>
            <CardHeader title={type}/>
            {icon}
            <p>{`${hours}:${minutes}`} <span>UTC{utcString}</span></p>
        </div>
    )
}
