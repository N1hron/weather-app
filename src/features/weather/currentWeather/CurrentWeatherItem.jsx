export default function CurrentWeatherItem({caption, info, unit, description, icon}) {
    return (
        <li className='current__item'>
            <p className='current__item-caption'>
                <span className='secondary-text'>{caption}</span>
                {icon}
            </p>
            <p className='current__item-main-text'>{info} <span className='current__item-unit'>{unit}</span></p>
            <p className='secondary-text'>{description}</p>
        </li>
    )
}