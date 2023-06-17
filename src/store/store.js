import { configureStore,  } from '@reduxjs/toolkit'

import appearanceReducer from '../appearanceSlice'
import locationsReducer from '../components/locations/locationsSlice'
import weatherInfoReducer from '../components/weatherInfo/weatherInfoSlice'

const store = configureStore({
    reducer: {
        appearance: appearanceReducer,
        locations: locationsReducer,
        weatherInfo: weatherInfoReducer
    },
    devTools: import.meta.env.DEV || true
})

export default store