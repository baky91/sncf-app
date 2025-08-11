import { useNavigate, useParams } from 'react-router-dom'
import Departures from '../components/timetable/Departures'
import Arrivals from '../components/timetable/Arrivals'
import { useEffect, useRef, useState } from 'react'
import Header from '../components/layout/Header'
import StationSearch from '../components/search/StationSearch'
import ErrorPage from './ErrorPage'
import PhysicalModeSelect from '../components/timetable/PhysicalModeSelect'

function Timetable() {
  const navigate = useNavigate()
  const { stationCode, mode } = useParams()

  if (!mode) {
    // Rediriger vers departures si le mode n'est pas spécifié
    return <Navigate to={`/timetable/${stationCode}/departures`} replace />
  }

  const [station, setStation] = useState(null)
  
  const [departureMode, setDepartureMode] = useState(mode === 'departures')
  const [physicalMode, setPhysicalMode] = useState(null)
  const [error, setError] = useState(null)
  
  const depRef = useRef()
  const arrRef = useRef()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/stations?code=${stationCode}`)
    .then(res => res.json())
    .then(data => {
      setStation(data.stations[0])
    })
    .catch(e => {
      setError("Erreur")
    })

    return () => {
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

  if (error) {
    return (
      <ErrorPage />
    )
  }

  return (
    <>
      <Header title={station?.name} />
      <StationSearch />
      <main>
        {station?.physical_modes.length > 1 && (
          <PhysicalModeSelect
            station={station}
            physicalMode={physicalMode}
            setPhysicalMode={setPhysicalMode}
          />
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
    </>
  )
}

export default Timetable
