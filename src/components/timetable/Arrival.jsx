import { calculateDelay, getStationName, getTimeHour, getTimeMinutes } from "../../utils";
import Origin from "./Origin";

function Arrival({arr, onClick}){

    const arrival = new function(){
        this.origin = getStationName(arr.stop_date_time.links[0].id),
        this.baseArrivalTime = arr.stop_date_time.base_arrival_date_time || arr.stop_date_time.arrival_date_time,
        this.realArrivalTime = arr.stop_date_time.arrival_date_time || arr.stop_date_time.arrival_date_time,
        this.hour = getTimeHour(this.realArrivalTime),
        this.minutes = getTimeMinutes(this.realArrivalTime),
        this.vehicleJourneyId = arr.links[1].id,
        this.number = arr.display_informations.trip_short_name,
        this.lineCode = arr.display_informations.code,
        this.trainType = arr.display_informations.network,
        this.lineImg = ""
    }



    if (arrival.lineCode == "") {
        arrival.lineImg = `../../img/lines/${arrival.trainType}.svg`;
    } else {
        arrival.lineImg = `../../img/lines/${arrival.trainType}_${arrival.lineCode}.svg`;
    }

    const {isDelayed, delayClass} = calculateDelay(arrival.baseArrivalTime, arrival.realArrivalTime)

    const className = `is-delayed ${delayClass}`

    return (
        <li onClick={() => onClick(arrival)} className="timetable-row">
            <div className="line-type">
                <img 
                src={arrival.lineImg} 
                alt="" 
                className="logo train" 
                onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "../../img/lines/train-logo.svg"
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
