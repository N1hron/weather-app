import { configureStore,  } from "@reduxjs/toolkit"
import appearanceReducer from '../appearanceSlice'
import locationsReducer from '../components/locationsList/locationsSlice'

const store = configureStore({
    reducer: {
        appearance: appearanceReducer,
        locations: locationsReducer
    },
    devTools: true
})

export default store