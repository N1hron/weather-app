import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    status: 'idle',
    selectedDate: '',
    data: {}
}

export const fetchForecast = createAsyncThunk(
    'weatherInfo/fetchForecast',
    async ({lat, lon}) => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,cloudcover,visibility,windspeed_10m,winddirection_10m&models=best_match&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=GMT`
        const response = await fetch(url)
        const json = await response.json()
        console.log(json)
        return json
    }
)

const weatherInfoSlice = createSlice({
    name: 'weatherInfo',
    initialState,
    reducers: {
        selectDate: (state, action) => {state.selectedDate = action.payload}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchForecast.pending, (state) => {state.status = 'loading'})
            .addCase(fetchForecast.fulfilled, (state, action) => {
                state.data = {hourly: action.payload.hourly, daily: action.payload.daily}
                state.status = 'success'
                
            })
            .addCase(fetchForecast.rejected, (state) => {state.status = 'failure'})
    }
})

const { actions, reducer } = weatherInfoSlice

export const { selectDate } = actions
export default reducer