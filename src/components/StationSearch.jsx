import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import stations from "../gares.json"

function StationSearch() {
  const [research, setResearch] = useState("");
  const [stationsResult, setStationsResult] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const stationsList = useMemo(() => {
    return stations.results.map((station) => ({
      code: station.code,
      nom: station.nom
    }));
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setResearch(value);

    if (value.length > 1) {
      const filtered = stationsList.filter((station) => 
        normalize(station.nom).includes(normalize(value))
      );
      setStationsResult(filtered.slice(0, 10)); // limiter à 10 résultats
      setIsOpen(true);
    } else {
      setStationsResult([]);
      setIsOpen(false);
    }
  };

  const handleSelectStation = (station) => {
    setResearch(station.nom); // remplir l'input
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
              onClick={() => handleSelectStation(station)}
              onMouseDown={(e) => e.preventDefault()} // éviter perte de focus
            >
              <Link
                to={`../${station.code}`}
                state={{ stationName: station.nom }}>
                <span>
                  {station.nom}
                </span>{" "}
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