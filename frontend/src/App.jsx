import { Routes, Route, Navigate } from "react-router-dom";
import Cities from "./pages/Cities";
import Timetable from "./pages/Timetable";
import { StationsProvider } from "./contexts/StationsContext";

function App() {

  return (
    <StationsProvider>
      <Routes>
        <Route path="/" element={<Cities />}/>
        <Route path="/timetable/:stationCode" element={<Navigate to="departures" replace />} />
        <Route path="/timetable/:stationCode/:mode" element={<Timetable />}/>
      </Routes>
    </StationsProvider>
  )

}

export default App
