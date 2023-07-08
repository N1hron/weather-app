import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'

const locationsAdapter = createEntityAdapter()

const initialState = locationsAdapter.getInitialState({
    status: 'idle',
    currentLocation: {},
    geographicalCoordinates: {}
});

export const fetchLocations = createAsyncThunk(
    'locations/fetchLocations',
    async () => {
        const response = await fetch('https://countriesnow.space/api/v0.1/countries')
        const json = await response.json()
        return json.data.map((location, i) => ({id: i, ...location}))
    }
)

export const fetchGeographicalCoordinates = createAsyncThunk(
    'locations/getGeographicalCoordinates',
    async ({city, countryCode}) => {
        const apiKey = 'fb892f52993e357f7e4654a5a9bbc648'
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${countryCode}&limit=1&appid=${apiKey}`)
        const json = await response.json()
        const {lat, lon} = json[0]
        return {lat, lon}
    }
)

const setLoading = state => {state.status = 'loading'}
const setFailure = state => {
    state.status = 'failure',
    state.geographicalCoordinates = {}
}

const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        setCurrentLocation: (state, action) => {state.currentLocation = action.payload}
    },
    extraReducers: (builder) => {
        builder 
            .addCase(fetchLocations.pending, setLoading)
            .addCase(fetchLocations.fulfilled, (state, action) => {
                locationsAdapter.setAll(state, action.payload)
                state.status = 'idle'
            })
            .addCase(fetchLocations.rejected, setFailure)
            .addCase(fetchGeographicalCoordinates.pending, setLoading)
            .addCase(fetchGeographicalCoordinates.fulfilled, (state, action) => {
                state.geographicalCoordinates = action.payload
                state.status = 'success'
            })
            .addCase(fetchGeographicalCoordinates.rejected, setFailure)
    }
})

export const getStatus = state => state.locations.status
export const getCurrentLocation = state => state.locations.currentLocation

const { actions, reducer } = locationsSlice
const { selectAll } = locationsAdapter.getSelectors(state => state.locations)
const { setCurrentLocation } = actions

export default reducer
export { selectAll as selectAllLocations, setCurrentLocation };