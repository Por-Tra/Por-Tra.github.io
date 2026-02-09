import { useState, useEffect, useRef, useMemo } from 'react';
import profilePic from '../assets/PP.jpg';
import appRegistry from '../apps';

const MENU_CONFIG = {
  pinnedIds: ['welcome', 'projects', 'skills', 'contact', 'chess'],
  allProgramIds: [],
  rightItems: [
    { appId: 'projects', label: 'Mes documents', icon: '/icons/folder.png' },
    { appId: 'explorer', label: 'Poste de travail', icon: '/icons/explorer.png' },
    { appId: 'control-panel', label: 'Panneau de configuration', icon: '/icons/setting.png' },
  ],
};

const StartMenu = ({ isOpen, onClose, onOpenApp, apps, onShutdown, onRestart }) => {
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
      className="absolute bottom-[30px] left-0 z-[1000] flex flex-col shadow-2xl overflow-hidden"
      style={{ 
        width: '380px',
        border: '2px solid rgb(0, 85, 234)',
        borderRadius: '6px 6px 0 0',
        ...menuStyle,
      }}
    >
      {/* Main content area - two columns */}
      <div className="flex flex-1 min-h-0">
        {/* Left Column - Blue header with user */}
        <div className="flex flex-col w-1/2">
          {/* User Header */}
          <div className="bg-gradient-to-r from-[#0058e6] to-[#3a8ff5] p-2 flex items-center gap-2 rounded-tl-[4px]">
            <div className="w-10 h-10 bg-white rounded-md border-2 border-white shadow-md overflow-hidden">
              <img src={profilePic} alt="User" className="w-full h-full object-cover" />
            </div>
            <span className="text-white font-bold text-sm">Lucas</span>
          </div>
          
          {/* Left Apps List */}
          <div className="bg-white flex-1 p-1 overflow-y-auto min-h-0">
            <div className="border-b border-[#d4d0c8] pb-1 mb-1">
              <p className="text-[10px] text-gray-500 px-2 py-1">
                {showAllPrograms ? 'Tous les programmes' : 'Programmes fréquemment utilisés'}
              </p>
            </div>
            {(showAllPrograms ? allPrograms : pinnedApps).map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  handleOpenApp(app);
                }}
                className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-[#316ac5] hover:text-white rounded text-left text-xs"
              >
                <img src={app.icon} alt="" className="w-6 h-6" />
                <span>{app.name}</span>
              </button>
            ))}
            
            <div className="border-t border-[#d4d0c8] mt-2 pt-1">
              <button
                onClick={() => setShowAllPrograms(prev => !prev)}
                className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-[#316ac5] hover:text-white rounded text-left text-xs font-bold"
              >
                <img src="/icons/folder.png" alt="" className="w-5 h-5" />
                <span>{showAllPrograms ? 'Retour' : 'Tous les programmes'}</span>
                <span className="ml-auto">{showAllPrograms ? '◀' : '▶'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Blue background */}
        <div className="bg-[#d3e5fa] flex flex-col w-1/2">
          {/* Spacer for header alignment */}
          <div className="h-[56px] bg-gradient-to-r from-[#3a8ff5] to-[#5aa0f5] rounded-tr-[4px] shrink-0"></div>
          
          {/* Right Items List */}
          <div className="flex-1 p-1 overflow-y-auto min-h-0">
            {MENU_CONFIG.rightItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  handleOpenApp(resolveApp(item.appId));
                }}
                className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-[#316ac5] hover:text-white rounded text-left text-xs"
              >
                <img src={item.icon} alt="" className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
            
          </div>
        </div>
      </div>

      {/* Bottom Bar - Shutdown buttons */}
      <div className="bg-gradient-to-t from-[#3168d5] to-[#4a8ae8] p-1.5 flex justify-end gap-1 shrink-0">
        <button 
          onClick={onRestart}
          className="flex items-center gap-1 px-2 py-1 text-white text-[11px] hover:bg-white/20 rounded"
        >
          <img src="/icons/restart.png" alt="" className="w-4 h-4" />
          <span>Redémarrer</span>
        </button>
        <button 
          onClick={onShutdown}
          className="flex items-center gap-1 px-2 py-1 text-white text-[11px] hover:bg-white/20 rounded"
        >
          <img src="/icons/off.png" alt="" className="w-4 h-4" />
          <span>Arrêter</span>
        </button>
      </div>
    </div>
  );
};

export default StartMenu;
