import { useState, useEffect } from 'react';
import StartMenu from './StartMenu';
import LanguageSwitcher from './LanguageSwitcher';

const Taskbar = ({ windows, activeWindow, onWindowClick, onWindowClose, apps, onOpenApp }) => {
  const [time, setTime] = useState(new Date());
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('FR');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleShutdown = () => {
    if (confirm('Voulez-vous vraiment quitter ?')) {
      window.close();
      // Fallback si window.close() ne fonctionne pas
      document.body.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100vh; background: #000; color: #fff; font-family: 'Tahoma', sans-serif; flex-direction: column;">
          <h1 style="font-size: 24px; margin-bottom: 20px;">Windows est en cours d'arrêt...</h1>
          <p style="color: #aaa;">Vous pouvez fermer cette fenêtre en toute sécurité.</p>
        </div>
      `;
    }
  };

  const handleRestart = () => {
    if (confirm('Voulez-vous vraiment redémarrer ?')) {
      window.location.reload();
    }
  };

  return (
    <div className="xp-taskbar absolute bottom-0 left-0 right-0 h-[30px] flex items-center">
      {/* Start Menu */}
      <StartMenu 
        isOpen={startMenuOpen}
        onClose={() => setStartMenuOpen(false)}
        onOpenApp={onOpenApp}
        apps={apps}
        onShutdown={handleShutdown}
        onRestart={handleRestart}
      />

      {/* Start Button */}
      <button 
        onClick={() => setStartMenuOpen(!startMenuOpen)}
        className={`xp-start-btn h-[28px] flex items-center gap-1 ${startMenuOpen ? 'xp-start-btn-active' : ''}`}
      >
        <img src="/icons/WINXP_ICO_COLOR.png" alt="Start" className="w-5 h-5" />
        <span className="text-sm">démarrer</span>
      </button>

      {/* Quick Launch Separator */}
      <div className="w-px h-6 bg-[#0d4ca3] mx-1" />

      {/* Taskbar Buttons */}
      <div className="flex-1 flex items-center gap-1 px-1 overflow-hidden">
        {windows.map(window => (
          <button
            key={window.id}
            onClick={() => onWindowClick(window.id)}
            className={`xp-taskbar-btn h-[22px] px-2 flex items-center gap-1 min-w-[100px] max-w-[160px] ${
              activeWindow === window.id && !window.minimized
                ? 'xp-taskbar-btn-active'
                : ''
            }`}
          >
            <img src={window.icon} alt="" className="w-4 h-4 flex-shrink-0" />
            <span className="text-white text-[11px] truncate">{window.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="xp-systray h-full flex items-center gap-2 px-2">
        <img src="/icons/signal.png" alt="" className="w-4 h-4 opacity-80" />
        <LanguageSwitcher currentLang={currentLang} onChangeLang={setCurrentLang} />
        <span className="text-white text-[11px]">
          {formatTime(time)}
        </span>
      </div>
    </div>
  );
};

export default Taskbar;
