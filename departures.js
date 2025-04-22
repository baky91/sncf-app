import { API_KEY, calculateDelay, getTimeHour, getTimeMinutes } from "./api.js";
import { setStops } from "./stops.js";

export async function getDepartures(stationId) {
  const url = `https://api.sncf.com/v1/coverage/sncf/stop_areas/${stationId}/departures?count=35`;

  try {
    const response = await fetch(url, {
      headers: { Authorization: API_KEY },
    });

    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }

    const data = await response.json();
    displayDepartures(data);
    console.log(data);
  } catch (error) {
    console.error("Erreur lors de la récupération des départs :", error);
  }
}

function displayDepartures(data) {
  const departuresRow = document.querySelector(".departures > ul");
  departuresRow.innerHTML = "";
  let lineImg = document.getElementsByClassName("line-img");
  // const filterDepartures = document.querySelector(".current-mode").value;
  // console.log(filterDepartures);

  // console.log(departuresRow);

  // .filter((dep) => dep.display_informations?.commercial_mode == "RER")

  let filters = ["TGV", "TRANSILIEN", "OUIGO"];
  // let filters = ["RER"];

  const networks = [
    "RER",
    "TRANSILIEN",
    "TGV INOUI",
    "OUIGO",
    "TGV Lyria",
    "DB SNCF",
    "Eurostar",
  ];

  let index = 0; // index qui sert pour mettre les bons arrets à chaque départ

  data.departures
    // .filter((dep) =>
    //   filters.some((type) => dep.display_informations.network.includes(type))
    // )
    .slice(0, 10)
    .forEach((dep) => {
      const direction = dep.display_informations.direction.split("(", 1);
      const baseDepartureTime = dep.stop_date_time.base_departure_date_time;
      const realDepartureTime = dep.stop_date_time.departure_date_time;
      const hour = getTimeHour(baseDepartureTime);
      const minute = getTimeMinutes(baseDepartureTime);

      const vehicleJourneyId = dep.links[1].id;

      const number = dep.display_informations.trip_short_name;

      const trainType = dep.display_informations.network;
      const lineCode = dep.display_informations.code;

      const { isDelayed, delayClass } = calculateDelay(
        baseDepartureTime,
        realDepartureTime
      );

      if (networks.includes(trainType)) {
        if (lineCode == "") {
          lineImg = `./img/lines/${trainType}.svg`;
        } else {
          lineImg = `./img/lines/${trainType}_${lineCode}.svg`;
        }
      } else {
        lineImg = `./img/lines/Sncf-logo.svg`;
      }

      departuresRow.innerHTML += `
      <li>
          <div class="line-type">
              <img class="line-img" src="${lineImg}">
              <p class="number">${number}</p> 
          </div>
          <p class="is-delayed ${delayClass}">${isDelayed}</p>
          <p class="hour">${hour}:${minute}</p>
          <div class="line">
              <p class="destination">${direction}</p>
              <div class="stops-wrapper">
                  <p class="stops" id="dep${index}"></p>
              </div>
          </div>
      </li>
      `;

      setStops(vehicleJourneyId, index);
      index++;
    });
}
