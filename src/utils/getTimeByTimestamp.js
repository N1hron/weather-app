import insertZero from './insertZero'

export default function getTimeByTimestamp(timestamp) {
    const date = new Date(timestamp * 1000),
          year = date.getFullYear(),
          month = insertZero(date.getMonth() + 1),
          day = insertZero(date.getDate())

    const hours = insertZero(date.getHours()),
          minutes = insertZero(date.getMinutes())

    const weekday = date.toLocaleDateString('en-US', {weekday: 'long'})
    
    const utc = date.getTimezoneOffset() > 0 ? `-${date.getTimezoneOffset() / 60}` : `+${date.getTimezoneOffset() / -60}`

    return {year, month, day, hours, minutes, weekday, utc}
}

