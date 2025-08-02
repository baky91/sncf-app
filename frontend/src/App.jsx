import { Routes, Route, Navigate } from "react-router-dom";
import Cities from "./pages/Cities";
import Timetable from "./pages/Timetable";
import StationSearch from "./components/search/StationSearch";
import Header from "./components/layout/Header";
import { useState } from "react";

function App() {

  const [headerTitle, setHeaderTitle] = useState("")

  return (
    <>
      <Header title={headerTitle}/>
      <StationSearch onSelectStation={setHeaderTitle}/>
      <Routes>
        <Route path="/" element={<Cities onSelectStation={setHeaderTitle}/>}/>
        <Route path="/timetable/:stationCode" element={<Navigate to="departures" replace />} />
        <Route path="/timetable/:stationCode/:mode" element={<Timetable onStationSelected={setHeaderTitle} />}/>
      </Routes>
    </>
    
  )

}

export default App
