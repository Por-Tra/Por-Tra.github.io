/**
 * Pages GitHub reconstruites avec l'API publique (github.com refuse d'être affiché dans une iframe).
 */
import { useEffect, useRef, useState } from 'react';
import { t, getLocale } from '../../../i18n/text';
import { fetchUser, fetchRepos, fetchRepo, fetchReadmeHtml } from '../githubApi';

const COPY = {
  loading: { FR: 'Chargement depuis GitHub...', EN: 'Loading from GitHub...', ES: 'Cargando desde GitHub...' },
  repositories: { FR: 'Dépôts', EN: 'Repositories', ES: 'Repositorios' },
  followers: { FR: 'abonnés', EN: 'followers', ES: 'seguidores' },
  following: { FR: 'abonnements', EN: 'following', ES: 'siguiendo' },
  updated: { FR: 'Mis à jour le', EN: 'Updated on', ES: 'Actualizado el' },
  noDescription: { FR: 'Aucune description.', EN: 'No description.', ES: 'Sin descripción.' },
  about: { FR: 'À propos', EN: 'About', ES: 'Acerca de' },
  stars: { FR: 'étoiles', EN: 'stars', ES: 'estrellas' },
  forks: { FR: 'forks', EN: 'forks', ES: 'forks' },
  watchers: { FR: 'observateurs', EN: 'watching', ES: 'observadores' },
  viewOnGitHub: { FR: 'Voir sur GitHub', EN: 'View on GitHub', ES: 'Ver en GitHub' },
  downloadZip: { FR: 'Télécharger le ZIP', EN: 'Download ZIP', ES: 'Descargar ZIP' },
  noReadme: { FR: "Ce dépôt n'a pas de README.", EN: 'This repository has no README.', ES: 'Este repositorio no tiene README.' },
  public: { FR: 'Public', EN: 'Public', ES: 'Público' },
  fork: { FR: 'Fork', EN: 'Fork', ES: 'Fork' },
  rateLimit: {
    FR: "GitHub limite le nombre de consultations (60 par heure). Réessayez dans quelques minutes, ou ouvrez la page directement sur GitHub.",
    EN: 'GitHub limits the number of requests (60 per hour). Try again in a few minutes, or open the page directly on GitHub.',
    ES: 'GitHub limita el número de consultas (60 por hora). Inténtalo de nuevo en unos minutos o abre la página directamente en GitHub.',
  },
  notFound: { FR: 'Cette page GitHub est introuvable.', EN: 'This GitHub page could not be found.', ES: 'No se encontró esta página de GitHub.' },
  networkError: {
    FR: 'Impossible de joindre GitHub. Vérifiez votre connexion Internet.',
    EN: 'Unable to reach GitHub. Check your Internet connection.',
    ES: 'No se puede acceder a GitHub. Comprueba tu conexión a Internet.',
  },
  openInTab: { FR: 'Ouvrir dans un nouvel onglet', EN: 'Open in a new tab', ES: 'Abrir en una pestaña nueva' },
};

// Couleurs des langages, comme sur GitHub
const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5', 'C++': '#f34b7d', C: '#555555',
  'C#': '#178600', PHP: '#4F5D95', HTML: '#e34c26', CSS: '#563d7c', Java: '#b07219',
  Handlebars: '#f7931a', ShaderLab: '#222c37', GLSL: '#5686a5', Shell: '#89e051', Kotlin: '#A97BFF',
};

const GitHubMark = () => (
  <svg viewBox="0 0 16 16" width="32" height="32" aria-hidden="true">
    <path
      fill="currentColor"
      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
    />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
    <path fill="currentColor" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
  </svg>
);

const formatDate = (iso, lang) =>
  new Date(iso).toLocaleDateString(getLocale(lang), { day: 'numeric', month: 'short', year: 'numeric' });

const openInNewTab = (url) => globalThis.open(url, '_blank', 'noopener');

/* README rendu par GitHub, affiché dans une iframe isolée (aucun script autorisé) */
const README_CSS = `
  body { margin: 0; padding: 16px 24px; font: 14px/1.5 -apple-system, "Segoe UI", Helvetica, Arial, sans-serif; color: #1f2328; }
  h1, h2 { border-bottom: 1px solid #d1d9e0; padding-bottom: .3em; }
  h1 { font-size: 2em; } h2 { font-size: 1.5em; } h3 { font-size: 1.25em; }
  a { color: #0969da; text-decoration: none; } a:hover { text-decoration: underline; }
  img { max-width: 100%; }
  code { background: #eff1f3; padding: .2em .4em; border-radius: 6px; font-size: 85%; font-family: Consolas, monospace; }
  pre { background: #f6f8fa; padding: 16px; border-radius: 6px; overflow: auto; }
  pre code { background: none; padding: 0; }
  blockquote { margin: 0; padding: 0 1em; color: #59636e; border-left: .25em solid #d1d9e0; }
  table { border-collapse: collapse; } td, th { border: 1px solid #d1d9e0; padding: 6px 13px; }
  .anchor { display: none; }
  .markdown-heading { position: relative; }
`;

