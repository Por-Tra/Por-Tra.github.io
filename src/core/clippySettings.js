/**
 * Réglages de Clippy (Panneau de configuration > Clippy, le compagnon)
 *
 * Partagés entre le bureau (affichage), Clippy (taille, comportement) et le Panneau de configuration.
 */
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'xp-clippy-settings-v1';
const LEGACY_HIDDEN_KEY = 'xp-clippy-hidden';
const CHANGE_EVENT = 'xp-clippy-settings-change';
export const CLIPPY_RESET_POSITION_EVENT = 'xp-clippy-reset-position';
export const CLIPPY_PLAY_EVENT = 'xp-clippy-play';

/** Taille de Clippy : facteur appliqué au sprite d'origine (124 x 93 px) */
export const CLIPPY_SIZES = {
  small: 0.75,
  normal: 1,
  large: 1.5,
  xlarge: 2,
};

export const DEFAULT_CLIPPY_SETTINGS = {
  visible: true,          // Affiché sur le bureau
  size: 'normal',         // small | normal | large | xlarge
  idleAnimations: true,   // Petites animations quand on ne fait rien
  openOnArrival: false,   // Ouvre sa bulle d'aide dès son arrivée
};

export const readClippySettings = () => {
  try {
    const raw = globalThis.localStorage?.getItem(STORAGE_KEY);
    if (!raw) {
      // Ancienne clé : Clippy masqué via le bouton « Masquer Clippy »
      const wasHidden = globalThis.localStorage?.getItem(LEGACY_HIDDEN_KEY) === '1';
      return { ...DEFAULT_CLIPPY_SETTINGS, visible: !wasHidden };
    }
    const settings = { ...DEFAULT_CLIPPY_SETTINGS, ...JSON.parse(raw) };
    if (!(settings.size in CLIPPY_SIZES)) settings.size = 'normal';
    return settings;
  } catch {
    return { ...DEFAULT_CLIPPY_SETTINGS };
  }
};

export const saveClippySettings = (settings) => {
  try {
    globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(settings));
    globalThis.localStorage?.removeItem(LEGACY_HIDDEN_KEY);
  } catch {
    // Stockage indisponible : le réglage reste actif pour la session
  }
  globalThis.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: settings }));
};

/** Replace Clippy à son emplacement par défaut (en bas à droite) */
export const resetClippyPosition = () => {
  globalThis.dispatchEvent(new CustomEvent(CLIPPY_RESET_POSITION_EVENT));
};

/** Demande à Clippy de jouer une animation (ex. : 'Wave') */
export const playClippyAnimation = (name) => {
  globalThis.dispatchEvent(new CustomEvent(CLIPPY_PLAY_EVENT, { detail: { name } }));
};

/** Hook : [réglages, mettre à jour un réglage, rétablir les valeurs par défaut] */
export const useClippySettings = () => {
  const [settings, setSettings] = useState(readClippySettings);

  useEffect(() => {
    const handleChange = (event) => setSettings(event.detail);
    globalThis.addEventListener(CHANGE_EVENT, handleChange);
    return () => globalThis.removeEventListener(CHANGE_EVENT, handleChange);
  }, []);

  const update = (key, value) => saveClippySettings({ ...readClippySettings(), [key]: value });
  const reset = () => saveClippySettings({ ...DEFAULT_CLIPPY_SETTINGS });

  return [settings, update, reset];
};
