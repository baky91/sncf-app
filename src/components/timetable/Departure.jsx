import { calculateDelay, getStationName, getTimeHour, getTimeMinutes } from "../../utils";

function Departure({dep, onClick}) {

  const departure = new function(){
    this.direction = getStationName(dep.stop_date_time.links[1].id),
    this.baseDepartureTime = dep.stop_date_time.base_departure_date_time || dep.stop_date_time.departure_date_time,
    this.realDepartureTime = dep.stop_date_time.departure_date_time || dep.stop_date_time.departure_date_time,
    this.hour = getTimeHour(this.baseDepartureTime),
    this.minutes = getTimeMinutes(this.baseDepartureTime),
    this.vehicleJourneyId = dep.links[1].id,
    this.number = dep.display_informations.trip_short_name,
    this.trainType = dep.display_informations.network,
    this.lineCode = dep.display_informations.code,
    this.lineImg = ""
  }

  if (departure.lineCode == "") {
    departure.lineImg = `./img/lines/${departure.trainType}.svg`;
  } else {
    departure.lineImg = `./img/lines/${departure.trainType}_${departure.lineCode}.svg`;
  }

  const {isDelayed, delayClass} = calculateDelay(departure.baseDepartureTime, departure.realDepartureTime)

  const className = `is-delayed ${delayClass}`

  return (
    <li onClick={() => onClick(departure)}>
      <div className="line-type">
        <img 
        className="line-img" 
        src={departure.lineImg}
        onError={(e) => {
          e.target.onerror = null
          e.target.src = "./img/lines/train-logo.svg"
        }} />
        <p className="number">{departure.number}</p>
      </div>
      <p className={className}>{isDelayed}</p>
      <p className="hour">{departure.hour}:{departure.minutes}</p>
      <div className="line">
        <p className="destination">{departure.direction}</p>
        
      </div>
    </li>
  );
}

export default Departure;
