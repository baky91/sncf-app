import { calculateDelay, getTimeHour, getTimeMinutes, } from '../../utils'

function DepartureRow({ dep, onClick }) {

  console.log(dep);
  
  const departure = new (function () {
    (this.direction = dep.display_informations.direction.split(" (")[0]),
    (this.baseDepartureTime = dep.stop_date_time.base_departure_date_time || dep.stop_date_time.departure_date_time),
    (this.realDepartureTime = dep.stop_date_time.departure_date_time || dep.stop_date_time.departure_date_time),
    (this.hour = getTimeHour(this.realDepartureTime)),
    (this.minutes = getTimeMinutes(this.realDepartureTime)),
    (this.vehicleJourneyId = dep.links[1].id),
    (this.number = dep.display_informations.trip_short_name),
    (this.trainType = dep.display_informations.network),
    (this.physicalMode = dep.display_informations.physical_mode),
    (this.lineCode = dep.display_informations.code),
    (this.color = dep.display_informations.color),
    (this.lineImg = null),
    (this.modeImg = null)
  })()

  if (["RER", "TRANSILIEN"].includes(departure.trainType)){
    if (!["Bus", "Car", "Autocar"].includes(departure.physicalMode)){
      departure.modeImg = `../../img/lines/${departure.trainType}.svg`
    } else {
      departure.modeImg = '../../img/lines/Bus.svg'
    }
    departure.lineImg = `../../img/lines/${departure.lineCode}.svg`
  } else if (departure.physicalMode === "TER / Intercités"){
    departure.modeImg = '../../img/lines/TER.svg'
  } else {
    departure.lineImg = `../../img/lines/${departure.trainType}.svg`
  }

  const { isDelayed, delayClass } = calculateDelay(
    departure.baseDepartureTime,
    departure.realDepartureTime
  )

  const className = `is-delayed ${delayClass}`

  return (
    <li onClick={() => onClick(departure)} className='timetable-row'>
      <div className='timetable-row__line-type'>
        <div className='timetable-row__line-type__img'
        style={{
          display: 'flex',
          gap: '3px'
        }}>
          <img 
          className='timetable-row__line-type__img__mode'
          src={departure.modeImg}
          alt="" 
          />
          <img 
          className='timetable-row__line-type__img__line'
          src={departure.lineImg}
          alt="" 
          />
        </div>
        {/* <img
          src={departure.lineImg}
          onError={(e) => {
            e.target.onerror = null
            // Ex: OUIGO Train Classique
            if (departure.trainType.includes("OUIGO")){
              e.target.src = '../../img/lines/OUIGO.svg'
            } else if(departure.physicalMode.includes("TER") || departure.trainType.includes("TER")){
              e.target.src = '../../img/lines/SNCF.svg'
            } else {
              e.target.src = '../../img/lines/train-logo.svg'
            }
          }}
        /> */}
        <p className='timetable-row__number'>{departure.number}</p>
      </div>
      <p className={className}>{isDelayed}</p>
      <p className='timetable-row__hour'>
        {departure.hour}:{departure.minutes}
      </p>
      <div className='timetable-row__line'>
        <p className='timetable-row__destination'>{departure.direction}</p>
      </div>
    </li>
  )
}

export default DepartureRow
