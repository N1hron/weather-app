import hasNullUndefinedOrNan from '../../utils/hasNullUndefinedOrNan'

import './twilight.scss'

import CardHeader from '../../components/cardHeader/CardHeader'

export default function Twilight({data, type}) {
    const {hours, minutes, utcString, icon} = data

    return (
        <div className={`twilight twilight_${type.toLowerCase()}`}>
            {
                !hasNullUndefinedOrNan(data) ? 
                <>
                    <CardHeader title={type}/>
                    {icon}
                    <p>{`${hours}:${minutes}`} <span>UTC{utcString}</span></p>
                </>
                : null
            }
        </div>
    )
}
