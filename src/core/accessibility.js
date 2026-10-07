/**
 * Options d'accessibilité (Panneau de configuration > Options d'accessibilité)
 *
 * Les réglages sont enregistrés dans le navigateur et appliqués sous forme de classes
 * sur <html> : le CSS (index.css, section « ACCESSIBILITÉ ») fait le reste.
 */
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'xp-accessibility-v1';
const CHANGE_EVENT = 'xp-accessibility-change';

export const TEXT_SIZES = ['normal', 'large', 'xlarge'];

export const DEFAULT_ACCESSIBILITY = {
  dyslexiaFont: false,   // Police OpenDyslexic + espacement du texte
  textSize: 'normal',    // normal | large | xlarge (« Grandes polices » de XP)
  highContrast: false,   // Contraste renforcé
  reduceMotion: false,   // Animations réduites (Clippy, transitions, démarrage)
  largeCursor: false,    // Pointeur de souris agrandi
  focusHighlight: false, // Indicateur de focus clavier très visible
};

const CLASS_BY_SETTING = {
  dyslexiaFont: 'a11y-dyslexia',
  highContrast: 'a11y-contrast',
  reduceMotion: 'a11y-reduce-motion',
  largeCursor: 'a11y-large-cursor',
  focusHighlight: 'a11y-focus',
};

export const readAccessibility = () => {
  try {
    const parsed = JSON.parse(globalThis.localStorage?.getItem(STORAGE_KEY) || 'null');
    if (!parsed || typeof parsed !== 'object') return { ...DEFAULT_ACCESSIBILITY };
    const settings = { ...DEFAULT_ACCESSIBILITY, ...parsed };
    if (!TEXT_SIZES.includes(settings.textSize)) settings.textSize = 'normal';
    return settings;
  } catch {
    return { ...DEFAULT_ACCESSIBILITY };
  }
};

export const applyAccessibility = (settings) => {
  const root = document.documentElement;
  Object.entries(CLASS_BY_SETTING).forEach(([key, className]) => {
    root.classList.toggle(className, Boolean(settings[key]));
  });
  root.classList.toggle('a11y-text-large', settings.textSize === 'large');
  root.classList.toggle('a11y-text-xlarge', settings.textSize === 'xlarge');
};

export const saveAccessibility = (settings) => {
  try {
    globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Stockage indisponible (navigation privée...) : le réglage reste actif pour la session
  }
  applyAccessibility(settings);
  globalThis.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: settings }));
};

/** À appeler une fois au démarrage (main.jsx) */
export const initAccessibility = () => applyAccessibility(readAccessibility());

/** Les animations doivent-elles être réduites ? (réglage du site ou du système) */
export const isReducedMotion = () =>
  document.documentElement.classList.contains('a11y-reduce-motion') ||
  (globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);

/** Hook : [réglages, mettre à jour un réglage, rétablir les valeurs par défaut] */
export const useAccessibility = () => {
  const [settings, setSettings] = useState(readAccessibility);

  useEffect(() => {
    const handleChange = (event) => setSettings(event.detail);
    globalThis.addEventListener(CHANGE_EVENT, handleChange);
    return () => globalThis.removeEventListener(CHANGE_EVENT, handleChange);
  }, []);

  const update = (key, value) => saveAccessibility({ ...readAccessibility(), [key]: value });
  const reset = () => saveAccessibility({ ...DEFAULT_ACCESSIBILITY });

  return [settings, update, reset];
};
