import { useParams, useSearchParams } from 'react-router-dom'
import Departures from '../components/timetable/Departures'
import Arrivals from '../components/timetable/Arrivals'
import { useEffect, useState } from 'react'
import PhysicalModeSelect from '../components/timetable/PhysicalModeSelect'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { useHeaderTitle } from '../contexts/HeaderContext'

function Timetable() {
  const { stationCode } = useParams()
  const [searchParams, setSearchParams] = useSearchParams({
    mode: '',
    physical_mode: '',
  })
  const mode = searchParams.get('mode') || 'departures'
  const physicalMode = searchParams.get('physical_mode') || 'all'

  const [station, setStation] = useState(null)
  const [error, setError] = useState(null)

  const {setHeaderTitle} = useHeaderTitle()

  // Récupérer la gare actuelle
  useEffect(() => {
    window.scrollTo(0, 0)

    fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/stations?code=${stationCode}`)
      .then((res) => res.json())
      .then((data) => {
        setStation(data.stations[0])
      })
      .catch((e) => {
        setError('Erreur', e.message)
      })
      
    setSearchParams(
      (prev) => {
        prev.set('mode', mode)
        prev.set('physical_mode', physicalMode)
        return prev
      },
      { replace: true }
    )

    return () => setHeaderTitle(null)
  }, [stationCode])

  useEffect(() => {
    // Changer le titre du haut de page
    setHeaderTitle(station?.name)
  }, [station])
  
  // Changer le titre de la page
  useDocumentTitle(station ? `${station?.name} - Horaires` : null)

  const handleClick = (mode) => {
    setSearchParams(
      (prev) => {
        prev.set('mode', mode)
        return prev
      },
      { replace: true }
    )
  }

  if (error) {
    throw new Error(error)
  }

  return (
    <>
      {station?.physical_modes.length > 1 && (
        <PhysicalModeSelect
          station={station}
          physicalMode={physicalMode}
          setSearchParams={setSearchParams}
        />
      )}

      <div className='select-mode'>
        <div className='select-mode__buttons'>
          <button
            className={
              mode === 'departures'
                ? 'departures-btn active'
                : 'departures-btn'
            }
            onClick={() => {
              handleClick('departures')
            }}
          >
            Afficher les départs
          </button>

          <button
            className={
              mode === 'departures' ? 'arrivals-btn' : 'arrivals-btn active'
            }
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
          style={{ display: mode === 'departures' ? 'block' : 'none' }}
        >
          <Departures physicalMode={physicalMode} />
        </div>
        <div
          className='timetable__container'
          style={{ display: mode === 'departures' ? 'none' : 'block' }}
        >
          <Arrivals physicalMode={physicalMode} />
        </div>
      </div>
    </>
  )
}

export default Timetable
