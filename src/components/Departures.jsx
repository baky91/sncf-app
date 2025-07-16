import { useEffect, useState } from "react"
import Departure from "./Departure";
import TimetableError from "./TimetableError";
import { useParams } from "react-router-dom";

function Departures(){

    const {stationCode} = useParams()

    const [nextDepartures, setNextDepartures] = useState([])
    const url = `https://api.sncf.com/v1/coverage/sncf/stop_areas/${stationCode}/departures`;

    useEffect(() => {
        fetch(url, {
            headers: { Authorization: `${import.meta.env.VITE_API_KEY}`}
        })
        .then(res => res.json())
        .then(data => setNextDepartures(data.departures))
        .catch(error => console.error("Erreur :", error))

    }, [stationCode])
    

    return (
        <div className="departures">
            <h2>Départs</h2>
            <ul>
                {
                    nextDepartures ? nextDepartures.map(dep => {
                        return <Departure key={dep.links[1].id} {...dep} />
                    }) : <TimetableError mode="départs" />
                }
            </ul>
        </div>
    )

}

export default Departures
