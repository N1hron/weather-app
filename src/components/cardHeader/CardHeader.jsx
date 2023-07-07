import './cardHeader.scss';


export default function CardHeader({title, subtitle, description, children}) {
    return (
        <header className='card-header'>
            <div className='card-header__title'>
                <h3>{title}</h3>
                {subtitle && <span>{subtitle}</span>}
            </div>
            {description && <span className='card-header__description'>{description}</span>}
            {children}
        </header>
    )
}