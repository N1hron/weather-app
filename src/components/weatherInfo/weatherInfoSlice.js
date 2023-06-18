import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';

const initialState = {
    status: 'idle',
    selectedDate: [],
    data: {},
    moonPhase: ''
}

export const fetchForecast = createAsyncThunk(
    'weatherInfo/fetchForecast',
    async ({lat, lon}) => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,cloudcover,visibility,windspeed_10m,winddirection_10m&models=best_match&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=GMT`
        const response = await fetch(url)
        const json = await response.json()
        return json
    }
)

export const fetchMoonPhase = createAsyncThunk(
    'weatherInfo/fetchMoonPhase',
    async () => {

    }
)

const weatherInfoSlice = createSlice({
    name: 'weatherInfo',
    initialState,
    reducers: {
        setDate: (state, action) => {state.selectedDate = action.payload},
        clearDate: (state) => {state.selectedDate = []}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchForecast.pending, (state) => {state.status = 'loading'})
            .addCase(fetchForecast.fulfilled, (state, action) => {
                state.data = action.payload
                state.status = 'success'
                
            })
            .addCase(fetchForecast.rejected, (state) => {state.status = 'failure'})
    }
})

export const getStatus = state => state.weatherInfo.status
export const getGographicalCoordinates = state => state.locations.geographicalCoordinates
export const getDailyForecast = state => state.weatherInfo.data.daily
export const getSelectedDate = state => state.weatherInfo.selectedDate

export const getUVIndex = createSelector(
    state => state.weatherInfo.selectedDate[0],
    state => state.weatherInfo.selectedDate[1],
    state => state.weatherInfo.data.daily.uv_index_max,
    (index, date, uvIndexes) => uvIndexes[index]
)

const { actions, reducer } = weatherInfoSlice

export const { setDate, clearDate } = actions
export default reducer