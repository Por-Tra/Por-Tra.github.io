import { VscHome, VscArchive, VscAccount, VscNotebook } from 'react-icons/vsc';
import Dock from './Dock';
import './Navbar.css';

function Navbar({ currentPage, onNavigate }) {
  const items = [
    { 
      icon: <VscHome size={27} />, 
      label: 'Menu', 
      onClick: () => onNavigate('menu'),
      isActive: currentPage === 'menu'
    },
    { 
      icon: <VscArchive size={27} />, 
      label: 'Projects', 
      onClick: () => onNavigate('projects'),
      isActive: currentPage === 'projects'
    },
    { 
      icon: <VscAccount size={27} />, 
      label: 'About', 
      onClick: () => onNavigate('about'),
      isActive: currentPage === 'about'
    },
    { 
      icon: <VscNotebook size={27} />, 
      label: 'CV', 
      onClick: () => onNavigate('cv'),
      isActive: currentPage === 'cv'
    },
  ];

  return (
    <Dock 
      items={items}
      panelHeight={102}
      baseItemSize={75}
      magnification={105}
    />
  );
}

export default Navbar;
