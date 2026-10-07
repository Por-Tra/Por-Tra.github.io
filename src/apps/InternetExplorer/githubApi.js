/**
 * Accès à l'API publique de GitHub (CORS autorisé, aucune clé nécessaire).
 * Limite : 60 requêtes par heure et par visiteur → réponses gardées 10 minutes en sessionStorage.
 */
const API_ROOT = 'https://api.github.com';
const CACHE_PREFIX = 'xp-ie-gh:';
const CACHE_TTL = 10 * 60 * 1000;

export class GitHubApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.isRateLimit = status === 403 || status === 429;
  }
}

const readCache = (key) => {
  try {
    const entry = JSON.parse(globalThis.sessionStorage?.getItem(CACHE_PREFIX + key) || 'null');
    if (entry && Date.now() - entry.time < CACHE_TTL) return entry.data;
  } catch {
    // cache illisible : on refait la requête
  }
  return undefined;
};

const writeCache = (key, data) => {
  try {
    globalThis.sessionStorage?.setItem(CACHE_PREFIX + key, JSON.stringify({ time: Date.now(), data }));
  } catch {
    // stockage plein ou indisponible : pas grave
  }
};

const request = async (path, { accept = 'application/vnd.github+json', asText = false, force = false, signal } = {}) => {
  const key = `${accept}|${path}`;
  if (!force) {
    const cached = readCache(key);
    if (cached !== undefined) return cached;
  }

  const response = await fetch(`${API_ROOT}${path}`, { headers: { Accept: accept }, signal });
  if (!response.ok) {
    throw new GitHubApiError(response.status, `GitHub API ${response.status}`);
  }
  const data = asText ? await response.text() : await response.json();
  writeCache(key, data);
  return data;
};

export const fetchUser = (owner, options) => request(`/users/${encodeURIComponent(owner)}`, options);

export const fetchRepos = (owner, options) =>
  request(`/users/${encodeURIComponent(owner)}/repos?sort=updated&per_page=100`, options);

export const fetchRepo = (owner, repo, options) =>
  request(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`, options);

/** README déjà converti (et nettoyé) en HTML par GitHub ; null si le dépôt n'en a pas */
export const fetchReadmeHtml = async (owner, repo, options) => {
  try {
    return await request(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/readme`, {
      ...options,
      accept: 'application/vnd.github.html+json',
      asText: true,
    });
  } catch (error) {
    if (error instanceof GitHubApiError && error.status === 404) return null;
    throw error;
  }
};