const ReadmeFrame = ({ html, owner, repo, branch }) => {
  const frameRef = useRef(null);
  const observerRef = useRef(null);
  const [height, setHeight] = useState(300);

  useEffect(() => () => observerRef.current?.disconnect(), []);

  const srcDoc = `<!doctype html><html><head><meta charset="utf-8">
    <base href="https://raw.githubusercontent.com/${owner}/${repo}/${branch}/" target="_blank">
    <style>${README_CSS}</style></head><body>${html}</body></html>`;

  // Ajuste la hauteur de l'iframe à son contenu (même origine grâce à allow-same-origin, mais sans script)
  const handleLoad = () => {
    const body = frameRef.current?.contentDocument?.body;
    if (!body) return;
    const update = () => setHeight(body.scrollHeight + 32);
    update();
    observerRef.current?.disconnect();
    observerRef.current = new ResizeObserver(update);
    observerRef.current.observe(body);
  };

  return (
    <iframe
      ref={frameRef}
      title="README"
      className="ie-gh-readme"
      sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      srcDoc={srcDoc}
      style={{ height }}
      onLoad={handleLoad}
    />
  );
};

const ErrorBox = ({ error, url, currentLanguage }) => {
  const message = error?.isRateLimit
    ? COPY.rateLimit
    : error?.status === 404
      ? COPY.notFound
      : COPY.networkError;
  return (
    <div className="ie-gh-error">
      <p>{t(message, currentLanguage)}</p>
      <button type="button" className="xp-button px-3" onClick={() => openInNewTab(url)}>
        {t(COPY.openInTab, currentLanguage)}
      </button>
    </div>
  );
};

