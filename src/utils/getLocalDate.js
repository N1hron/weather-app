import insertZero from './insertZero'


export default function getLocalDate(timestamp, offset = 0) {
    const localDate = new Date((timestamp + offset) * 1000)
          
    const year = localDate.getUTCFullYear(),
          month = insertZero(localDate.getUTCMonth() + 1),
          day = insertZero(localDate.getUTCDate()),
          hours = insertZero(localDate.getUTCHours()),
          minutes = insertZero(localDate.getUTCMinutes()),
          weekday = localDate.toLocaleDateString('en-US', {weekday: 'long'})

    const utc = offset / 3600,
          utcString = utc > 0 ? `+${utc}` : `${utc}`

    return {year, month, day, hours, minutes, weekday, utc, utcString}
}