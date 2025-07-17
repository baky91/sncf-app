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
    }, [vehicleJourneyId])

    return (
        <p className="destination">{origin}</p>
    )
}

export default Origin
