/**
 * Décide comment Internet Explorer affiche une adresse.
 *
 * Le site est statique (GitHub Pages) : impossible de passer par un proxy. Or la plupart des grands
 * sites interdisent d'être affichés dans une iframe (en-têtes X-Frame-Options / CSP frame-ancestors).
 * D'où plusieurs modes :
 * - 'github'   : pages reconstruites avec l'API publique de GitHub (autorisée depuis n'importe quel site)
 * - 'frame'    : affichage direct dans une iframe (Google via igu=1, Wikipédia, archive.org...)
 * - 'blocked'  : site connu pour refuser l'intégration → page d'erreur IE + ouverture dans un onglet
 */

export const HOME_URL = 'https://www.google.com/';
export const GITHUB_USER = 'Por-Tra';

// Sites qui refusent d'être affichés dans une autre page (vérifié sur leurs en-têtes HTTP)
const BLOCKED_HOSTS = [
  'linkedin.com', 'facebook.com', 'instagram.com', 'twitter.com', 'x.com', 'bing.com',
  'duckduckgo.com', 'youtube.com', 'reddit.com', 'stackoverflow.com', 'amazon.com',
  'amazon.fr', 'microsoft.com', 'apple.com', 'netflix.com', 'tiktok.com', 'discord.com',
  'gitlab.com', 'chatgpt.com', 'openai.com', 'claude.ai',
];

const matchesHost = (host, domain) => host === domain || host.endsWith(`.${domain}`);

const looksLikeUrl = (text) =>
  /^[a-z][a-z0-9+.-]*:\/\//i.test(text) || /^(localhost|[\w-]+(\.[\w-]+)+)(:\d+)?(\/.*)?$/i.test(text);

/** Texte de la barre d'adresse → URL complète (sinon recherche Google) */
export const normalizeInput = (input) => {
  const text = input.trim();
  if (!text) return HOME_URL;
  if (looksLikeUrl(text)) {
    return /^[a-z][a-z0-9+.-]*:\/\//i.test(text) ? text : `https://${text}`;
  }
  return `https://www.google.com/search?q=${encodeURIComponent(text)}`;
};

/**
 * @returns {{ kind: string, url: string, frameUrl?: string, owner?: string, repo?: string }}
 */
export const resolveUrl = (rawUrl) => {
  let url;
  try {
    url = new URL(rawUrl);
  } catch {
    return { kind: 'blocked', url: rawUrl, reason: 'invalid' };
  }

  if (!['http:', 'https:'].includes(url.protocol)) {
    return { kind: 'blocked', url: rawUrl, reason: 'invalid' };
  }

  const host = url.hostname.toLowerCase().replace(/^www\./, '');
  const segments = url.pathname.split('/').filter(Boolean);

  // GitHub : profil ou dépôt, via l'API
  if (host === 'github.com') {
    const [owner = GITHUB_USER, repo] = segments;
    return {
      kind: 'github',
      url: repo ? `https://github.com/${owner}/${repo}` : `https://github.com/${owner}`,
      owner,
      repo,
    };
  }

  // Google n'accepte d'être intégré qu'avec le paramètre igu=1
  if (host === 'google.com' || host === 'google.fr') {
    const frame = new URL(url.href);
    frame.hostname = 'www.google.com';
    frame.searchParams.set('igu', '1');
    return { kind: 'frame', url: url.href, frameUrl: frame.href };
  }

  if (BLOCKED_HOSTS.some((domain) => matchesHost(host, domain))) {
    // Exception : les vidéos YouTube intégrables
    if (matchesHost(host, 'youtube.com') && segments[0] === 'embed') {
      return { kind: 'frame', url: url.href, frameUrl: url.href };
    }
    return { kind: 'blocked', url: url.href, reason: 'refused' };
  }

  return { kind: 'frame', url: url.href, frameUrl: url.href };
};
