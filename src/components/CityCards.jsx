import cities from '../cities.json'
import CityCard from './CityCard'

function CityCards({ onSelectStation }) {
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
                onSelectStation={onSelectStation}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default CityCards
