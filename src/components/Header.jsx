import homeImg from '../img/home.svg'
import { Link } from 'react-router-dom';

function Header({title}){

    return (
        <header>
            <Link to="/">
                <img src={homeImg} alt="home button" />
            </Link>
            {title && <h1>{title}</h1>}
        </header>
    )
}

export default Header;