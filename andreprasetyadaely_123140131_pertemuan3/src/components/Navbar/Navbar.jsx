import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Navbar.css';

/**
 * Komponen Navbar
 * Header navigasi aplikasi dengan logo "ayu" dan nama "dre"
 */
export function Navbar({ totalBooks = 0 }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand">
          <span className="brand-logo-badge">ayu</span>
          <span className="brand-name">dre</span>
        </NavLink>

        <nav className="navbar-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            Beranda
          </NavLink>
          <NavLink
            to="/stats"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            Statistik
            {typeof totalBooks === 'number' && (
              <span className="nav-badge">{totalBooks}</span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

Navbar.propTypes = {
  totalBooks: PropTypes.number,
};

export default Navbar;
