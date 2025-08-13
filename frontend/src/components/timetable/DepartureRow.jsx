import { useStationName } from '../../contexts/StationsContext'
import { calculateDelay, getTimeHour, getTimeMinutes, } from '../../utils'

function DepartureRow({ dep, onClick }) {
  const {stationName} = useStationName(dep.stop_date_time.links[1].id)  

  const departure = new (function () {
    (this.direction = stationName),
    (this.baseDepartureTime = dep.stop_date_time.base_departure_date_time || dep.stop_date_time.departure_date_time),
    (this.realDepartureTime = dep.stop_date_time.departure_date_time || dep.stop_date_time.departure_date_time),
    (this.hour = getTimeHour(this.realDepartureTime)),
    (this.minutes = getTimeMinutes(this.realDepartureTime)),
    (this.vehicleJourneyId = dep.links[1].id),
    (this.network = dep.display_informations.network),
    (this.physicalMode = dep.display_informations.physical_mode),
    (this.number = this.physicalMode === 'Bus' ? dep.display_informations.name :  dep.display_informations.headsign),
    (this.lineCode = dep.display_informations.code),
    (this.color = dep.display_informations.color),
    (this.lineImg = '')
  })()

  if (departure.physicalMode === 'TER / Intercités'){
    departure.lineImg = '../../img/lines/SNCF.svg'
  } else if (departure.physicalMode === 'RER / Transilien') {
    departure.lineImg = `../../img/lines/${departure.network}_${departure.lineCode}.svg`
  } else if (departure.physicalMode === 'Bus' || departure.physicalMode === 'Autocar') {
    departure.lineImg = '../../img/lines/Bus.svg'
  } else {
    departure.lineImg = `../../img/lines/${departure.network}.svg`
  }

  const { isDelayed, delayClass } = calculateDelay(
    departure.baseDepartureTime,
    departure.realDepartureTime
  )

  const className = `is-delayed ${delayClass}`

  return (
    <li onClick={() => onClick(departure)} className='timetable-row'>
      <div className='timetable-row__line-type'>
        <div className="timetable-row__line-type__image">
          <img
            src={departure.lineImg}
            onError={(e) => {
              e.target.onerror = null
              e.target.src = '../../img/lines/train-logo.svg'
            }}
          />
        </div>
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
