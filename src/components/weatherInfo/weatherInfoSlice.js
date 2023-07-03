import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import getLocalDate from '../../utils/getLocalDate'
import makeApiCall from '../../utils/makeApiCall'

const initialState = {
    status: 'idle',
    selectedDate: [],
    data: {}
}

export const fetchForecast = createAsyncThunk(
    'weatherInfo/fetchForecast',
    async ({lat, lon}) => {
        try {
            return makeApiCall(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,precipitation,weathercode,cloudcover,visibility,windspeed_10m,winddirection_10m&models=best_match&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,windspeed_10m_max,winddirection_10m_dominant,precipitation_sum,precipitation_hours,precipitation_probability_mean&current_weather=true&timeformat=unixtime&timezone=auto&windspeed_unit=ms`)
        } catch(e) {}
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
            .addCase(fetchForecast.rejected, (state, action) => {
                state.status = 'error'
                state.message = action.error.message
            })
    }
})

export const getStatus = state => state.weatherInfo.status
export const getGographicalCoordinates = state => state.locations.geographicalCoordinates

export const getCurrentWeather = createSelector(
    state => state.weatherInfo.data.current_weather.time,
    state => state.weatherInfo.data.utc_offset_seconds,
    state => state.weatherInfo.data.hourly,
    (timestamp, utcOffset, hourlyForecast) => {
        const {weekday, month, day, hours, minutes, utcString} = getLocalDate(timestamp, utcOffset)
        const index = Number(hours)
        return {
            weekday: weekday.toLowerCase(), 
            month,
            day, 
            hours, 
            minutes,
            utcString,
            weatherCode: hourlyForecast.weathercode[index],
            temperature: hourlyForecast.temperature_2m[index].toFixed(0),
            apparentTemperature: hourlyForecast.apparent_temperature[index].toFixed(0),
            humidity: hourlyForecast.relativehumidity_2m[index],
            precipitation: hourlyForecast.precipitation[index].toFixed(1),
            precipitationProbability: hourlyForecast.precipitation_probability[index],
            windSpeed: hourlyForecast.windspeed_10m[index].toFixed(1),
            windDirection: hourlyForecast.winddirection_10m[index],
            cloudCover: hourlyForecast.cloudcover[index],
            visibility: hourlyForecast.visibility[index]
        }
    }
)

export const getDaysInfo = createSelector(
    state => state.weatherInfo.data.daily.time,
    state => state.weatherInfo.data.utc_offset_seconds,
    state => state.weatherInfo.data.daily.weathercode,
    (timestamps, utcOffset, weathercodes) => ({timestamps, utcOffset, weathercodes})
)

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
    state => state.weatherInfo.data.utc_offset_seconds,
    (index, sunrises, utcOffset) => {
        const {hours, minutes, utcString} = getLocalDate(sunrises[index], utcOffset)
        return {hours, minutes, utcString}
    }
)

export const getSunset = createSelector(
    state => state.weatherInfo.selectedDate[0],
    state => state.weatherInfo.data.daily.sunset,
    state => state.weatherInfo.data.utc_offset_seconds,
    (index, sunsets, utcOffset) => {
        const {hours, minutes, utcString} = getLocalDate(sunsets[index], utcOffset)
        return {hours, minutes, utcString}
    }
)

const { actions, reducer } = weatherInfoSlice

export const { setDate, clearDate } = actions
export default reducer