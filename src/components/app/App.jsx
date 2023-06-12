import Header from '../header/Header'
import WeatherInfo from '../weatherInfo/WeatherInfo'

import './app.scss'

function App() {
  return (
    <div className='container'>
      <Header/>
      <main>
        <WeatherInfo/>
      </main>
    </div>
  )
}

export default App
