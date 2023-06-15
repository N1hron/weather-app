import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit"

const locationsAdapter = createEntityAdapter()

const initialState = locationsAdapter.getInitialState({
    status: 'idle',
    currentLocation: {},
    geographicalCoordinates: {}
});

export const fetchLocations = createAsyncThunk(
    'locations/fetchLocations',
    async () => {
        const request = await fetch('https://countriesnow.space/api/v0.1/countries')
        const json = await request.json()
        const locations = json.data.map((location, i) => ({id: i, ...location}))
        return locations
    }
)

export const fetchGeographicalCoordinates = createAsyncThunk(
    'locations/getGeographicalCoordinates',
    async ({city, countryCode}) => {
        const apiKey = import.meta.env.VITE_GEOCODING_API_KEY
        const request = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${countryCode}&limit=1&appid=${apiKey}`)
        const json = await request.json()
        console.log(json)
        return json
    }
)

const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        setCurrentLocation: (state, action) => {state.currentLocation = action.payload}
    },
    extraReducers: (builder) => {
        builder 
            .addCase(fetchLocations.pending, state => {state.status = 'loading'})
            .addCase(fetchLocations.fulfilled, (state, action) => {
                state.status = 'success'
                locationsAdapter.setAll(state, action.payload)
            })
            .addCase(fetchLocations.rejected, state => {state.status = 'failure'})
            .addCase(fetchGeographicalCoordinates.fulfilled, (state, action) => {
                const {lat, lon} = action.payload[0]
                state.geographicalCoordinates = {lat, lon}
            })
    }
})

const { actions, reducer } = locationsSlice
const { selectAll } = locationsAdapter.getSelectors(state => state.locations)
const { setCurrentLocation } = actions

export default reducer
export { selectAll as selectAllLocations, setCurrentLocation };