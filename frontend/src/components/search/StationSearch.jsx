import { useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'

function StationSearch({ onSelectStation }) {
  const [research, setResearch] = useState('')
  const [stationsResult, setStationsResult] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef(null)

  const { mode } = useParams()

  const handleChange = (e) => {
    const value = e.target.value
    setResearch(value)

    if (value.length > 1) {
      fetch(`${import.meta.env.VITE_API_URL}/api/stations?q=${value}`)
      .then(res => res.json())
      .then(data => {
        setStationsResult(data.stations.slice(0, 10))
        setIsOpen(true)
      })

    } else {
      setStationsResult([])
      setIsOpen(false)
    }
  }

  const handleSelectStation = (name) => {
    onSelectStation(name)
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
              <Link to={`/timetable/${station.id}/${mode || 'departures'}`}>
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

function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD') // décomposer les caractères accentués
    .replace(/[\u0300-\u036f]/g, '') // supprimer accents
    .replace(/[\s\-_]/g, '') // supprimer espaces, tirets et underscores
}
