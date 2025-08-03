import { createContext, useContext, useState, useEffect } from 'react'

const StationsContext = createContext()

export function StationsProvider({children}){
  const [stations, setStations] = useState(new Map())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadAllStations = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/stations/all`)
        const data = await response.json()

        const stationMap = new Map()
        data.stations.forEach(station => {
          stationMap.set(station.id, station.name)
        })

        setStations(stationMap)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadAllStations()
  }, [])
  
  const getStationName = (stationCode) => {
    return stations.get(stationCode)
  }

  return (
    <StationsContext.Provider value={{stations, loading, error, getStationName}}>
      {children}
    </StationsContext.Provider>
  )

}

export function useStationName(stationCode) {
  const { getStationName } = useContext(StationsContext)
  return {
    stationName: getStationName(stationCode)
  }
}
