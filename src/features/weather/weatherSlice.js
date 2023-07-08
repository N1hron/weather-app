import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'

import { fetchGeographicalCoordinates } from '../locations/locationsSlice'
import getLocalDate from '../../utils/getLocalDate'
import makeApiCall from '../../utils/makeApiCall'


const initialState = {
    status: 'idle',
    selectedDate: [],
    data: {}
}

export const fetchForecast = createAsyncThunk(
    'weather/fetchForecast',
    async ({lat, lon}) => {
        try {
            return makeApiCall(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,cloudcover,visibility,windspeed_10m,winddirection_10m&models=best_match&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,windspeed_10m_max,winddirection_10m_dominant,precipitation_sum,precipitation_hours,precipitation_probability_mean&current_weather=true&timeformat=unixtime&timezone=auto&windspeed_unit=ms`)
        } 
        // eslint-disable-next-line
        catch(e) {}
    }
)

const weatherSlice = createSlice({
    name: 'weather',
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
            .addCase(fetchForecast.rejected, (state, action) => {
                state.status = 'failure'
                state.message = action.error.message
            })
            .addCase(fetchGeographicalCoordinates.rejected, (state) => {state.status = 'idle'})
    }
})

export const getStatus = state => state.weather.status
export const getGographicalCoordinates = state => state.locations.geographicalCoordinates

export const getHourlyForecast = createSelector(
    state => state.weather.selectedDate[0],
    state => state.weather.data.utc_offset_seconds,
    state => state.weather.data.hourly,
    (date, utcOffset, forecast) => {
        if(!(date || date === 0)) return null
        const [start, end] = [date * 24, (date + 1) * 24]
        
        return {
            timestamp: forecast.time.slice(start, end),
            utcOffset: utcOffset,
            weatherCode: forecast.weathercode.slice(start, end),
            temperature: forecast.temperature_2m.slice(start, end),
            humidity: forecast.relativehumidity_2m.slice(start, end),
            precipitation: forecast.precipitation.slice(start, end),
            windSpeed: forecast.windspeed_10m.slice(start, end),
        }
    }
)

export const getCurrentWeather = createSelector(
    state => state.weather.data.current_weather.time,
    state => state.weather.data.utc_offset_seconds,
    state => state.weather.data.hourly,
    (timestamp, utcOffset, forecast) => {
        const {weekday, month, day, hours, minutes, utcString} = getLocalDate(timestamp, utcOffset)
        const index = Number(hours)
        return {
            weekday: weekday.toLowerCase(), 
            month,
            day, 
            hours, 
            minutes,
            utcString,
            weatherCode: forecast.weathercode[index],
            temperature: forecast.temperature_2m[index].toFixed(0),
            apparentTemperature: forecast.apparent_temperature[index].toFixed(0),
            humidity: forecast.relativehumidity_2m[index],
            precipitation: forecast.precipitation[index].toFixed(1),
            precipitationProbability: forecast.precipitation_probability[index],
            windSpeed: forecast.windspeed_10m[index].toFixed(1),
            windDirection: forecast.winddirection_10m[index],
            cloudCover: forecast.cloudcover[index],
            visibility: forecast.visibility[index]
        }
    }
)

export const getDaysInfo = createSelector(
    state => state.weather.data.daily.time,
    state => state.weather.data.utc_offset_seconds,
    state => state.weather.data.daily.weathercode,
    (timestamps, utcOffset, weathercodes) => ({timestamps, utcOffset, weathercodes})
)

export const getPrecipitation = createSelector(
    state => state.weather.selectedDate[0],
    state => state.weather.data.daily.precipitation_hours,
    state => state.weather.data.daily.precipitation_sum,
    state => state.weather.data.daily.precipitation_probability_mean,
    (index, hours, sum, probability) => [hours[index], sum[index], probability[index]]
)

export const getWind = createSelector(
    state => state.weather.selectedDate[0],
    state => state.weather.data.daily.windspeed_10m_max,
    state => state.weather.data.daily.winddirection_10m_dominant,
    state => state.weather.data.daily_units.windspeed_10m_max,
    (index, speed, direction, units) => [speed[index], direction[index], units]
)

export const getUVIndex = createSelector(
    state => state.weather.selectedDate[0],
    state => state.weather.data.daily.uv_index_max,
    (index, uvIndexes) => uvIndexes[index]
)

export const getSunrise = createSelector(
    state => state.weather.selectedDate[0],
    state => state.weather.data.daily.sunrise,
    state => state.weather.data.utc_offset_seconds,
    (index, sunrises, utcOffset) => {
        const {hours, minutes, utcString} = getLocalDate(sunrises[index], utcOffset)
        return {hours, minutes, utcString}
    }
)

export const getSunset = createSelector(
    state => state.weather.selectedDate[0],
    state => state.weather.data.daily.sunset,
    state => state.weather.data.utc_offset_seconds,
    (index, sunsets, utcOffset) => {
        const {hours, minutes, utcString} = getLocalDate(sunsets[index], utcOffset)
        return {hours, minutes, utcString}
    }
)

const { actions, reducer } = weatherSlice

export const { setDate, clearDate } = actions
export default reducer