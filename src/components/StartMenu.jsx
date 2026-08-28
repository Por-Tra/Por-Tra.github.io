import { useState, useEffect, useRef, useMemo } from 'react';
import profilePic from '../assets/PP.webp';
import appRegistry from '../apps';
import { t, getAppLabel } from '../i18n/text';

const MENU_CONFIG = {
  pinnedIds: ['welcome', 'projects', 'skills', 'contact', 'chess'],
  allProgramIds: [],
  rightItems: [
    { appId: 'projects', label: { FR: 'Mes documents', EN: 'My Documents', ES: 'Mis documentos' }, icon: '/icons/folder.webp' },
    { appId: 'explorer', label: { FR: 'Poste de travail', EN: 'My Computer', ES: 'Mi PC' }, icon: '/icons/PC.webp' },
    { appId: 'control-panel', label: { FR: 'Panneau de configuration', EN: 'Control Panel', ES: 'Panel de control' }, icon: '/icons/setting.webp' },
  ],
};

const COPY = {
  allPrograms: { FR: 'Tous les programmes', EN: 'All Programs', ES: 'Todos los programas' },
  back: { FR: 'Retour', EN: 'Back', ES: 'Atras' },
  restart: { FR: 'Redémarrer', EN: 'Restart', ES: 'Reiniciar' },
  shutdown: { FR: 'Arrêter', EN: 'Shut down', ES: 'Apagar' },
};

const StartMenu = ({
  isOpen,
  onClose,
  onOpenApp,
  apps,
  onShutdown,
  onRestart,
  currentLanguage = 'FR',
}) => {
  const menuRef = useRef(null);
  const [menuStyle, setMenuStyle] = useState({});
  const [showAllPrograms, setShowAllPrograms] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Calculate menu max height to fit screen
      const updatePosition = () => {
        const windowHeight = window.innerHeight;
        const taskbarHeight = 34;
        const maxMenuHeight = Math.min(windowHeight - taskbarHeight - 10, 500);
        setMenuStyle({
          maxHeight: `${maxMenuHeight}px`,
        });
      };
      updatePosition();
      window.addEventListener('resize', updatePosition);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        window.removeEventListener('resize', updatePosition);
      };
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const startMenuApps = useMemo(() => appRegistry.getStartMenuApps(), []);
  const fallbackApps = apps && apps.length ? apps : startMenuApps;

  const resolveApp = (id) => {
    return startMenuApps.find(app => app.id === id) || fallbackApps.find(app => app.id === id);
  };

  const buildAppList = (ids, fallbackList) => {
    if (ids && ids.length > 0) {
      return ids.map(id => resolveApp(id)).filter(Boolean);
    }
    return fallbackList;
  };

  const pinnedApps = buildAppList(MENU_CONFIG.pinnedIds, fallbackApps.slice(0, 6));
  const allPrograms = buildAppList(MENU_CONFIG.allProgramIds, startMenuApps);

  const handleOpenApp = (app) => {
    if (!app) return;
    onOpenApp(app);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={menuRef}
      className="xp-start-menu"
      style={menuStyle}
    >
      {/* Main content area - two columns */}
      <div className="xp-start-menu-body">
        {/* Left Column - Blue header with user */}
        <div className="xp-start-menu-left">
          {/* User Header */}
          <div className="xp-start-menu-user-header">
            <div className="xp-start-menu-user-avatar">
              <img src={profilePic} alt="User" className="xp-start-menu-user-avatar-img" />
            </div>
            <span className="xp-start-menu-user-name">Lucas</span>
          </div>
          
          {/* Left Apps List */}
          <div className="xp-start-menu-left-list">
            <div className="xp-start-menu-divider"></div>
            {(showAllPrograms ? allPrograms : pinnedApps).map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  handleOpenApp(app);
                }}
                className="xp-start-menu-item"
              >
                <img src={app.icon} alt="" className="xp-start-menu-item-icon" />
                <span>{getAppLabel(app.id, app.name, currentLanguage)}</span>
              </button>
            ))}
            
            <div className="xp-start-menu-all-programs">
              <button
                onClick={() => setShowAllPrograms(prev => !prev)}
                className="xp-start-menu-item xp-start-menu-item--bold"
              >
                <img src="/icons/folder.webp" alt="" className="xp-start-menu-item-icon" />
                <span>{t(showAllPrograms ? COPY.back : COPY.allPrograms, currentLanguage)}</span>
                <span className="xp-start-menu-arrow">{showAllPrograms ? '◀' : '▶'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Blue background */}
        <div className="xp-start-menu-right">
          {/* Spacer for header alignment */}
          <div className="xp-start-menu-right-header"></div>
          
          {/* Right Items List */}
          <div className="xp-start-menu-right-list">
            {MENU_CONFIG.rightItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  handleOpenApp(resolveApp(item.appId));
                }}
                className="xp-start-menu-item"
              >
                <img src={item.icon} alt="" className="xp-start-menu-item-icon" />
                <span className="font-medium">{t(item.label, currentLanguage)}</span>
              </button>
            ))}
            
          </div>
        </div>
      </div>

      {/* Bottom Bar - Shutdown buttons */}
      <div className="xp-start-menu-footer">
        <button 
          onClick={onRestart}
          className="xp-start-menu-footer-btn"
        >
          <img src="/icons/restart.webp" alt="" className="xp-start-menu-footer-icon" />
          <span>{t(COPY.restart, currentLanguage)}</span>
        </button>
        <button 
          onClick={onShutdown}
          className="xp-start-menu-footer-btn"
        >
          <img src="/icons/off.webp" alt="" className="xp-start-menu-footer-icon" />
          <span>{t(COPY.shutdown, currentLanguage)}</span>
        </button>
      </div>
    </div>
  );
};

export default StartMenu;
