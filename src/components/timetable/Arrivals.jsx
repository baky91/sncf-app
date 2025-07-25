import { useEffect, useState } from 'react'
import ArrivalRow from './ArrivalRow'
import { useParams } from 'react-router-dom'
import StopsListPopup from './StopsListPopup'
import useFetch from '../../hooks/useFetch'

function Arrivals() {
  const { stationCode } = useParams()

  const { data, loading } = useFetch(
    `https://sncf-api-proxy.vercel.app/api/${stationCode}/arrivals`,
    [stationCode]
  )
  const nextArrivals = data.arrivals
console.log(nextArrivals)
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
        {loading && (
          <h3 className='timetable-loading'>Chargement des arrivées...</h3>
        )}
        {!loading && length === 0 && (
          <h3 className='timetable-no-data'>Aucune arrivée à afficher</h3>
        )}
        {nextArrivals &&
          nextArrivals.map((arr) => {
            return (
              <ArrivalRow
                key={arr.links[1].id}
                arr={arr}
                onClick={handleArrivalClick}
              />
            )
          })}
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
