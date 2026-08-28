const FALLBACK_LANG = 'FR';

const LOCALES = {
  FR: 'fr-FR',
  EN: 'en-GB',
  ES: 'es-ES',
  DE: 'de-DE',
};

export const t = (value, lang = FALLBACK_LANG) => {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return '';
  if (value[lang]) return value[lang];
  if (value.EN) return value.EN;
  if (value[FALLBACK_LANG]) return value[FALLBACK_LANG];
  const first = Object.values(value).find(Boolean);
  return first ?? '';
};

export const getLocale = (lang) => LOCALES[lang] ?? LOCALES[FALLBACK_LANG];

export const APP_LABELS = {
  welcome: { FR: 'Bienvenue', EN: 'Welcome', ES: 'Bienvenida' },
  about: { FR: 'A propos', EN: 'About', ES: 'Acerca de' },
  parcours: { FR: 'Mon Parcours', EN: 'My Journey', ES: 'Mi Trayectoria' },
  projects: { FR: 'Mes Projets', EN: 'My Projects', ES: 'Mis Proyectos' },
  skills: { FR: 'Competences', EN: 'Skills', ES: 'Habilidades' },
  contact: { FR: 'Contact', EN: 'Contact', ES: 'Contacto' },
  explorer: { FR: 'Explorateur', EN: 'Explorer', ES: 'Explorador' },
  'control-panel': { FR: 'Panneau de configuration', EN: 'Control Panel', ES: 'Panel de control' },
  'projects-folder-shortcut': { FR: 'Projets', EN: 'Projects', ES: 'Proyectos' },
  'recycle-bin': { FR: 'Corbeille', EN: 'Recycle Bin', ES: 'Papelera' },
  terminal: { FR: 'Terminal', EN: 'Terminal', ES: 'Terminal' },
  chess: { FR: 'Echecs', EN: 'Chess', ES: 'Ajedrez' },
};

export const getAppLabel = (appId, fallback, lang) => {
  if (lang === 'FR' && typeof fallback === 'string') return fallback;
  return t(APP_LABELS[appId] ?? fallback, lang);
};

export const getWindowTitle = (window, lang) => {
  if (!window) return '';
  if (lang === 'FR' && typeof window.title === 'string') {
    return window.title;
  }
  if (window.titleKey && APP_LABELS[window.titleKey]) {
    return t(APP_LABELS[window.titleKey], lang);
  }
  return t(window.title, lang);
};
