import StationSearch from "../components/StationSearch"
import { useLocation, useParams } from "react-router-dom"
import Header from "../components/Header"
import Departures from "../components/timetable/Departures"
import Arrivals from "../components/timetable/Arrivals"
import { getStationName } from "../utils"
import { useRef, useState } from "react"

function Timetable(){

    const {stationCode} = useParams()

    const location = useLocation()
    const stationName = location.state?.stationName || getStationName(stationCode)
    const [departureMode, setDepartureMode] = useState(true)

    const depRef = useRef()
    const arrRef = useRef()

    return (
        <>
            <Header title={stationName}/>
            <StationSearch />
            <div className="select-mode">
                <div className="select-mode__buttons">
                    <button 
                    className="departures-btn active" 
                    ref={depRef}
                    onClick={() => {
                        setDepartureMode(true)
                        depRef.current.classList.add("active")
                        arrRef.current.classList.remove("active")
                    }}
                    >Afficher les départs</button>

                    <button 
                    className="arrivals-btn" 
                    ref={arrRef}
                    onClick={() => {
                        setDepartureMode(false)
                        depRef.current.classList.remove("active")
                        arrRef.current.classList.add("active")
                    }}
                    >Afficher les arrivées</button>
                </div>
            </div>
            <div className="timetables">
                <div className="timetables__container" style={{display: departureMode ? "block" : "none"}}>
                    <Departures/>
                </div>
                <div className="timetables__container" style={{display: departureMode ? "none" : "block"}}>
                    <Arrivals/>
                </div>

                {/* {departureMode && <Departures stationCode={stationCode}/>}
                {!departureMode && <Arrivals stationCode={stationCode} />} */}
            </div>
        </>
    )
}

export default Timetable


