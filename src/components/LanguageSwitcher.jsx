import { useState, useRef, useEffect } from 'react';

const languages = [
  { code: 'FR', name: 'Français' },
  { code: 'EN', name: 'English' },
  { code: 'ES', name: 'Español' },
  { code: 'DE', name: 'Deutsch' },
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
        className="text-white text-[11px] font-medium px-2 py-1 hover:bg-white/10 rounded flex items-center gap-1"
      >
        <span>{currentLang}</span>
      </button>

      {isOpen && (
        <div className="absolute bottom-full mb-1 right-0 bg-white border border-[#808080] shadow-lg rounded min-w-[120px]">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onChangeLang(lang.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#316ac5] hover:text-white flex items-center gap-2 ${
                currentLang === lang.code ? 'bg-[#ece9d8]' : ''
              }`}
            >
              <span className="font-bold w-6">{lang.code}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
