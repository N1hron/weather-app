import { configureStore,  } from "@reduxjs/toolkit"
import appearanceReducer from '../appearanceSlice'
import locationsReducer from '../components/locations/locationsSlice'

const store = configureStore({
    reducer: {
        appearance: appearanceReducer,
        locations: locationsReducer
    },
    devTools: import.meta.env.DEV || true
})

export default store