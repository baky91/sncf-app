import { useNavigate, useParams } from 'react-router-dom'
import Departures from '../components/timetable/Departures'
import Arrivals from '../components/timetable/Arrivals'
import { getStationName } from '../utils'
import { useEffect, useRef, useState } from 'react'

function Timetable({ onStationSelected }) {
  const navigate = useNavigate()
  const { stationCode, mode } = useParams()

  if (!mode) {
    // Rediriger vers departures si le mode n'est pas spécifié
    return <Navigate to={`/timetable/${stationCode}/departures`} replace />
  }

  const stationName = getStationName(stationCode)
  const [departureMode, setDepartureMode] = useState(mode === 'departures')

  const depRef = useRef()
  const arrRef = useRef()

  const handleClick = (mode) => {
    setDepartureMode(mode === 'departures')

    if (mode === 'departures') {
      depRef.current.classList.add('active')
      arrRef.current.classList.remove('active')
    } else {
      depRef.current.classList.remove('active')
      arrRef.current.classList.add('active')
    }

    navigate(`/timetable/${stationCode}/${mode}`, {replace: true})
  }

  useEffect(() => {
    onStationSelected(stationName)    

    return () => onStationSelected('')
  }, [])

  return (
    <main>
      <div className='select-mode'>
        <div className='select-mode__buttons'>
          <button
            className={
              departureMode ? 'departures-btn active' : 'departures-btn'
            }
            ref={depRef}
            onClick={() => {
              handleClick('departures')
            }}
          >
            Afficher les départs
          </button>

          <button
            className={departureMode ? 'arrivals-btn' : 'arrivals-btn active'}
            ref={arrRef}
            onClick={() => {
              handleClick('arrivals')
            }}
          >
            Afficher les arrivées
          </button>
        </div>
      </div>
      <div className='timetable'>
        <div
          className='timetable__container'
          style={{ display: departureMode ? 'block' : 'none' }}
        >
          <Departures />
        </div>
        <div
          className='timetable__container'
          style={{ display: departureMode ? 'none' : 'block' }}
        >
          <Arrivals />
        </div>
      </div>
    </main>
  )
}

export default Timetable
