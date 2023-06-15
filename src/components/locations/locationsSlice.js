import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit"

const locationsAdapter = createEntityAdapter()

const initialState = locationsAdapter.getInitialState({
    status: 'idle',
    currentLocation: {},
    geographicalCoordinates: ''
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

// export const fetchGeographicalCoordinates = createAsyncThunk(
//     'locations/getGeographicalCoordinates',
//     async (country, code) => {
//         const apiKey = process.env.API_KEY
//         console.log(apiKey)
//     }
// )

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
    }
})

const { actions, reducer } = locationsSlice
const { selectAll } = locationsAdapter.getSelectors(state => state.locations)
const { setCurrentLocation } = actions

export default reducer
export { selectAll as selectAllLocations, setCurrentLocation };