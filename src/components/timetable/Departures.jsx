import { useEffect, useState } from "react"
import Departure from "./Departure";
import TimetableError from "./TimetableError";
import { useParams } from "react-router-dom";
import StopsListPopup from "./StopsListPopup";
import useFetch from "../../hooks/useFetch";

function Departures(){

    const {stationCode} = useParams()

    const {data, loading, error} = useFetch(`https://api.sncf.com/v1/coverage/sncf/stop_areas/${stationCode}/departures`, [stationCode])
    const nextDepartures = data.departures

    const [selectedDeparture, setSelectedDeparture] = useState(null)

    useEffect(() => {
        if (selectedDeparture) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }

        return () => document.body.classList.remove("no-scroll");
    }, [selectedDeparture]);
   
    const handleDepartureClick = (departure) => {
        setSelectedDeparture(departure)
    }

    const handleClosePopup = () => {
        setSelectedDeparture(null)
    }

    return (
        <div className="departures">
            <h2>Départs</h2>
            <ul className="departures-list">
                {loading && <h3 className="timetable-loading">Chargement des départs...</h3>}
                {error && <TimetableError mode="départs" />}
                {nextDepartures && nextDepartures.map(dep => {
                    return <Departure 
                    key={dep.links[1].id} 
                    dep={dep} 
                    onClick={handleDepartureClick}/>
                })}
            </ul>

            {selectedDeparture && (
                <StopsListPopup
                train={selectedDeparture}
                onClose={handleClosePopup} />
            )}

        </div>
    )

}

export default Departures

