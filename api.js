// require("dotenv").config();

import { getDepartures } from "./departures.js";
import { getArrivals } from "./arrivals.js";
// import { API_KEY } from "./app.js";

// console.log("Hello");

// export const API_KEY = process.env.SNCF_API_KEY;
// console.log(API_KEY);

export const API_KEY = "API_KEY";

// Séléctionner les départs ou les arrivées

document.getElementById("departures-btn").addEventListener("click", () => {
  document.querySelector(".arrivals").style.display = "none";
  document.querySelector(".arrivals-section").style.display = "none";
  document.querySelector(".departures").style.display = "block";
  document.querySelector(".departures-section").style.display = "flex";
  // getDepartures();
});

document.getElementById("arrivals-btn").addEventListener("click", () => {
  document.querySelector(".arrivals").style.display = "block";
  document.querySelector(".arrivals-section").style.display = "flex";
  document.querySelector(".departures").style.display = "none";
  document.querySelector(".departures-section").style.display = "none";
  // getArrivals();
});

function getStationName() {
  const stationName = document.getElementById("inp-station").value;
  // console.log(stationName);
  getDeparturesAndArrivals(stationName);
}

function getDeparturesAndArrivals(stationName) {
  getStationId(stationName).then((stationId) => {
    getDepartures(stationId);
    getArrivals(stationId);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".stations-list li").forEach((item) => {
    item.addEventListener("click", (e) => {
      const stationName = e.target.attributes.value.value;
      getDeparturesAndArrivals(stationName);
    });
  });
});

document
  .getElementById("btn-station")
  .addEventListener("click", getStationName);

window.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getStationName();
});

async function getStationId(name) {
  const url = `https://api.sncf.com/v1/coverage/sncf/places?q=${name}`;
  let stationId;

  try {
    const response = await fetch(url, {
      headers: { Authorization: API_KEY },
    });

    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data);

    let i = 0;

    while (!data.places[i].id.includes("stop_area:SNCF")) {
      i++;
    }

    stationId = data.places[i].id;

    document.getElementById("station-name").textContent = data.places[
      i
    ].name.split(" (", 1);

    return stationId;
  } catch (error) {
    console.error("Erreur lors de la récupération des départs :", error);
  }
}

export function getTimeHour(dateTime) {
  return dateTime.substring(9, 11);
}

export function getTimeMinutes(dateTime) {
  return dateTime.substring(11, 13);
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
