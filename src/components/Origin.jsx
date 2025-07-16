import { useEffect, useState } from "react"

export function Origin({vehicleJourneyId}){

    const [origin, setOrigin] = useState(null)
    const url = `https://api.sncf.com/v1/coverage/sncf/vehicle_journeys/${vehicleJourneyId}`

    useEffect(() => {
        fetch(url, {
            headers: { Authorization: `${import.meta.env.VITE_API_KEY}` }
        })
        .then(res => res.json())
        .then(data => {
            setOrigin(data.vehicle_journeys[0].stop_times[0].stop_point.name)
            // console.log(data);
            
        })
        .catch(error => console.error("Erreur :", error))

    }, [])

    return (
        <p className="destination">{origin}</p>
    )
}

export default Origin

/*
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
*/