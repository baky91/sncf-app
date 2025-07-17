import { calculateDelay, getStationName, getTimeHour, getTimeMinutes } from "../utils";
import TrainStops from "./TrainStops";

function Departure(dep) {
  const networks = [
    "RER",
    "TRANSILIEN",
    "TGV INOUI",
    "OUIGO",
    "TGV Lyria",
    "DB SNCF",
    "Eurostar",
  ];

  const departure = {
    direction: getStationName(dep.stop_date_time.links[1].id) || dep.display_informations.direction.split("(", 1),
    baseDepartureTime: dep.stop_date_time.base_departure_date_time,
    realDepartureTime: dep.stop_date_time.departure_date_time,
    hour: getTimeHour(dep.stop_date_time.base_departure_date_time),
    minutes: getTimeMinutes(dep.stop_date_time.base_departure_date_time),
    vehicleJourneyId: dep.links[1].id,
    number: dep.display_informations.trip_short_name,
    trainType: dep.display_informations.network,
    lineCode: dep.display_informations.code
  };

  let lineImg = ""

  if (departure.lineCode == "") {
    lineImg = `./img/lines/${departure.trainType}.svg`;
  } else {
    lineImg = `./img/lines/${departure.trainType}_${departure.lineCode}.svg`;
  }

  const {isDelayed, delayClass} = calculateDelay(departure.baseDepartureTime, departure.realDepartureTime)

  const className = `is-delayed ${delayClass}`

  return (
    <li>
      <div className="line-type">
        <img 
        className="line-img" 
        src={lineImg}
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
