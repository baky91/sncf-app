import { useEffect, useRef, useState } from "react"

export function Origin({vehicleJourneyId}){

    const [origin, setOrigin] = useState(null)
    const url = `https://api.sncf.com/v1/coverage/sncf/vehicle_journeys/${vehicleJourneyId}`
    const renderAfterCalled = useRef(false)
    renderAfterCalled.current = false

    useEffect(() => {
      if (!renderAfterCalled.current){
        fetch(url, {
            headers: { Authorization: `${import.meta.env.VITE_API_KEY}` }
        })
        .then(res => res.json())
        .then(data => {
            setOrigin(data.vehicle_journeys[0].stop_times[0].stop_point.name)
            // console.log(data);
        })
        .catch(error => console.error("Erreur :", error))
      }
      renderAfterCalled.current = true
    }, [vehicleJourneyId, renderAfterCalled])

    return (
        <p className="destination">{origin}</p>
    )
}

export default Origin

// const renderAfterCalled = useRef(false)

//     useEffect(() => {
//         renderAfterCalled.current = false
//         if (!renderAfterCalled.current){
//             fetch(url, {
//                 headers: { Authorization: `${import.meta.env.VITE_API_KEY}`}
//             })
//             .then(res => res.json())
//             .then(data => setNextArrivals(data.arrivals))
//             .catch(error => console.error("Erreur :", error))
//         }
//         renderAfterCalled.current = true

//     }, [stationCode])

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