import { useEffect, useState } from "react";
import Arrival from "./Arrival";
import TimetableError from "./TimetableError";
import { useParams } from "react-router-dom";
import StopsListPopup from "./StopsListPopup";
import useFetch from "../../hooks/useFetch";

function Arrivals(){

    const {stationCode} = useParams()

    const [data, loading, error] = useFetch(`https://api.sncf.com/v1/coverage/sncf/stop_areas/${stationCode}/arrivals?forbidden_id%5B%5D=commercial_mode%3ATNRER&forbidden_id%5B%5D=network%3ASNCF%3ATN&`, [stationCode])
    const nextArrivals = data.arrivals

    const [selectedArrival, setSelectedArrival] = useState(null)

    useEffect(() => {
        if (selectedArrival) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }

        return () => document.body.classList.remove("no-scroll");
    }, [selectedArrival]);
   
    const handleArrivalClick = (arrival) => {
        setSelectedArrival(arrival)
    }

    const handleClosePopup = () => {
        setSelectedArrival(null)
    }

    return (
        <div className="arrivals">
            <h2>Arrivées</h2>
            <ul className="arrivals-list">
                {loading && <h3 className="timetable-loading">Chargement des arrivées...</h3>}
                {error && <TimetableError mode="arrivées" />}
                {nextArrivals && nextArrivals.map(arr => {
                    return <Arrival 
                    key={arr.links[1].id} 
                    arr={arr}
                    onClick={handleArrivalClick} />
                })}
            </ul>

            {selectedArrival && (
                <StopsListPopup
                data={selectedArrival}
                onClose={handleClosePopup} />
            )}

        </div>
    )
}

export default Arrivals