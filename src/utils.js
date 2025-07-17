import stations from "./gares.json";

export function getStationName(stationCode) {
  let stationName = "";
  for (let i = 0; i < stations.results.length; i++) {
    if (stations.results[i].code === stationCode) {
      stations.results[i].code;
      stationName = stations.results[i].nom;
      break;
    }
  }

  return stationName;
}

export function getTimeHour(dateTime) {
  return dateTime.substring(9, 11);
}

export function getTimeMinutes(dateTime) {
  return dateTime.substring(11, 13);
}

export function calculateDelay(baseTime, realTime) {
  const baseDate = parseDate(baseTime);
  const realDate = parseDate(realTime);

  const minutesDelay = (realDate.getTime() - baseDate.getTime()) / 60000;

  let isDelayed;
  let delayClass;

  if (minutesDelay == 0) {
    isDelayed = "À l'heure";
    delayClass = "non-delayed";
  } else {
    isDelayed = `+ ${minutesDelay} min`;
    delayClass = "delayed";
  }

  return { isDelayed, delayClass };
}

function parseDate(str) {
  const year = str.substring(0, 4);
  const month = str.substring(4, 6) - 1; // JS months start at 0
  const day = str.substring(6, 8);
  const hour = str.substring(9, 11);
  const minute = str.substring(11, 13);
  const second = str.substring(13, 15);

  return new Date(year, month, day, hour, minute, second);
}

export function setScrollSpeedStyle() {}

/* 
export function setScrollSpeedAll(speed = 100) {
  document.querySelectorAll(".stops-wrapper").forEach((wrapper) => {
    const stops = wrapper.querySelector(".stops");
    const textWidth = stops.scrollWidth;
    const wrapperWidth = wrapper.offsetWidth;

    if (textWidth > wrapperWidth) {
      const distance = textWidth + wrapperWidth;
      const duration = distance / speed;

      stops.style.animation = `scroll-left ${duration}s linear infinite`;
    } else {
      stops.style.animation = "none";
    }
  });
}
*/
