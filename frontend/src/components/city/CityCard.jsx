import { useRef } from 'react'
import { Link } from 'react-router-dom'

function CityCard({ city }) {
  const imgUrl = city.image
  const cardRef = useRef(null)

  const handleClick = () => {
    cardRef.current.classList.toggle('is-open')
  }

  const handleMouseEnter = () => {
    cardRef.current.classList.add('is-open')
  }

  const handleMouseLeave = () => {
    cardRef.current.classList.remove('is-open')
  }

  return (
    <div className='city-card' ref={cardRef}>
      <img src={imgUrl} />
      <div
        className='city-card__content'
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className='city-card__header'>
          <p>{city.name}</p>
          <span className='city-card__arrow'></span>
        </div>
        <ul className='city-card__stations-list'>
          {city.stations.map((station, index) => {
            return (
              <li
                key={`${station.value}-${index}`}
              >
                <Link to={`/timetable/${station.value}?mode=departures&physical_mode=all`}>
                  {station.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default CityCard
