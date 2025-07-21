import { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import stations from "../gares.json"

function StationSearch() {
  const [research, setResearch] = useState("");
  const [stationsResult, setStationsResult] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const {mode} = useParams()

  const stationsList = useMemo(() => {
    return stations.map((station) => ({
      code: station.id,
      nom: station.name,
      ville: station.city
    }));
  }, []);
  
  const handleChange = (e) => {
    const value = e.target.value;
    setResearch(value);

    if (value.length > 1) {
      const filtered = stationsList.filter((station) => 
        normalize(station.nom).includes(normalize(value)) 
        || normalize(station.ville).includes(normalize(value))
      );
      setStationsResult(filtered.slice(0, 10)); // limiter à 10 résultats
      setIsOpen(true);
    } else {
      setStationsResult([]);
      setIsOpen(false);
    }
  };
  

  const handleSelectStation = () => {
    setResearch("");
    setIsOpen(false);
  };

  return (
    <div className="station-search">
      <input
        type="search"
        id="inp-station"
        className="station-search__input"
        placeholder="Rechercher une gare"
        value={research}
        autoComplete="off"
        onChange={handleChange}
        onFocus={() => research && setIsOpen(true)}
        onBlur={() => {
          // attendre un petit délai avant de fermer pour autoriser le clic
          setTimeout(() => setIsOpen(false), 100);
        }}
        onFocusCapture={() => {
          if (stationsResult.length > 0) setIsOpen(true);
        }}
      />

      {
      isOpen && 
      stationsResult.length > 0 && (
        <ul className="station-search__list">
          {stationsResult.map((station) => (
            <li
              className="station-search__station"
              key={station.code}
              onClick={() => handleSelectStation()}
              onMouseDown={(e) => e.preventDefault()} // éviter perte de focus
            >
              <Link
                to={`/timetable/${station.code}/${mode}`}
                state={{ stationName: station.nom }}>
                <p>
                  {station.nom}
                  <span>
                    {"("}{station.ville}{")"}
                  </span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StationSearch;

function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")               // décomposer les caractères accentués
    .replace(/[\u0300-\u036f]/g, "") // supprimer accents
    .replace(/[\s\-_]/g, "");       // supprimer espaces, tirets et underscores
}