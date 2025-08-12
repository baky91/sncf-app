import { calculateDelay, getTimeHour, getTimeMinutes, } from '../../utils'
import { useStationName } from '../../contexts/StationsContext'

function ArrivalRow({ arr, onClick }) {
  const {stationName} = useStationName(arr.stop_date_time.links[0].id)  

  const arrival = new (function () {
    (this.origin = stationName),
    (this.baseArrivalTime = arr.stop_date_time.base_arrival_date_time || arr.stop_date_time.arrival_date_time),
    (this.realArrivalTime = arr.stop_date_time.arrival_date_time || arr.stop_date_time.arrival_date_time),
    (this.hour = getTimeHour(this.realArrivalTime)),
    (this.minutes = getTimeMinutes(this.realArrivalTime)),
    (this.vehicleJourneyId = arr.links[1].id),
    (this.lineCode = arr.display_informations.code),
    (this.network = arr.display_informations.network),
    (this.physicalMode = arr.display_informations.physical_mode),
    (this.number = this.physicalMode === 'Bus' ? arr.display_informations.name :  arr.display_informations.headsign),
    (this.color = arr.display_informations.color),
    (this.lineImg = '')
  })()

  if (arrival.physicalMode === 'TER / Intercités'){
    arrival.lineImg = '../../img/lines/SNCF.svg'
  } else if (arrival.physicalMode === 'RER / Transilien') {
    arrival.lineImg = `../../img/lines/${arrival.network}_${arrival.lineCode}.svg`
  } else if (arrival.physicalMode === 'Bus' || arrival.physicalMode === 'Autocar') {
    arrival.lineImg = '../../img/lines/Bus.svg'
  } else {
    arrival.lineImg = `../../img/lines/${arrival.network}.svg`
  }

  const { isDelayed, delayClass } = calculateDelay(
    arrival.baseArrivalTime,
    arrival.realArrivalTime
  )

  const className = `is-delayed ${delayClass}`

  return (
    <li onClick={() => onClick(arrival)} className='timetable-row'>
      <div className='timetable-row__line-type'>
        <img
          src={arrival.lineImg}
          alt=''
          onError={(e) => {
            e.target.onerror = null
            e.target.src = '../../img/lines/train-logo.svg'
          }}
        />
        <p className='timetable-row__number'>{arrival.number}</p>
      </div>
      <p className={className}>{isDelayed}</p>
      <p className='timetable-row__hour'>
        {arrival.hour}:{arrival.minutes}
      </p>
      <div className='timetable-row__line'>
        <p className='timetable-row__origin'>{arrival.origin}</p>
      </div>
    </li>
  )
}

export default ArrivalRow
