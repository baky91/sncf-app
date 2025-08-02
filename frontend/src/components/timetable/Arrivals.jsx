import { useEffect, useState } from 'react'
import ArrivalRow from './ArrivalRow'
import { useParams } from 'react-router-dom'
import StopsListPopup from './StopsListPopup'
import useFetch from '../../hooks/useFetch'
import TimetableError from './TimetableError'

function Arrivals({physicalMode}) {
  const { stationCode } = useParams()

  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/${stationCode}/arrivals${physicalMode ? `?physical_mode=${physicalMode}` : ""}`,
    [stationCode, physicalMode]
  )
  const nextArrivals = data.arrivals

  const length = nextArrivals?.length || 0

  const [selectedArrival, setSelectedArrival] = useState(null)

  useEffect(() => {
    if (selectedArrival) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }

    return () => document.body.classList.remove('no-scroll')
  }, [selectedArrival])

  const handleArrivalClick = (arrival) => {
    setSelectedArrival(arrival)
  }

  const handleClosePopup = () => {
    setSelectedArrival(null)
  }

  return (
    <div className='arrivals'>
      <h2>Arrivées</h2>
      <ul className='arrivals-list'>
        {error ? (
          <TimetableError mode='arrivées' />
        ) : loading ? (
          <h3 className='timetable-no-data'>Chargement des arrivées...</h3>
        ) : length !== 0 ? (
          nextArrivals.map((arr) => {
            return (
              <ArrivalRow
                key={arr.links[1].id}
                arr={arr}
                onClick={handleArrivalClick}
              />
            )
          })
        ) : (<h3 className='timetable-no-data'>Aucune arrivée à afficher</h3>)}
      </ul>

      {selectedArrival && (
        <StopsListPopup
          train={selectedArrival}
          onClose={handleClosePopup}
          stationCode={stationCode}
        />
      )}
    </div>
  )
}

export default Arrivals
