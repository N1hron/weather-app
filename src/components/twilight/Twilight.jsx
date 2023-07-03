import hasNullUndefinedOrNan from '../../utils/hasNullUndefinedOrNan'

import './twilight.scss'


export default function Twilight({data, type}) {
    const {hours, minutes, utcString, icon} = data

    return (
        <div className={`twilight twilight_${type.toLowerCase()}`}>
            {
                !hasNullUndefinedOrNan(data) ? 
                <>
                    <h3>{type}</h3>
                    {icon}
                    <p>{`${hours}:${minutes}`} <span>UTC{utcString}</span></p>
                </>
                : null
            }
        </div>
    )
}
