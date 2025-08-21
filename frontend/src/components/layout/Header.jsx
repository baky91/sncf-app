import { useHeaderTitle } from '../../contexts/HeaderContext'
import homeImg from '../../img/home.svg'
import { Link } from 'react-router-dom'

function Header() {

  const {headerTitle} = useHeaderTitle()

  return (
    <header>
      <Link to='/' onClick={() => window.scrollTo(0,0)}>
        <img src={homeImg} alt='home button' />
      </Link>
      {headerTitle && <h1>{headerTitle}</h1>}
    </header>
  )
}

export default Header
