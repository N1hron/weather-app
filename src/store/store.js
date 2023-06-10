import { configureStore,  } from "@reduxjs/toolkit"
import themeReducer from '../themeSlice'
import locationsReducer from '../components/locationsList/locationsSlice'

const store = configureStore({
    reducer: {
        theme: themeReducer,
        locations: locationsReducer
    },
    devTools: true
})

export default store