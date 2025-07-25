import useFetch from '../../hooks/useFetch'
import { getStopTime, calculateStopDuration } from '../../utils'

function StopsListPopup({ stationCode, train, onClose }) {
  // train : departure / arrival
  const { data, loading, error } = useFetch(
    `https://sncf-api-proxy.vercel.app/api/${train.vehicleJourneyId}/vehicle_journeys`,
    [train]
  )
  const stops = data.vehicle_journeys?.[0].stop_times || []
  const currentStation = stationCode.split('stop_area:')[1]

  let stopPassed = false

  return (
    <div className='popup-overlay' onClick={onClose}>
      <div
        className='popup-content'
        onClick={(e) => e.stopPropagation()} // éviter fermeture en cliquant dedans
      >
        <button className='popup-close' onClick={onClose}>
          ✖
        </button>
        <img
          src={train.lineImg}
          alt=''
          onError={(e) => {
            e.target.onerror = null
            // Ex: OUIGO Train Classique
            if (train.trainType.includes('OUIGO')) {
              e.target.src = '../../img/lines/OUIGO.svg'
            } else if (train.physicalMode.includes("TER") || train.trainType.includes("TER")) {
              e.target.src = '../../img/lines/SNCF.svg'
            } else {
              e.target.src = '../../img/lines/train-logo.svg'
            }
          }}
        />
        <h3>
          {train.trainType} {train.number}
        </h3>
        <p>Destination : {train.direction}</p>

        {loading && <p>Chargement des arrêts...</p>}
        {error && <p>❌ Impossible de charger les arrêts.</p>}

        {!loading && !error && (
          <>
            <h4>Liste des arrêts :</h4>
            <div className='stops-list-container'>
              <ul className='stops-list'>
                {stops.map((stop, index) => {
                  const stopDuration = calculateStopDuration(
                    stop.arrival_time,
                    stop.departure_time
                  )

                  if (stop.stop_point.id.includes(currentStation)) {
                    stopPassed = true
                  }

                  return (
                    <li key={index} className='stop'>
                      <div className='stop__icon'>
                        <span
                          className='stop__circle'
                          style={{
                            background: stopPassed ? '#fff' : '#818181',
                          }}
                        ></span>
                        {index !== stops.length - 1 && (
                          <span
                            className='stop__line'
                            style={{
                              background: stopPassed ? '#fff' : '#818181',
                            }}
                          ></span>
                        )}
                      </div>
                      <div className='stop__content'>
                        <span className='stop__hour'>
                          {getStopTime(stop.arrival_time)}
                        </span>
                        <div className='stop__infos'>
                          <p className='stop__name'>{stop.stop_point.label}</p>
                          {stop.arrival_time !== stop.departure_time &&
                          stopDuration > 1 ? (
                            <p className='stop__duration'>
                              {stopDuration} minutes d'arrêt
                            </p>
                          ) : undefined}
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default StopsListPopup
