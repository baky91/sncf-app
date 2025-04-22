import { API_KEY } from "./api.js";
import { setScrollSpeedAll } from "./script.js";

export async function setStops(vehicleJourneyId, index) {
  try {
    const response = await fetch(
      `https://api.sncf.com/v1/coverage/sncf/vehicle_journeys/${vehicleJourneyId}`,
      {
        headers: { Authorization: API_KEY },
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data);

    let stops = ``;

    const stopTimes = data.vehicle_journeys[0].stop_times;

    // les trajets avec plusieurs arrets
    if (stopTimes.length > 2) {
      // exclure l'arrivée
      for (let i = 0; i < stopTimes.length - 1; i++) {
        stops += `${stopTimes[i].stop_point.name}`;
        if (i != stopTimes.length - 2) stops += "<span> • </span>";
      }
      document.getElementById(`dep${index}`).innerHTML = stops;
    }

    setScrollSpeedAll(100);
  } catch (error) {
    console.error("Erreur lors de la récupération des arrets :", error);
  }
}

export async function setOrigin(vehicleJourneyId, index) {
  try {
    const response = await fetch(
      `https://api.sncf.com/v1/coverage/sncf/vehicle_journeys/${vehicleJourneyId}`,
      {
        headers: { Authorization: API_KEY },
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`);
    }

    const data = await response.json();

    // console.log(data);

    const origin = data.vehicle_journeys[0].stop_times[0].stop_point.name;

    // console.log(origin);

    document.getElementById(`arr${index}`).innerHTML = origin;

    setScrollSpeedAll(100);
  } catch (error) {
    console.error("Erreur lors de la récupération des arrets :", error);
  }
}