/* ---------------- Profil ---------------- */
const ProfileView = ({ data, owner, navigate, currentLanguage }) => {
  const { user, repos } = data;
  return (
    <div className="ie-gh-layout">
      <aside className="ie-gh-profile">
        <img className="ie-gh-avatar" src={user.avatar_url} alt="" />
        <h1 className="ie-gh-name">{user.name || user.login}</h1>
        <p className="ie-gh-login">{user.login}</p>
        {user.bio && <p className="ie-gh-bio">{user.bio.trim()}</p>}
        <a
          className="xp-button ie-gh-follow"
          href={`https://github.com/${owner}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t(COPY.viewOnGitHub, currentLanguage)} ↗
        </a>
        <p className="ie-gh-muted">
          <strong>{user.followers}</strong> {t(COPY.followers, currentLanguage)} · <strong>{user.following}</strong>{' '}
          {t(COPY.following, currentLanguage)}
        </p>
        {user.location && <p className="ie-gh-muted">📍 {user.location}</p>}
        {user.blog && (
          <p>
            <button type="button" className="ie-gh-link" onClick={() => navigate(user.blog)}>
              🔗 {user.blog.replace(/^https?:\/\//, '')}
            </button>
          </p>
        )}
      </aside>

      <section className="ie-gh-main">
        <h2 className="ie-gh-section-title">
          {t(COPY.repositories, currentLanguage)} <span className="ie-gh-counter">{repos.length}</span>
        </h2>
        <ul className="ie-gh-repos">
          {repos.map((repo) => (
            <li key={repo.id} className="ie-gh-repo">
              <div className="ie-gh-repo-head">
                <button
                  type="button"
                  className="ie-gh-link ie-gh-repo-name"
                  onClick={() => navigate(`https://github.com/${owner}/${repo.name}`)}
                >
                  {repo.name}
                </button>
                <span className="ie-gh-badge">{t(repo.fork ? COPY.fork : COPY.public, currentLanguage)}</span>
              </div>
              <p className="ie-gh-muted">{repo.description || t(COPY.noDescription, currentLanguage)}</p>
              <p className="ie-gh-meta">
                {repo.language && (
                  <span>
                    <span className="ie-gh-lang-dot" style={{ background: LANGUAGE_COLORS[repo.language] || '#8b949e' }} />
                    {repo.language}
                  </span>
                )}
                {repo.stargazers_count > 0 && (
                  <span><StarIcon /> {repo.stargazers_count}</span>
                )}
                <span>{t(COPY.updated, currentLanguage)} {formatDate(repo.pushed_at || repo.updated_at, currentLanguage)}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

/* ---------------- Dépôt ---------------- */
const RepoView = ({ data, owner, navigate, currentLanguage }) => {
  const { repo, readme } = data;
  return (
    <div className="ie-gh-repo-page">
      <div className="ie-gh-repo-title">
        <button type="button" className="ie-gh-link" onClick={() => navigate(`https://github.com/${owner}`)}>
          {owner}
        </button>
        <span className="ie-gh-muted"> / </span>
        <strong>{repo.name}</strong>
        <span className="ie-gh-badge">{t(repo.fork ? COPY.fork : COPY.public, currentLanguage)}</span>
      </div>

      <div className="ie-gh-layout ie-gh-layout--repo">
        <section className="ie-gh-main">
          <div className="ie-gh-readme-box">
            <div className="ie-gh-readme-head">README</div>
            {readme ? (
              <ReadmeFrame html={readme} owner={owner} repo={repo.name} branch={repo.default_branch} />
            ) : (
              <p className="ie-gh-muted ie-gh-pad">{t(COPY.noReadme, currentLanguage)}</p>
            )}
          </div>
        </section>

        <aside className="ie-gh-about">
          <h2 className="ie-gh-section-title">{t(COPY.about, currentLanguage)}</h2>
          <p>{repo.description || t(COPY.noDescription, currentLanguage)}</p>
          {repo.homepage && (
            <p>
              <button type="button" className="ie-gh-link" onClick={() => navigate(repo.homepage)}>
                🔗 {repo.homepage.replace(/^https?:\/\//, '')}
              </button>
            </p>
          )}
          {repo.topics?.length > 0 && (
            <p className="ie-gh-topics">
              {repo.topics.map((topic) => <span key={topic} className="ie-gh-topic">{topic}</span>)}
            </p>
          )}
          <p className="ie-gh-muted"><StarIcon /> {repo.stargazers_count} {t(COPY.stars, currentLanguage)}</p>
          <p className="ie-gh-muted">👁 {repo.subscribers_count ?? repo.watchers_count} {t(COPY.watchers, currentLanguage)}</p>
          <p className="ie-gh-muted">⑂ {repo.forks_count} {t(COPY.forks, currentLanguage)}</p>
          {repo.language && (
            <p className="ie-gh-muted">
              <span className="ie-gh-lang-dot" style={{ background: LANGUAGE_COLORS[repo.language] || '#8b949e' }} />
              {repo.language}
            </p>
          )}
          <p className="ie-gh-muted">
            {t(COPY.updated, currentLanguage)} {formatDate(repo.pushed_at || repo.updated_at, currentLanguage)}
          </p>
          <div className="ie-gh-actions">
            <a className="xp-button" href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {t(COPY.viewOnGitHub, currentLanguage)} ↗
            </a>
            <a
              className="xp-button"
              href={`https://github.com/${owner}/${repo.name}/archive/refs/heads/${repo.default_branch}.zip`}
            >
              {t(COPY.downloadZip, currentLanguage)}
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
};

/**
 * Le parent remonte le composant (key) à chaque adresse ou actualisation :
 * l'état initial est donc toujours « chargement ».
 */
const GitHubPage = ({ owner, repo, url, force = false, navigate, onPageInfo, currentLanguage }) => {
  const [state, setState] = useState({ status: 'loading' });

  useEffect(() => {
    const controller = new AbortController();
    const options = { force, signal: controller.signal };

    const load = repo
      ? Promise.all([fetchRepo(owner, repo, options), fetchReadmeHtml(owner, repo, options)])
        .then(([repoData, readme]) => ({ repo: repoData, readme }))
      : Promise.all([fetchUser(owner, options), fetchRepos(owner, options)])
        .then(([user, repos]) => ({ user, repos }));

    load
      .then((data) => {
        setState({ status: 'ok', data });
        onPageInfo?.({
          title: repo
            ? `${owner}/${repo}${data.repo.description ? ` : ${data.repo.description}` : ''}`
            : `${owner}${data.user.name ? ` (${data.user.name})` : ''}`,
          suffix: 'GitHub',
          done: true,
        });
      })
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setState({ status: 'error', error });
        onPageInfo?.({ title: 'GitHub', suffix: null, done: true, error: true });
      });

    return () => controller.abort();
  }, [owner, repo, force, onPageInfo]);

  return (
    <div className="ie-web ie-gh">
      <header className="ie-gh-header">
        <button type="button" className="ie-gh-home" onClick={() => navigate(`https://github.com/${owner}`)} aria-label="GitHub">
          <GitHubMark />
        </button>
        <span className="ie-gh-header-path">{repo ? `${owner} / ${repo}` : owner}</span>
      </header>

      {state.status === 'loading' && <p className="ie-gh-muted ie-gh-pad">{t(COPY.loading, currentLanguage)}</p>}
      {state.status === 'error' && <ErrorBox error={state.error} url={url} currentLanguage={currentLanguage} />}
      {state.status === 'ok' && (repo
        ? <RepoView data={state.data} owner={owner} navigate={navigate} currentLanguage={currentLanguage} />
        : <ProfileView data={state.data} owner={owner} navigate={navigate} currentLanguage={currentLanguage} />)}
    </div>
  );
};

export default GitHubPage;
