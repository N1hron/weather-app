import { configureStore } from '@reduxjs/toolkit'

import locationsReducer from '../components/locations/locationsSlice'
import weatherInfoReducer from '../components/weatherInfo/weatherInfoSlice'


const store = configureStore({
    reducer: {
        locations: locationsReducer,
        weatherInfo: weatherInfoReducer
    },
    devTools: import.meta.env.DEV
})

export default store