import { useState } from 'react';
import { useTranslation } from '../i18n';
import GlassIcons from './GlassIcons';
import { FiFileText, FiBook, FiHeart, FiCloud, FiEdit, FiBarChart2 } from 'react-icons/fi';
import './Menu.css';

function Menu({ onNavigate }) {
  const { t, lang, setLang } = useTranslation();

  // Glass icons items mapped to navigation
  const items = [
    { icon: <FiFileText />, color: 'blue', label: t('nav.projects') || 'Projects', onClick: () => onNavigate('projects') },
    { icon: <FiBook />, color: 'purple', label: t('nav.about') || 'About', onClick: () => onNavigate('about') },
    { icon: <FiHeart />, color: 'red', label: t('nav.cv') || 'CV', onClick: () => onNavigate('cv') },
    { icon: <FiCloud />, color: 'indigo', label: 'Weather', onClick: () => {} },
    { icon: <FiEdit />, color: 'orange', label: 'Notes', onClick: () => {} },
    { icon: <FiBarChart2 />, color: 'green', label: 'Stats', onClick: () => {} },
  ];

  return (
    <div className="bios-container">
      {/* Main content */}
      <div className="bios-main">
        <div className="menu-header">
          <h1>{t('index.welcome') || 'Welcome'}</h1>
          <p>{t('index.subtitle') || 'Select a section'}</p>
        </div>

        <div style={{ height: '600px', position: 'relative' }}>
          <GlassIcons items={items} className="custom-class"/>
        </div>
      </div>

      {/* Language selector */}
      <div className="lang-select" role="navigation" aria-label="Language selection">
        <button
          className={lang === 'fr' ? 'active' : ''}
          onClick={() => setLang('fr')}
        >
          FR
        </button>
        <button
          className={lang === 'en' ? 'active' : ''}
          onClick={() => setLang('en')}
        >
          EN
        </button>
        <button
          className={lang === 'es' ? 'active' : ''}
          onClick={() => setLang('es')}
        >
          ES
        </button>
      </div>
    </div>
  );
}

export default Menu;
