import CityCards from "../components/CityCards"
import Header from "../components/Header"
import StationSearch from "../components/StationSearch"

function Home(){

    return (
        <>
            <Header />
            <StationSearch />
            <CityCards />
        </>
    )
}

export default Home