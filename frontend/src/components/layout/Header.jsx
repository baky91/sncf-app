import homeImg from '../../img/home.svg'
import { Link } from 'react-router-dom'

function Header({ title }) {
  return (
    <header>
      <Link to='/' onClick={() => window.scrollTo(0,0)}>
        <img src={homeImg} alt='home button' />
      </Link>
      <h1>{title}</h1>
    </header>
  )
}

export default Header
