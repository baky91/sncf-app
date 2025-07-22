import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Timetable from "./pages/Timetable";
import StationSearch from "./components/StationSearch";
import Header from "./components/Header";
import { useState } from "react";

function App() {

  const [headerTitle, setHeaderTitle] = useState("")

  return (
    <>
      <Header title={headerTitle}/>
      <StationSearch onSelectStation={setHeaderTitle}/>
      <Routes>
        <Route path="/" element={<Home onSelectStation={setHeaderTitle}/>}/>
        <Route path="/timetable/:stationCode" element={<Navigate to="departures" replace />} />
        <Route path="/timetable/:stationCode/:mode" element={<Timetable onStationSelected={setHeaderTitle} />}/>
      </Routes>
    </>
    
  )
  
}

export default App
