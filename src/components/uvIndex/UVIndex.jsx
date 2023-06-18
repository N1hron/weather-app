import './uvindex.scss'

export default function UVIndex() {
    return (
        <div className='uv-index'>
            <h3>UV Index</h3>
            <p>1<span>Low</span></p>
            <div className='uv-index__measure'>
                <div className='uv-index__pointer'></div>
            </div>
        </div>
    )
}