export function getTimeHour(dateTime) {
  return dateTime.substring(9, 11)
}

export function getTimeMinutes(dateTime) {
  return dateTime.substring(11, 13)
}

export function calculateDelay(baseTime, realTime) {
  const baseDate = parseDate(baseTime)
  const realDate = parseDate(realTime)

  const minutesDelay = (realDate.getTime() - baseDate.getTime()) / 60000

  let isDelayed
  let delayClass

  if (minutesDelay == 0) {
    isDelayed = "À l'heure"
    delayClass = 'non-delayed'
  } else {
    isDelayed = `+ ${minutesDelay} min`
    delayClass = 'delayed'
  }

  return { isDelayed, delayClass }
}

function parseDate(str) {
  const year = str.substring(0, 4)
  const month = str.substring(4, 6) - 1 // JS months start at 0
  const day = str.substring(6, 8)
  const hour = str.substring(9, 11)
  const minute = str.substring(11, 13)
  const second = str.substring(13, 15)

  return new Date(year, month, day, hour, minute, second)
}

// format HHMMSS
export function getStopTime(time) {
  return `${time.substring(0, 2)}:${time.substring(2, 4)}`
}

export function calculateStopDuration(arrivalTime, departureTime) {
  const toSeconds = (t) =>
    parseInt(t.slice(0, 2)) * 3600 +
    parseInt(t.slice(2, 4)) * 60 +
    parseInt(t.slice(4, 6))

  let diff = toSeconds(departureTime) - toSeconds(arrivalTime)
  return diff / 60
}
