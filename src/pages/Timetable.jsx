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

  const [station, setStation] = useState(null)

  
  const [departureMode, setDepartureMode] = useState(mode === 'departures')
  const [physicalMode, setPhysicalMode] = useState(null)
  
  const depRef = useRef()
  const arrRef = useRef()
  
  useEffect(() => {
    fetch(`http://localhost:3000/api/stations?code=${stationCode}`)
    .then(res => res.json())
    .then(data => {
      setStation(data.stations[0])
      onStationSelected(data.stations[0].name)
    })
    .catch(e => {
      console.error("Erreur :", e)
    })

    return () => {
      onStationSelected('')
      setPhysicalMode(null)
    }
  }, [stationCode])

  // Remonter en haut lors du changement de page
  useEffect(() => {
    window.scrollTo(0,0)
  }, [stationCode])

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

  return (
    <main>
      {station?.physical_modes.length > 1 && (
        <div className='select-physical-mode'>
          <div className="select-physical-mode__container">
            <ul className='select-physical-mode__list'>
              <li onClick={() => setPhysicalMode(null)}>
                <button className={!physicalMode ? 'active' : ''}>
                  Toutes les lignes
                </button>
              </li>
              {station?.physical_modes.map((mode, index) => (
                <li key={`${mode}-${index}`}>
                  <button
                    className={physicalMode === mode.id ? 'active' : ''}
                    onClick={() => {
                      setPhysicalMode(mode.id)
                    }}
                  >
                    {mode.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
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
          <Departures physicalMode={physicalMode} />
        </div>
        <div
          className='timetable__container'
          style={{ display: departureMode ? 'none' : 'block' }}
        >
          <Arrivals physicalMode={physicalMode} />
        </div>
      </div>
    </main>
  )
}

export default Timetable
