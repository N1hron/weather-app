import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import getTimeByTimestamp from '../../utils/getTimeByTimestamp'

const initialState = {
    status: 'idle',
    selectedDate: [],
    data: {}
}

export const fetchForecast = createAsyncThunk(
    'weatherInfo/fetchForecast',
    async ({lat, lon}) => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode,cloudcover,visibility,windspeed_10m,winddirection_10m&models=best_match&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,windspeed_10m_max,winddirection_10m_dominant,precipitation_sum,precipitation_hours,precipitation_probability_mean&current_weather=true&timeformat=unixtime&timezone=auto`
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

export const getPrecipitation = createSelector(
    state => state.weatherInfo.selectedDate[0],
    state => state.weatherInfo.data.daily.precipitation_hours,
    state => state.weatherInfo.data.daily.precipitation_sum,
    state => state.weatherInfo.data.daily.precipitation_probability_mean,
    (index, hours, sum, probability) => [hours[index], sum[index], probability[index]]
)

export const getWind = createSelector(
    state => state.weatherInfo.selectedDate[0],
    state => state.weatherInfo.data.daily.windspeed_10m_max,
    state => state.weatherInfo.data.daily.winddirection_10m_dominant,
    state => state.weatherInfo.data.daily_units.windspeed_10m_max,
    (index, speed, direction, units) => [speed[index], direction[index], units]
)

export const getUVIndex = createSelector(
    state => state.weatherInfo.selectedDate[0],
    state => state.weatherInfo.data.daily.uv_index_max,
    (index, uvIndexes) => uvIndexes[index]
)

export const getSunrise = createSelector(
    state => state.weatherInfo.selectedDate[0],
    state => state.weatherInfo.data.daily.sunrise,
    (index, sunrises) => {
        const {hours, minutes} = getTimeByTimestamp(sunrises[index])
        return {hours, minutes}
    }
)

export const getSunset = createSelector(
    state => state.weatherInfo.selectedDate[0],
    state => state.weatherInfo.data.daily.sunset,
    (index, sunsets) => {
        const {hours, minutes} = getTimeByTimestamp(sunsets[index])
        return {hours, minutes}
    }
)

export const getUTCOffset = state => state.weatherInfo.data.utc_offset_seconds / 3600

const { actions, reducer } = weatherInfoSlice

export const { setDate, clearDate } = actions
export default reducer