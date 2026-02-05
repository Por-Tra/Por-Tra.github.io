import { useState, useEffect, useRef } from 'react';
import profilePic from '../assets/PP.jpg';

const StartMenu = ({ isOpen, onClose, onOpenApp, apps, onShutdown, onRestart }) => {
  const menuRef = useRef(null);
  const [menuStyle, setMenuStyle] = useState({});

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Calculate menu position to fit screen
      const updatePosition = () => {
        const windowHeight = window.innerHeight;
        const taskbarHeight = 30;
        const maxMenuHeight = windowHeight - taskbarHeight - 10;
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

  if (!isOpen) return null;

  const leftApps = apps ? apps.slice(0, 5) : [];
  const rightItems = [
    { name: 'Mes documents', icon: '/icons/folder.png', action: () => apps && onOpenApp(apps.find(a => a.id === 'projects')) },
    { name: 'Poste de travail', icon: '/icons/explorer.png', action: () => apps && onOpenApp(apps.find(a => a.id === 'explorer')) },
    { name: 'Panneau de configuration', icon: '/icons/setting.png', action: () => apps && onOpenApp(apps.find(a => a.id === 'settings')) },
  ];

  return (
    <div 
      ref={menuRef}
      className="absolute bottom-[30px] left-0 z-[1000] flex shadow-2xl overflow-hidden"
      style={{ 
        minWidth: '380px',
        border: '2px solid #0055ea',
        borderRadius: '6px 6px 0 0',
        ...menuStyle,
      }}
    >
      {/* Left Column - Blue header with user */}
      <div className="flex flex-col" style={{ width: '190px' }}>
        {/* User Header */}
        <div className="bg-gradient-to-r from-[#0058e6] to-[#3a8ff5] p-2 flex items-center gap-2 rounded-tl-[4px]">
          <div className="w-10 h-10 bg-white rounded-md border-2 border-white shadow-md overflow-hidden">
            <img src={profilePic} alt="User" className="w-full h-full object-cover" />
          </div>
          <span className="text-white font-bold text-sm">Lucas</span>
        </div>
        
        {/* Left Apps List */}
        <div className="bg-white flex-1 p-1">
          <div className="border-b border-[#d4d0c8] pb-1 mb-1">
            <p className="text-[10px] text-gray-500 px-2 py-1">Programmes fréquemment utilisés</p>
          </div>
          {leftApps.map((app) => (
            <button
              key={app.id}
              onClick={() => {
                onOpenApp(app);
                onClose();
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-[#316ac5] hover:text-white rounded text-left text-xs"
            >
              <img src={app.icon} alt="" className="w-6 h-6" />
              <span>{app.name}</span>
            </button>
          ))}
          
          <div className="border-t border-[#d4d0c8] mt-2 pt-1">
            <button className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-[#316ac5] hover:text-white rounded text-left text-xs font-bold">
              <img src="/icons/folder.png" alt="" className="w-5 h-5" />
              <span>Tous les programmes</span>
              <span className="ml-auto">▶</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Column - Blue background */}
      <div className="bg-[#d3e5fa] flex flex-col" style={{ width: '190px' }}>
        {/* Spacer for header alignment */}
        <div className="h-[56px] bg-gradient-to-r from-[#3a8ff5] to-[#5aa0f5] rounded-tr-[4px]"></div>
        
        {/* Right Items List */}
        <div className="flex-1 p-1">
          {rightItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.action();
                onClose();
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-[#316ac5] hover:text-white rounded text-left text-xs"
            >
              <img src={item.icon} alt="" className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
          
          <div className="border-t border-[#a0c0e8] my-2"></div>
          
          <button className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-[#316ac5] hover:text-white rounded text-left text-xs">
            <img src="/icons/questionMark.png" alt="" className="w-5 h-5" />
            <span>Aide et support</span>
          </button>
        </div>
      </div>

      {/* Bottom Bar - Shutdown buttons */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3168d5] to-[#4a8ae8] p-1.5 flex justify-end gap-1 rounded-b-none">
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
