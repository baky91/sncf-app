import useFetch from '../../hooks/useFetch'
import { getStopTime, calculateStopDuration } from '../../utils'

function StopsListPopup({ stationCode, train, onClose }) {
  // train : departure / arrival
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/${train.vehicleJourneyId}/vehicle_journeys`,
    [train]
  )
  const stops = data.vehicle_journeys?.[0].stop_times || []

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
        <div className='timetable-row__line-type__img'
        style={{
          display: 'flex',
          gap: '3px',
          marginBottom: '.5rem'
        }}>
          <img 
          className='timetable-row__line-type__img__mode'
          src={train.modeImg}
          alt="" 
          />
          <img 
          className='timetable-row__line-type__img__line'
          src={train.lineImg}
          alt="" 
          />
        </div>
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

                  if (stop.stop_point.stop_area.id === stationCode) {
                    stopPassed = true
                  }

                  return (
                    <li key={index} className='stop'>
                      <div className='stop__icon'>
                        <span
                          className='stop__circle'
                          style={{
                            background: '#fff',
                            border: `3px solid ${stopPassed ? (train.color ? `#${train.color}` : '#000') : '#818181'}`
                          }}
                        ></span>
                        {index !== stops.length - 1 && (
                          <span
                            className='stop__line'
                            style={{
                              background: stopPassed ? (train.color ? `#${train.color}` : '#fff') : '#818181',
                            }}
                          ></span>
                        )}
                      </div>
                      <div className='stop__content'>
                        <span className='stop__hour'>
                          {getStopTime(stop.arrival_time)}
                        </span>
                        <div className='stop__infos'>
                          <p className='stop__name'>{stop.stop_point.stop_area.label}</p>
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
