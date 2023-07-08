import Header from '../features/header/Header'
import Weather from '../features/weather/Weather'
import LocationsMessage from '../components/message/LocationsMessage'

import './app.scss'


function App() {
  
  return (
    <>
      <Header/>
      <main>
        <Weather/>
      </main>    
    </>
  )
}

export default App
