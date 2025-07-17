import { useEffect, useState, useRef } from "react";
import axios from "axios";

function StopsListPopup({ data, onClose }) {
  // data : departure / arrival
  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);


  const renderAfterCalled = useRef(false)
  renderAfterCalled.current = false

  useEffect(() => {

    if (!renderAfterCalled.current){
      axios(`https://api.sncf.com/v1/coverage/sncf/vehicle_journeys/${data.vehicleJourneyId}`, {
        headers: { Authorization: `${import.meta.env.VITE_API_KEY}`}
      })
      .then(res => setStops(res.data.vehicle_journeys[0].stop_times || []))
      .catch(e => {
        setError("Erreur :")
        console.error("Erreur :", e)
      })
      .finally(setLoading(false))
    }
    renderAfterCalled.current = true
  }, [data]);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup-content"
        onClick={(e) => e.stopPropagation()} // éviter fermeture en cliquant dedans
      >
        <button className="popup-close" onClick={onClose}>
          ✖
        </button>
        <img src={data.lineImg} alt=""/>
        <h3>{data.trainType} {data.number}</h3>
        <p>Destination : {data.direction}</p>

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
