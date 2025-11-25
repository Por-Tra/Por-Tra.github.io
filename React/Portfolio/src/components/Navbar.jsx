import { VscHome, VscArchive, VscAccount, VscNotebook } from 'react-icons/vsc';
import Dock from './Dock';
import './Navbar.css';

function Navbar({ currentPage, onNavigate }) {
  const items = [
    { 
      icon: <VscHome size={54} />, 
      label: 'Menu', 
      onClick: () => onNavigate('menu'),
      isActive: currentPage === 'menu'
    },
    { 
      icon: <VscArchive size={54} />, 
      label: 'Projects', 
      onClick: () => onNavigate('projects'),
      isActive: currentPage === 'projects'
    },
    { 
      icon: <VscAccount size={54} />, 
      label: 'About', 
      onClick: () => onNavigate('about'),
      isActive: currentPage === 'about'
    },
    { 
      icon: <VscNotebook size={54} />, 
      label: 'CV', 
      onClick: () => onNavigate('cv'),
      isActive: currentPage === 'cv'
    },
  ];

  return (
    <Dock 
      items={items}
      panelHeight={204}
      baseItemSize={150}
      magnification={210}
    />
  );
}

export default Navbar;
