import { Link } from 'react-router-dom'
import { NavProps } from '../../types'

const NavLinks: React.FC<NavProps> = ({ appState, handleClick }) => {
    if (appState.doMode) {
        return <></>
    } else if (appState.isAuthenticated) {
        return (
            <section className='nav-links'>
                <Link to='/landingpage'>
                    <button>About</button>
                </Link>
            </section>
        )
    } else {
        return (
            <section className='nav-links'>
                <button onClick={handleClick}>Log In</button>
            </section>
        )
    }
}

export default NavLinks
