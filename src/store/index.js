import { configureStore } from '@reduxjs/toolkit'

import locationsReducer from '../features/locations/locationsSlice'
import weatherReducer from '../features/weather/weatherSlice'


const store = configureStore({
    reducer: {
        locations: locationsReducer,
        weather: weatherReducer
    },
    devTools: import.meta.env.DEV
})

export default store