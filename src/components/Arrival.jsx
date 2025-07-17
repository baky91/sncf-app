import { calculateDelay, getStationName, getTimeHour, getTimeMinutes } from "../utils";
import Origin from "./Origin";

function Arrival(arr){

    const arrival = {
        origin: getStationName(arr.stop_date_time.links[0].id),
        baseArrivalTIme: arr.stop_date_time.base_arrival_date_time,
        realArrivalTime: arr.stop_date_time.arrival_date_time,
        hour: getTimeHour(arr.stop_date_time.base_arrival_date_time),
        minutes: getTimeMinutes(arr.stop_date_time.base_arrival_date_time),
        vehicleJourneyId: arr.links[1].id,
        number: arr.display_informations.trip_short_name,
        lineCode: arr.display_informations.code,
        trainType: arr.display_informations.network,
    }
    
    let lineImg = ""

    if (arrival.lineCode == "") {
        lineImg = `./img/lines/${arrival.trainType}.svg`;
    } else {
        lineImg = `./img/lines/${arrival.trainType}_${arrival.lineCode}.svg`;
    }

    const {isDelayed, delayClass} = calculateDelay(arrival.baseArrivalTIme, arrival.realArrivalTime)

    const className = `is-delayed ${delayClass}`

    return (
        <li>
            <div className="line-type">
                <img 
                src={lineImg} 
                alt="" 
                className="logo train" 
                onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "./img/lines/train-logo.svg"
                }} />
                <p className="number">{arrival.number}</p>
            </div>
            <p className={className}>{isDelayed}</p>
            <p className="hour">{arrival.hour}:{arrival.minutes}</p>
            <div className="line">
                {arrival.origin ? <p className="destination">{arrival.origin}</p> : <Origin vehicleJourneyId={arrival.vehicleJourneyId} />}
            </div>
        </li>
    )
}

export default Arrival
