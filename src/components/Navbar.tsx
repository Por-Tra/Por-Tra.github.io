import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'PROJETS' },
    { path: '/apropos', label: 'À PROPOS' },
    { path: '/contact', label: 'CONTACT' }
  ];

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          PORT//FOLIO
        </Link>
        
        <ul className="navbar-menu">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path}
                className={`navbar-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="link-text">{item.label}</span>
                {location.pathname === item.path && (
                  <motion.div 
                    className="active-indicator"
                    layoutId="activeIndicator"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
