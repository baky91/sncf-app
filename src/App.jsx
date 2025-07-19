import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Timetable from "./pages/Timetable";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/timetable/:stationCode" element={<Timetable />}/>
    </Routes>
  )
  
}

export default App
