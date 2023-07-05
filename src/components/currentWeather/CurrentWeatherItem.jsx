export default function CurrentWeatherItem({title, info, unit, description, icon}) {
    return (
        <li className='current__item'>
            <div className='current__item-heading'>
                <span>{title}</span>
                {icon}
            </div>
            <p>{info} <span>{unit}</span></p>
            <span>{description}</span>
        </li>
    )
}