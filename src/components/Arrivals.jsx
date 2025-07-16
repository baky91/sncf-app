import { useEffect, useState, useRef } from "react";
import Arrival from "./Arrival";
import TimetableError from "./TimetableError";
import { useParams } from "react-router-dom";

function Arrivals(){

    const {stationCode} = useParams()

    const [nextArrivals, setNextArrivals] = useState([])
    const url = `https://api.sncf.com/v1/coverage/sncf/stop_areas/${stationCode}/arrivals`
    const renderAfterCalled = useRef(false)

    useEffect(() => {
        if (!renderAfterCalled.current){
            fetch(url, {
                headers: { Authorization: `${import.meta.env.VITE_API_KEY}`}
            })
            .then(res => res.json())
            .then(data => setNextArrivals(data.arrivals))
            .catch(error => console.error("Erreur :", error))
        }
        renderAfterCalled.current = true

    }, [stationCode])

    return (
        <div className="arrivals">
            <h2>Arrivées</h2>
            <ul>
                {
                    nextArrivals ? nextArrivals.map(arr => {
                        return <Arrival key={arr.links[1].id} {...arr} />
                    }) : <TimetableError mode="arrivées" />
                }
            </ul>
        </div>
    )
}

export default Arrivals