import insertZero from './insertZero'

export default function getDateInfoByTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
          
    const year = date.getFullYear(),
          month = insertZero(date.getMonth() + 1),
          day = insertZero(date.getDate()),
          hours = insertZero(date.getHours()),
          minutes = insertZero(date.getMinutes()),
          weekday = date.toLocaleDateString('en-US', {weekday: 'long'}),
          utc = date.getTimezoneOffset() > 0 ? `-${date.getTimezoneOffset() / 60}` : `+${date.getTimezoneOffset() / -60}`

    return {year, month, day, hours, minutes, weekday, utc}
}

