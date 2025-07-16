import { useState, useEffect } from "react";

function TrainStops({vehicleJourneyId}){

    const [nextStops, setNextStops] = useState([])
    const url = `https://api.sncf.com/v1/coverage/sncf/vehicle_journeys/${vehicleJourneyId}`;

    useEffect(() => {
        fetch(url, {
            headers: { Authorization: `${import.meta.env.VITE_API_KEY}` }
        })
        .then(res => res.json())
        .then(data => setNextStops(data.vehicle_journeys[0].stop_times))
        .catch(error => console.error("Erreur :", error))
        
    }, [])
    
    let stops = ""

    if (nextStops.length > 2){
        for (let i = 0; i < nextStops.length - 1; i++){
            stops += `${nextStops[i].stop_point.name}`
            if (i != nextStops.length - 2){
                stops += ` • `
            }
        }
    }

    return (
        <div className="stops-wrapper">
            <p className="stops">{stops}</p>
        </div>
    )
}

export default TrainStops;