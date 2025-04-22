import { API_KEY, calculateDelay, getTimeHour, getTimeMinutes } from "./api.js";
import { setOrigin } from "./stops.js";

export async function getArrivals(stationId) {
  const url = `https://api.sncf.com/v1/coverage/sncf/stop_areas/${stationId}/arrivals?count=35`;
  // console.log("url = " + url);

  try {
    const response = await fetch(url, {
      headers: { Authorization: API_KEY },
    });

    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);
    displayArrivals(data);
  } catch (error) {
    console.error("Erreur lors de la récupération des arrivées :", error);
  }
}

function displayArrivals(data) {
  const arrivalsRow = document.querySelector(".arrivals > ul");
  // console.log(arrivalsRow);

  arrivalsRow.innerHTML = "";
  let lineImg = document.getElementsByClassName("line-img");
  // console.log(arrivalsRow);
  //   console.log("Hello");

  let index = 0;

  let nbArrivals = 0;
  let i = 0;

  const arrivalsNetworks = [
    "TGV INOUI",
    "OUIGO",
    "TGV Lyria",
    "DB SNCF",
    "Eurostar",
    "TER",
  ];

  while (nbArrivals < 10) {
    const arr = data.arrivals[i];

    const trainType = arr.display_informations.network;
    if (arrivalsNetworks.includes(trainType)) {
      const baseArrivalTime = arr.stop_date_time.base_arrival_date_time;
      const realArrivalTime = arr.stop_date_time.arrival_date_time;
      const hour = getTimeHour(baseArrivalTime);
      const minute = getTimeMinutes(baseArrivalTime);

      const vehicleJourneyId = arr.links[1].id;

      // console.log(vehicleJourneyId);

      const number = arr.display_informations.trip_short_name;

      const lineCode = arr.display_informations.code;

      const { isDelayed, delayClass } = calculateDelay(
        baseArrivalTime,
        realArrivalTime
      );

      if (arrivalsNetworks.includes(trainType)) {
        if (lineCode == "") {
          lineImg = `./img/lines/${trainType}.svg`;
        } else {
          lineImg = `./img/lines/${trainType}_${lineCode}.svg`;
        }
      } else {
        lineImg = `./img/lines/Sncf-logo.svg`;
      }

      arrivalsRow.innerHTML += `
      <li>
          <div class="line-type">
              <img class="line-img" src="${lineImg}">
              <p class="number">${number}</p> 
          </div>
          <p class="is-delayed ${delayClass}">${isDelayed}</p>
          <p class="hour">${hour}:${minute}</p>
          <div class="line">
              <p class="destination" id="arr${index}"></p>
          </div>
      </li>
      `;

      setOrigin(vehicleJourneyId, index);

      index++;
      nbArrivals++;
    }

    i++; // incrementation de l'indice pour les arrivées
  }
}
