import { useEffect } from 'react'
import cities from '../cities.json'
import CityCard from '../components/city/CityCard'
import Header from '../components/layout/Header'
import StationSearch from '../components/search/StationSearch'

function Cities() {

  // Remonter en haut lors du changement de page
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  return (
    <>
      <p style={{ textAlign: 'center' }}>... ou</p>
      <div className='station-select'>
        <h3>Séléctionner une gare</h3>
      </div>

      <div className='city-cards'>
        <div className='cities'>
          {cities.map((city) => {
            return (
              <CityCard
                key={city.name}
                city={city}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Cities
