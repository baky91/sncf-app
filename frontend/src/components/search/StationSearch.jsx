import { useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'

function StationSearch() {
  const [research, setResearch] = useState('')
  const [stationsResult, setStationsResult] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef(null)


  const handleChange = (e) => {
    const value = e.target.value
    setResearch(value)

    if (value.length > 1) {
      fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/stations?q=${value}&count=10`)
      .then(res => res.json())
      .then(data => {
        setStationsResult(data.stations)
        setIsOpen(true)
      })

    } else {
      setStationsResult([])
      setIsOpen(false)
    }
  }

  const handleSelectStation = (name) => {
    setResearch('')
    setStationsResult([])
    inputRef.current.blur()
    setIsOpen(false)
  }

  return (
    <div className='station-search'>
      <input
        type='search'
        id='inp-station'
        className='station-search__input'
        ref={inputRef}
        placeholder='Rechercher une gare'
        value={research}
        autoComplete='off'
        onChange={handleChange}
        onFocus={() => research && setIsOpen(true)}
        onBlur={() => {
          // attendre un petit délai avant de fermer pour autoriser le clic
          setTimeout(() => setIsOpen(false), 100)
        }}
        onFocusCapture={() => {
          if (stationsResult.length > 0) setIsOpen(true)
        }}
      />

      {isOpen && stationsResult.length > 0 && (
        <ul className='station-search__list'>
          {stationsResult.map((station) => (
            <li
              className='station-search__station'
              key={station.id}
              onClick={() => {
                handleSelectStation(station.name)
              }}
              onMouseDown={(e) => e.preventDefault()} // éviter perte de focus
            >
              <Link to={`/timetable/${station.id}?mode=departures&physical_mode=all`}>
                <p>
                  {station.name}
                  <span>
                    {'('}
                    {station.city}
                    {')'}
                  </span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default StationSearch
