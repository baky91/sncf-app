import homeImg from '../img/home.svg'
import { Link, useParams } from 'react-router-dom'
import { getStationName } from '../utils'

function Header({ title }) {

  const {stationCode} = useParams()

  return (
    <header>
      <Link to="/">
        <img src={homeImg} alt="home button" />
      </Link>
      <h1>{title || getStationName(stationCode)}</h1>
    </header>
  )
}

export default Header