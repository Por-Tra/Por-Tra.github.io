import { useState, useEffect, useRef } from 'react';
import { useTranslation } from '../i18n';
import './Menu.css';

function Menu({ onNavigate }) {
  const { t, lang, setLang } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [exiting, setExiting] = useState(false);
  const menuItemsRef = useRef([]);

  const langNames = { fr: 'Français', en: 'English', es: 'Español' };

  // Menu items configuration
  const menuItems = [
    { page: 'projects', icon: '[+]', labelKey: 'nav.projects', valueKey: 'bios.viewProjects' },
    { page: 'about', icon: '[+]', labelKey: 'nav.about', valueKey: 'bios.aboutMe' },
    { page: 'cv', icon: '[+]', labelKey: 'nav.cv', valueKey: 'bios.viewCV' },
    { page: 'contact', icon: '[+]', labelKey: 'nav.contact', valueKey: 'bios.contactInfo' }
  ];

  // Update time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
      const dateStr = now.toLocaleDateString('fr-FR');
      setCurrentTime(timeStr);
      setCurrentDate(dateStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Navigate to page
  const navigateToPage = (page) => {
    setExiting(true);
    setTimeout(() => {
      if (onNavigate) {
        onNavigate(page);
      }
    }, 800);
  };

  // Exit to home
  const exitToHome = () => {
    setExiting(true);
    setTimeout(() => {
      if (onNavigate) {
        onNavigate('home');
      }
    }, 800);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const focusableItems = menuItemsRef.current.filter(item => item !== null);
      const currentIndex = focusableItems.findIndex(item => item === document.activeElement);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % focusableItems.length;
        focusableItems[nextIndex]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + focusableItems.length) % focusableItems.length;
        focusableItems[prevIndex]?.focus();
      } else if (e.key === 'Escape') {
        exitToHome();
      } else if (e.key === 'F1') {
        e.preventDefault();
        alert(t('bios.helpTitle') + ':\\n\\nUse Arrow Keys to move\\nPress Enter to select\\nPress ESC to exit');
      } else if (e.key === 'F10') {
        e.preventDefault();
        exitToHome();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [t]);

  return (
    <>
      {/* Visual layers */}
      <div className="noise"></div>
      <div className="noise noise-moving"></div>
      <div className="scanlines"></div>

      {/* Main BIOS container */}
      <div className={`bios-container ${exiting ? 'exiting' : ''}`}>
        <div className="bios-main">
          {/* Menu section */}
          <div className="bios-menu">
            {/* Main Menu Section */}
            <div className="menu-section">
              <div className="section-title">{t('bios.mainMenu')}</div>
              
              {menuItems.map((item, index) => (
                <div
                  key={item.page}
                  ref={el => menuItemsRef.current[index] = el}
                  className="menu-item"
                  tabIndex="0"
                  onClick={() => navigateToPage(item.page)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      navigateToPage(item.page);
                    }
                  }}
                >
                  <span className="item-icon">{item.icon}</span>
                  <span className="item-label">{t(item.labelKey)}</span>
                  <span className="item-value">{t(item.valueKey)}</span>
                </div>
              ))}
            </div>

            {/* System Configuration Section */}
            <div className="menu-section">
              <div className="section-title">{t('bios.system')}</div>
              
              <div
                ref={el => menuItemsRef.current[menuItems.length] = el}
                className="menu-item dropdown-trigger"
                tabIndex="0"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setDropdownOpen(!dropdownOpen);
                  }
                }}
              >
                <span className="item-icon">[*]</span>
                <span className="item-label">{t('bios.language')}</span>
                <span className="item-value" id="currentLang">{langNames[lang]}</span>
                <span className="dropdown-arrow">v</span>
              </div>

              <div className={`dropdown-menu ${dropdownOpen ? 'active' : ''}`} id="langDropdown">
                <div
                  className={`dropdown-item ${lang === 'fr' ? 'active' : ''}`}
                  onClick={() => {
                    setLang('fr');
                    setDropdownOpen(false);
                  }}
                >
                  Français
                </div>
                <div
                  className={`dropdown-item ${lang === 'en' ? 'active' : ''}`}
                  onClick={() => {
                    setLang('en');
                    setDropdownOpen(false);
                  }}
                >
                  English
                </div>
                <div
                  className={`dropdown-item ${lang === 'es' ? 'active' : ''}`}
                  onClick={() => {
                    setLang('es');
                    setDropdownOpen(false);
                  }}
                >
                  Español
                </div>
              </div>
            </div>

            {/* Exit Options Section */}
            <div className="menu-section">
              <div className="section-title">{t('bios.exit')}</div>
              
              <div
                ref={el => menuItemsRef.current[menuItems.length + 1] = el}
                className="menu-item"
                tabIndex="0"
                onClick={exitToHome}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    exitToHome();
                  }
                }}
              >
                <span className="item-icon">[X]</span>
                <span className="item-label">{t('bios.exitSetup')}</span>
                <span className="item-value">{t('bios.returnHome')}</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="bios-sidebar">
            {/* Help box */}
            <div className="help-box">
              <div className="help-title">{t('bios.helpTitle')}</div>
              <div className="help-item">
                <span className="help-key">Up/Down</span>
                <span>{t('bios.helpMove')}</span>
              </div>
              <div className="help-item">
                <span className="help-key">Enter</span>
                <span>{t('bios.helpSelect')}</span>
              </div>
              <div className="help-item">
                <span className="help-key">Esc</span>
                <span>{t('bios.helpExit')}</span>
              </div>
            </div>

            {/* Info box */}
            <div className="info-box">
              <div className="info-title">{t('bios.systemInfo')}</div>
              <div className="info-item">
                <span>{t('bios.version')}</span>: 2.0.1
              </div>
              <div className="info-item">
                <span>{t('bios.date')}</span>: <span id="currentDate">{currentDate}</span>
              </div>
              <div className="info-item">
                <span>{t('bios.time')}</span>: <span id="currentTime">{currentTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bios-footer">
          <div className="footer-item">
            <span className="footer-key">F1</span>
            <span>{t('bios.footerHelp')}</span>
          </div>
          <div className="footer-item">
            <span className="footer-key">F10</span>
            <span>{t('bios.footerSave')}</span>
          </div>
          <div className="footer-item">
            <span className="footer-key">ESC</span>
            <span>{t('bios.footerExit')}</span>
          </div>
        </div>
      </div>

      {/* Exit overlay */}
      <div className={`exit-overlay ${exiting ? 'active' : ''}`} id="exitOverlay"></div>
    </>
  );
}

export default Menu;
