import { useState, useEffect } from 'react';
import StartMenu from './StartMenu';
import LanguageSwitcher from './LanguageSwitcher';
import { t, getLocale, getWindowTitle } from '../i18n/text';
import { showError } from '../core/errorDialog';

const COPY = {
  startButton: {
    FR: 'démarrer',
    EN: 'start',
    ES: 'inicio',
  },
  confirmShutdown: {
    FR: 'Voulez-vous vraiment quitter ?',
    EN: 'Do you really want to quit?',
    ES: 'Seguro que quieres salir?',
  },
  confirmLogOff: {
    FR: 'Voulez-vous vraiment fermer la session ?',
    EN: 'Are you sure you want to log off?',
    ES: '¿Seguro que quieres cerrar la sesión?',
  },
  shutdownTitle: {
    FR: 'Windows est en cours d\'arrêt...',
    EN: 'Windows is shutting down...',
    ES: 'Windows se esta apagando...',
  },
  networkError: {
    FR: "Cliquez ok pour réparer.",
    EN: 'Click OK to repair.',
    ES: 'Haz clic en Aceptar para reparar.',
  },
  networkTitle: {
    FR: 'Connexion réseau',
    EN: 'Network Connection',
    ES: 'Conexión de red',
  },
  networkTooltip: {
    FR: 'Connexion réseau',
    EN: 'Network connection',
    ES: 'Conexión de red',
  },
  shutdownNote: {
    FR: 'Vous pouvez fermer cette fenêtre en toute sécurité.',
    EN: 'You can safely close this window now.',
    ES: 'Puedes cerrar esta ventana con seguridad.',
  },
};

const Taskbar = ({
  windows,
  activeWindow,
  onWindowClick,
  onWindowClose,
  apps,
  onOpenApp,
  utcOffsetMinutes,
  currentLanguage = 'FR',
  onSetLanguage,
}) => {
  const [time, setTime] = useState(new Date());
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString(getLocale(currentLanguage), {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getAdjustedTime = (now, offsetMinutes) => {
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utcMs + offsetMinutes * 60000);
  };

  const handleShutdown = () => {
    if (confirm(t(COPY.confirmShutdown, currentLanguage))) {
      window.close();
      // Fallback si window.close() ne fonctionne pas
      document.body.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100vh; background: #000; color: #fff; font-family: 'Tahoma', sans-serif; flex-direction: column;">
          <h1 style="font-size: 24px; margin-bottom: 20px;">${t(COPY.shutdownTitle, currentLanguage)}</h1>
          <p style="color: #aaa;">${t(COPY.shutdownNote, currentLanguage)}</p>
        </div>
      `;
    }
  };

  // Fermer la session : on revient à l'écran d'accueil sans repasser par le démarrage
  const handleLogOff = () => {
    if (confirm(t(COPY.confirmLogOff, currentLanguage))) {
      try {
        sessionStorage.setItem('xp-logged-off', '1');
      } catch (error) {
        // no-op
      }
      window.location.reload();
    }
  };

  return (
    <div className="xp-taskbar absolute bottom-0 left-0 right-0 flex items-center">
      {/* Start Menu */}
      <StartMenu 
        isOpen={startMenuOpen}
        onClose={() => setStartMenuOpen(false)}
        onOpenApp={onOpenApp}
        apps={apps}
        onShutdown={handleShutdown}
        onLogOff={handleLogOff}
        currentLanguage={currentLanguage}
      />

      {/* Start Button */}
      <button 
        onClick={() => setStartMenuOpen(!startMenuOpen)}
        className={`xp-start-btn ${startMenuOpen ? 'xp-start-btn-active' : ''}`}
      >
        <img src="/icons/win_logo_task_bar.webp" alt="" />
        <span className="xp-start-label">{t(COPY.startButton, currentLanguage)}</span>
      </button>

      {/* Taskbar Buttons */}
      <div className="xp-taskbar-buttons">
        {windows.map(window => (
          <button
            key={window.id}
            onClick={() => onWindowClick(window.id)}
            className={`xp-taskbar-btn ${
              activeWindow === window.id && !window.minimized
                ? 'xp-taskbar-btn-active'
                : ''
            }`}
          >
            <img src={window.icon} alt="" />
            <span>
              {getWindowTitle(window, currentLanguage)}
            </span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="xp-systray">
        <button
          type="button"
          className="xp-systray-icon"
          title={t(COPY.networkTooltip, currentLanguage)}
          onClick={() => showError(COPY.networkError, { title: COPY.networkTitle })}
        >
          <img src="/icons/signal.webp" alt={t(COPY.networkTooltip, currentLanguage)} />
        </button>
        <img src="/icons/network.webp" alt=""/>
        <LanguageSwitcher currentLang={currentLanguage} onChangeLang={onSetLanguage} />
        <span className="xp-systray-clock">
          {formatTime(getAdjustedTime(time, utcOffsetMinutes ?? -time.getTimezoneOffset()))}
        </span>
      </div>
    </div>
  );
};

export default Taskbar;
