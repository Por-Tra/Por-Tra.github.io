import { useState, useRef, useEffect } from 'react';

// Liste des langues dispo
const languages = [
  { code: 'FR', name: 'Français' },
  { code: 'EN', name: 'English' },
  { code: 'ES', name: 'Español' },
];

const LanguageSwitcher = ({ currentLang, onChangeLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="xp-lang-btn"
      >
        <span>{currentLang}</span>
      </button>

      {isOpen && (
        <div className="xp-desktop-context-menu xp-lang-menu">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onChangeLang(lang.code);
                setIsOpen(false);
              }}
              className={`xp-desktop-context-item gap-2 ${
                currentLang === lang.code ? 'xp-desktop-context-item--bold' : ''
              }`}
            >
              <span className="w-6">{lang.code}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
