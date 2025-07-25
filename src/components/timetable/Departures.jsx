import { useEffect, useState } from 'react'
import DepartureRow from './DepartureRow'
import { useParams } from 'react-router-dom'
import StopsListPopup from './StopsListPopup'
import useFetch from '../../hooks/useFetch'

function Departures() {
  const { stationCode } = useParams()

  const { data, loading } = useFetch(
    `https://sncf-api-proxy.vercel.app/api/${stationCode}/departures`,
    [stationCode]
  )
  const nextDepartures = data.departures
console.log(nextDepartures);

  const length = nextDepartures?.length || 0

  const [selectedDeparture, setSelectedDeparture] = useState(null)

  useEffect(() => {
    if (selectedDeparture) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }

    return () => document.body.classList.remove('no-scroll')
  }, [selectedDeparture])

  const handleDepartureClick = (departure) => {
    setSelectedDeparture(departure)
  }

  const handleClosePopup = () => {
    setSelectedDeparture(null)
  }

  return (
    <div className='departures'>
      <h2>Départs</h2>
      <ul className='departures-list'>
        {loading && (
          <h3 className='timetable-loading'>Chargement des départs...</h3>
        )}
        {!loading && length === 0 && (
          <h3 className='timetable-no-data'>Aucun départ à afficher</h3>
        )}
        {nextDepartures &&
          nextDepartures.map((dep) => {
            return (
              <DepartureRow
                key={dep.links[1].id}
                dep={dep}
                onClick={handleDepartureClick}
              />
            )
          })}
      </ul>

      {selectedDeparture && (
        <StopsListPopup
          train={selectedDeparture}
          onClose={handleClosePopup}
          stationCode={stationCode}
        />
      )}
    </div>
  )
}

export default Departures
