import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Rick and Morty</Link>
      </div>
      <ul className="navbar-links">
        
        <li>
          <Link to="/busqueda">Búsqueda</Link>
        </li>
        <li>
          <Link to="/estatica">Static</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
