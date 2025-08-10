import { createContext, useContext } from 'react'
import useFetch from '../hooks/useFetch'

const StationsContext = createContext()

export function StationsProvider({children}){
  const {data, loading, error} = useFetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/stations/all`)
  const stations = new Map()

  data.stations?.forEach(station => {
    stations.set(station.id, station.name)
  })
  
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
