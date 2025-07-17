import { useEffect, useState, useRef } from "react"
import Departure from "./Departure";
import TimetableError from "./TimetableError";
import { useParams } from "react-router-dom";

function Departures(){

    const {stationCode} = useParams()

    const [nextDepartures, setNextDepartures] = useState([])
    const url = `https://api.sncf.com/v1/coverage/sncf/stop_areas/${stationCode}/departures`;
    const renderAfterCalled = useRef(false)
    renderAfterCalled.current = false

    useEffect(() => {
        if (!renderAfterCalled.current){
            fetch(url, {
                headers: { Authorization: `${import.meta.env.VITE_API_KEY}`}
            })
            .then(res => res.json())
            .then(data => setNextDepartures(data.departures))
            .catch(error => console.error("Erreur :", error))
        }
        renderAfterCalled.current = true
    }, [stationCode, renderAfterCalled])
   
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
