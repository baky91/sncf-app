import useFetch from "../../hooks/useFetch";

function StopsListPopup({ train, onClose }) {
  // train : departure / arrival
  const {data, loading, error} = useFetch(`https://api.sncf.com/v1/coverage/sncf/vehicle_journeys/${train.vehicleJourneyId}`, [train])
  const stops = data.vehicle_journeys?.[0].stop_times || []

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-content"
        onClick={(e) => e.stopPropagation()} // éviter fermeture en cliquant dedans
      >
        <button className="popup-close" onClick={onClose}>
          ✖
        </button>
        <img src={train.lineImg} alt=""/>
        <h3>{train.trainType} {train.number}</h3>
        <p>Destination : {train.direction}</p>

        {loading && <p>Chargement des arrêts...</p>}
        {error && <p>❌ Impossible de charger les arrêts.</p>
        }

        {!loading && !error && (
          <>
            <h4>Liste des arrêts :</h4>
            <ul>
              {stops.map((stop, index) => (
                <li key={index}>{stop.stop_point.label}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default StopsListPopup;
