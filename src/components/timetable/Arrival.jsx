import { calculateDelay, getStationName, getTimeHour, getTimeMinutes, } from '../../utils'
// import Origin from './Origin'

function Arrival({ arr, onClick }) {
  const arrival = new (function () {
    (this.origin = getStationName(arr.stop_date_time.links[0].id)),
    (this.baseArrivalTime = 
      arr.stop_date_time.base_arrival_date_time || arr.stop_date_time.arrival_date_time),
    (this.realArrivalTime =
      arr.stop_date_time.arrival_date_time || arr.stop_date_time.arrival_date_time),
    (this.hour = getTimeHour(this.realArrivalTime)),
    (this.minutes = getTimeMinutes(this.realArrivalTime)),
    (this.vehicleJourneyId = arr.links[1].id),
    (this.number = arr.display_informations.trip_short_name),
    (this.lineCode = arr.display_informations.code),
    (this.trainType = arr.display_informations.network),
    (this.physicalMode = arr.display_informations.physical_mode),
    (this.lineImg = '')
  })()

  if (arrival.lineCode == '') {
    arrival.lineImg = `../../img/lines/${arrival.trainType}.svg`
  } else {
    arrival.lineImg = `../../img/lines/${arrival.trainType}_${arrival.lineCode}.svg`
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
            if(arrival.physicalMode.includes("TER")){
              e.target.src = '../../img/lines/SNCF.svg'
            } else {
              e.target.src = '../../img/lines/train-logo.svg'
            }
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
        {/* {arrival.origin ? (
          <p className='timetable-row__origin'>{arrival.origin}</p>
        ) : (
          <Origin vehicleJourneyId={arrival.vehicleJourneyId} />
        )} */}
      </div>
    </li>
  )
}

export default Arrival
