import './sunrise.scss'

export default function Sunrise() {

    return (
        <div className='sunrise'>
            <p>Sunrise <span>05:00</span></p>
            <div className='sunrise__illustration'>
                <div className='sunrise__horizon'></div>
                <div className='sunrise__circle'><div className='sunrise__circle-inner'></div></div>
            </div>
            <p>Sunset <span>00:00</span></p>
        </div>
    )
}