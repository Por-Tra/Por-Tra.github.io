import { useState, useEffect, useRef, useMemo } from 'react';
import profilePic from '../assets/PP.webp';
import appRegistry from '../apps';
import { t, getAppLabel } from '../i18n/text';

const MENU_CONFIG = {
  pinnedIds: ['welcome', 'projects', 'skills', 'contact', 'chess'],
  allProgramIds: [],
  // Colonne de droite, par groupes séparés d'un trait (le premier groupe est en gras, comme dans XP)
  rightGroups: [
    [
      { appId: 'projects', label: { FR: 'Mes documents', EN: 'My Documents', ES: 'Mis documentos' }, icon: '/icons/folder.webp' },
      { appId: 'explorer', label: { FR: 'Poste de travail', EN: 'My Computer', ES: 'Mi PC' }, icon: '/icons/PC.webp' },
    ],
    [
      { appId: 'control-panel', label: { FR: 'Panneau de configuration', EN: 'Control Panel', ES: 'Panel de control' }, icon: '/icons/setting.webp' },
    ],
    [
      { appId: 'about', label: { FR: 'Aide et support', EN: 'Help and Support', ES: 'Ayuda y soporte técnico' }, icon: '/icons/questionMark.webp' },
      { appId: 'terminal', label: { FR: 'Invite de commandes', EN: 'Command Prompt', ES: 'Símbolo del sistema' }, icon: '/icons/terminal.webp' },
    ],
  ],
};

const COPY = {
  allPrograms: { FR: 'Tous les programmes', EN: 'All Programs', ES: 'Todos los programas' },
  back: { FR: 'Retour', EN: 'Back', ES: 'Atras' },
  logOff: { FR: 'Fermer la session', EN: 'Log Off', ES: 'Cerrar sesión' },
  shutdown: { FR: "Arrêter l'ordinateur", EN: 'Turn Off Computer', ES: 'Apagar equipo' },
};

const StartMenu = ({
  isOpen,
  onClose,
  onOpenApp,
  apps,
  onShutdown,
  onLogOff,
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
        const taskbarHeight = 30;
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
      {/* En-tête utilisateur sur toute la largeur */}
      <div className="xp-start-menu-header">
        <div className="xp-start-menu-user-avatar">
          <img src={profilePic} alt="" className="xp-start-menu-user-avatar-img" />
        </div>
        <span className="xp-start-menu-user-name">Lucas</span>
      </div>

      <div className="xp-start-menu-body">
        {/* Colonne de gauche : programmes épinglés */}
        <div className="xp-start-menu-left">
          <div className="xp-start-menu-left-list">
            {(showAllPrograms ? allPrograms : pinnedApps).map((app) => (
              <button
                key={app.id}
                onClick={() => handleOpenApp(app)}
                className="xp-start-menu-item"
              >
                <img src={app.icon} alt="" className="xp-start-menu-item-icon" />
                <span>{getAppLabel(app.id, app.name, currentLanguage)}</span>
              </button>
            ))}
          </div>

          <div className="xp-start-menu-all-programs">
            <div className="xp-start-menu-divider"></div>
            <button
              onClick={() => setShowAllPrograms(prev => !prev)}
              className="xp-start-menu-item"
            >
              {showAllPrograms && <span className="xp-start-menu-arrow xp-start-menu-arrow--back" />}
              <span>{t(showAllPrograms ? COPY.back : COPY.allPrograms, currentLanguage)}</span>
              {!showAllPrograms && <span className="xp-start-menu-arrow" />}
            </button>
          </div>
        </div>

        {/* Colonne de droite : emplacements système */}
        <div className="xp-start-menu-right">
          <div className="xp-start-menu-right-list">
            {MENU_CONFIG.rightGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                {groupIndex > 0 && <div className="xp-start-menu-divider"></div>}
                {group.map((item) => (
                  <button
                    key={item.appId}
                    onClick={() => handleOpenApp(resolveApp(item.appId))}
                    className={`xp-start-menu-item ${groupIndex === 0 ? 'xp-start-menu-item--bold' : ''}`}
                  >
                    <img src={item.icon} alt="" className="xp-start-menu-item-icon" />
                    <span>{t(item.label, currentLanguage)}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pied : Fermer la session / Arrêter l'ordinateur */}
      <div className="xp-start-menu-footer">
        <button onClick={onLogOff} className="xp-start-menu-footer-btn">
          <img src="/icons/restart.webp" alt="" className="xp-start-menu-footer-icon" />
          <span>{t(COPY.logOff, currentLanguage)}</span>
        </button>
        <button onClick={onShutdown} className="xp-start-menu-footer-btn">
          <img src="/icons/off.webp" alt="" className="xp-start-menu-footer-icon" />
          <span>{t(COPY.shutdown, currentLanguage)}</span>
        </button>
      </div>
    </div>
  );
};

export default StartMenu;
