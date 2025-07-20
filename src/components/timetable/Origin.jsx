import useFetch from "../../hooks/useFetch"

export function Origin({vehicleJourneyId}){

  const {data, loading, error} = useFetch(`https://sncf-api-proxy.vercel.app/api/${vehicleJourneyId}/vehicle_journeys`, [vehicleJourneyId])
  const origin = data.vehicle_journeys?.[0].stop_times[0].stop_point.name

  return (
    <>
      {loading && <p className="destination">Chargement...</p>}
      {error && <p className="destination" style={{color: "#ff6b6b", fontSize: "1rem"}}>Erreur lors du chargement!</p>}
      {origin && <p className="destination">{origin}</p>}
    </>
  )
}

export default Origin
