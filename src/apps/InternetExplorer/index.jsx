/**
 * Application: Internet Explorer 6
 *
 * Navigateur intégré au portfolio. Le site étant statique, chaque adresse est affichée au mieux
 * (voir router.js) : API GitHub, iframe pour les sites qui l'acceptent,
 * page d'erreur IE pour les autres (avec ouverture dans un nouvel onglet).
 *
 * Props (via extraProps) : initialUrl - adresse ouverte au démarrage
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import XpMenuBar from '../../components/XpMenuBar';
import { t } from '../../i18n/text';
import { HOME_URL, GITHUB_USER, normalizeInput, resolveUrl } from './router';
import GitHubPage from './pages/GitHubPage';
import BlockedPage from './pages/BlockedPage';
import {
  BackIcon, ForwardIcon, StopIcon, RefreshIcon, HomeIcon, SearchIcon, FavoritesIcon, GlobeIcon, PageIcon,
} from './icons';

export const config = {
  id: 'internet-explorer',
  name: 'Internet Explorer',
  icon: '/icons/explorer.webp',
  defaultWidth: 900,
  defaultHeight: 620,
  showOnDesktop: false,
  showInStartMenu: false,
};

const APP_SUFFIX = 'Microsoft Internet Explorer';

const FAVORITES = [
  { label: 'GitHub - Por-Tra', url: `https://github.com/${GITHUB_USER}`, icon: '/icons/git.webp' },
  { label: 'Google', url: HOME_URL, icon: '/icons/explorer.webp' },
  { label: 'Wikipédia', url: 'https://fr.wikipedia.org/wiki/Windows_XP', icon: '/icons/explorer.webp' },
  { label: 'Google en 2004 (Wayback Machine)', url: 'https://web.archive.org/web/2004/http://www.google.fr/', icon: '/icons/explorer.webp' },
];

const COPY = {
  back: { FR: 'Précédente', EN: 'Back', ES: 'Atrás' },
  forward: { FR: 'Suivante', EN: 'Forward', ES: 'Adelante' },
  stop: { FR: 'Arrêter', EN: 'Stop', ES: 'Detener' },
  refresh: { FR: 'Actualiser', EN: 'Refresh', ES: 'Actualizar' },
  home: { FR: 'Démarrage', EN: 'Home', ES: 'Inicio' },
  search: { FR: 'Rechercher', EN: 'Search', ES: 'Búsqueda' },
  favorites: { FR: 'Favoris', EN: 'Favorites', ES: 'Favoritos' },
  address: { FR: 'Adresse', EN: 'Address', ES: 'Dirección' },
  go: { FR: 'OK', EN: 'Go', ES: 'Ir' },
  links: { FR: 'Liens', EN: 'Links', ES: 'Vínculos' },
  done: { FR: 'Terminé', EN: 'Done', ES: 'Listo' },
  opening: { FR: 'Ouverture de la page', EN: 'Opening page', ES: 'Abriendo la página' },
  zone: { FR: 'Internet', EN: 'Internet', ES: 'Internet' },
  blankHint: {
    FR: 'Page blanche ? Ouvrir dans un nouvel onglet',
    EN: 'Blank page? Open in a new tab',
    ES: '¿Página en blanco? Abrir en una pestaña nueva',
  },
  closeFavorites: { FR: 'Fermer le volet Favoris', EN: 'Close Favorites', ES: 'Cerrar Favoritos' },
};

const getHostLabel = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

export const Component = ({ windowId, initialUrl = HOME_URL, currentLanguage }) => {
  const [history, setHistory] = useState(() => ({ entries: [normalizeInput(initialUrl)], index: 0 }));
  const [reload, setReload] = useState({ key: 0, force: false });
  const [addressText, setAddressText] = useState(() => normalizeInput(initialUrl));
  const [pageInfo, setPageInfo] = useState({ title: '', suffix: null, done: false });
  const [showFavorites, setShowFavorites] = useState(false);

  const currentUrl = history.entries[history.index];
  const route = useMemo(() => resolveUrl(currentUrl), [currentUrl]);
  const pageKey = `${history.index}|${currentUrl}|${reload.key}`;

  const handlePageInfo = useCallback((info) => setPageInfo(info), []);

  const goTo = useCallback((input) => {
    const url = normalizeInput(input);
    setHistory((prev) => ({
      entries: [...prev.entries.slice(0, prev.index + 1), url],
      index: prev.index + 1,
    }));
    setAddressText(url);
    setPageInfo({ title: '', suffix: null, done: false });
    setReload((prev) => ({ ...prev, force: false }));
  }, []);

  const moveInHistory = (delta) => {
    const nextIndex = history.index + delta;
    if (nextIndex < 0 || nextIndex >= history.entries.length) return;
    setHistory((prev) => ({ ...prev, index: nextIndex }));
    setAddressText(history.entries[nextIndex]);
    setPageInfo({ title: '', suffix: null, done: false });
    setReload((prev) => ({ ...prev, force: false }));
  };

  const refresh = () => {
    setReload((prev) => ({ key: prev.key + 1, force: true }));
    setPageInfo((prev) => ({ ...prev, done: false }));
  };

  const stop = () => setPageInfo((prev) => ({ ...prev, done: true }));

  // Une page externe ne signale pas toujours la fin de son chargement (redirections, blocage...) :
  // au bout de quelques secondes on considère le chargement terminé
  useEffect(() => {
    if (route.kind !== 'frame') return undefined;
    const timer = setTimeout(() => setPageInfo((prev) => (prev.done ? prev : { ...prev, done: true })), 8000);
    return () => clearTimeout(timer);
  }, [route.kind, pageKey]);

  // Titre de la fenêtre : « Titre de la page - Microsoft Internet Explorer »
  useEffect(() => {
    if (!windowId) return;
    const pageTitle = pageInfo.title
      ? `${pageInfo.title}${pageInfo.suffix ? ` · ${pageInfo.suffix}` : ''}`
      : getHostLabel(currentUrl);
    globalThis.dispatchEvent(new CustomEvent('xp-window-title', {
      detail: { windowId, title: `${pageTitle} - ${APP_SUFFIX}` },
    }));
  }, [windowId, pageInfo.title, pageInfo.suffix, currentUrl]);

  const handleAddressSubmit = (event) => {
    event.preventDefault();
    goTo(addressText);
  };

  const renderPage = () => {
    if (route.kind === 'github') {
      return (
        <GitHubPage
          key={pageKey}
          owner={route.owner}
          repo={route.repo}
          url={route.url}
          force={reload.force}
          navigate={goTo}
          onPageInfo={handlePageInfo}
          currentLanguage={currentLanguage}
        />
      );
    }
    if (route.kind === 'blocked') {
      return (
        <BlockedPage
          key={pageKey}
          url={route.url}
          reason={route.reason}
          onPageInfo={handlePageInfo}
          currentLanguage={currentLanguage}
        />
      );
    }
    return (
      <iframe
        key={pageKey}
        className="ie-frame"
        src={route.frameUrl}
        title={getHostLabel(route.url)}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation"
        allow="fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => setPageInfo({ title: getHostLabel(route.url), suffix: null, done: true })}
      />
    );
  };

  return (
    <div className="xp-app ie-app">
      <XpMenuBar preset="explorer" className="xp-menubar xp-menubar-explorer" currentLanguage={currentLanguage} />

      {/* Barre d'outils standard */}
      <div className="xp-toolbar ie-toolbar">
        <button type="button" className="xp-toolbar-btn" onClick={() => moveInHistory(-1)} disabled={history.index === 0}>
          <BackIcon />
          {t(COPY.back, currentLanguage)}
        </button>
        <button
          type="button"
          className="xp-toolbar-btn"
          onClick={() => moveInHistory(1)}
          disabled={history.index >= history.entries.length - 1}
          title={t(COPY.forward, currentLanguage)}
        >
          <ForwardIcon />
        </button>
        <button type="button" className="xp-toolbar-btn" onClick={stop} title={t(COPY.stop, currentLanguage)}>
          <StopIcon />
        </button>
        <button type="button" className="xp-toolbar-btn" onClick={refresh} title={t(COPY.refresh, currentLanguage)}>
          <RefreshIcon />
        </button>
        <button type="button" className="xp-toolbar-btn" onClick={() => goTo(HOME_URL)} title={t(COPY.home, currentLanguage)}>
          <HomeIcon />
        </button>
        <div className="xp-toolbar-separator" />
        <button type="button" className="xp-toolbar-btn" onClick={() => goTo(HOME_URL)}>
          <SearchIcon />
          {t(COPY.search, currentLanguage)}
        </button>
        <button
          type="button"
          className={`xp-toolbar-btn ${showFavorites ? 'is-pressed' : ''}`}
          onClick={() => setShowFavorites((value) => !value)}
        >
          <FavoritesIcon />
          {t(COPY.favorites, currentLanguage)}
        </button>
      </div>

      {/* Barre d'adresse */}
      <form className="xp-addressbar" onSubmit={handleAddressSubmit}>
        <label className="xp-addressbar-label" htmlFor={`ie-address-${windowId}`}>{t(COPY.address, currentLanguage)}</label>
        <div className="xp-addressbar-input ie-address">
          <span className="ie-address-icon"><PageIcon /></span>
          <input
            id={`ie-address-${windowId}`}
            type="text"
            value={addressText}
            onChange={(event) => setAddressText(event.target.value)}
            onFocus={(event) => event.target.select()}
            spellCheck="false"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="xp-addressbar-go">{t(COPY.go, currentLanguage)}</button>
      </form>

      {/* Barre de liens */}
      <div className="ie-links">
        <span className="ie-links-label">{t(COPY.links, currentLanguage)}</span>
        {FAVORITES.slice(0, 4).map((favorite) => (
          <button key={favorite.url} type="button" className="ie-link-btn" onClick={() => goTo(favorite.url)}>
            <img src={favorite.icon} alt="" />
            {favorite.label.split(' - ')[0]}
          </button>
        ))}
      </div>

      <div className="ie-body">
        {showFavorites && (
          <aside className="ie-favorites">
            <div className="ie-favorites-head">
              <span>{t(COPY.favorites, currentLanguage)}</span>
              <button
                type="button"
                className="ie-favorites-close"
                aria-label={t(COPY.closeFavorites, currentLanguage)}
                title={t(COPY.closeFavorites, currentLanguage)}
                onClick={() => setShowFavorites(false)}
              >
                ×
              </button>
            </div>
            <ul>
              {FAVORITES.map((favorite) => (
                <li key={favorite.url}>
                  <button type="button" onClick={() => goTo(favorite.url)}>
                    <img src={favorite.icon} alt="" />
                    {favorite.label}
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        )}
        <div className="ie-viewport">{renderPage()}</div>
      </div>

      {/* Barre d'état */}
      <div className="ie-statusbar">
        <span className="ie-status-text">
          <PageIcon />
          {pageInfo.done
            ? t(COPY.done, currentLanguage)
            : `${t(COPY.opening, currentLanguage)} ${currentUrl}...`}
        </span>
        {route.kind === 'frame' && pageInfo.done && (
          <button
            type="button"
            className="ie-status-hint"
            onClick={() => globalThis.open(route.url, '_blank', 'noopener')}
          >
            {t(COPY.blankHint, currentLanguage)}
          </button>
        )}
        <span className={`ie-status-progress ${pageInfo.done ? 'is-done' : ''}`} aria-hidden="true" />
        <span className="ie-status-zone">
          <GlobeIcon />
          {t(COPY.zone, currentLanguage)}
        </span>
      </div>
    </div>
  );
};
