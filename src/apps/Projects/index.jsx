/**
 * Application: Projects (« Mes Projets »)
 *
 * Inspirée de « Ajout/Suppression de programmes » de Windows XP : catégories dans la colonne de gauche,
 * liste des projets, et l'élément sélectionné se déplie avec un résumé et un bouton pour l'ouvrir.
 *
 * Les informations (nom, icône, description, date, technologies) viennent directement de chaque
 * projet (config + projectData) : rien n'est recopié ici, le détail complet reste dans le projet.
 */
import { useMemo, useState } from 'react';
import { useSearchHighlight } from '../../hooks/useSearchHighlight.jsx';
import { t, getAppLabel } from '../../i18n/text';
import * as Polenofs from './Polenofs';
import * as PortrAI from './Portr-AI';
import * as ProjectReseau from './ProjectReseau';
import * as ForgeDesHeros from './Forge-des-heros';
import * as ProjectVapeur from './ProjectVapeur';
import * as ProjectSoutenance from './ProjectSoutenance';

export const config = {
  id: 'projects',
  name: 'Mes Projets',
  icon: '/icons/folder.webp',
  defaultWidth: 780,
  defaultHeight: 560,
};

/**
 * Projets affichés, par catégorie (du plus récent au plus ancien).
 * Pour ajouter un projet : exporter `projectData` depuis son fichier, puis l'ajouter ici.
 */
const CATEGORIES = [
  {
    id: 'ai',
    label: { FR: 'IA & Machine Learning', EN: 'AI & Machine Learning', ES: 'IA y Machine Learning' },
    projects: [Polenofs, PortrAI],
  },
  {
    id: 'software',
    label: { FR: 'Développement logiciel', EN: 'Software development', ES: 'Desarrollo de software' },
    projects: [ForgeDesHeros, ProjectVapeur, ProjectSoutenance, ProjectReseau],
  },
];

const SUMMARY_MAX_LENGTH = 230;

const COPY = {
  all: { FR: 'Tous les projets', EN: 'All projects', ES: 'Todos los proyectos' },
  heading: { FR: 'Projets actuellement installés :', EN: 'Currently installed projects:', ES: 'Proyectos instalados actualmente:' },
  sortBy: { FR: 'Trier par :', EN: 'Sort by:', ES: 'Ordenar por:' },
  sortRecent: { FR: 'Plus récent', EN: 'Most recent', ES: 'Más reciente' },
  sortName: { FR: 'Nom', EN: 'Name', ES: 'Nombre' },
  date: { FR: 'Date', EN: 'Date', ES: 'Fecha' },
  technologies: { FR: 'Technologies :', EN: 'Technologies:', ES: 'Tecnologías:' },
  team: { FR: 'Équipe :', EN: 'Team:', ES: 'Equipo:' },
  details: {
    FR: 'Cliquez sur « Ouvrir » pour voir le projet en détail.',
    EN: 'Click "Open" to see the full project.',
    ES: 'Haz clic en «Abrir» para ver el proyecto completo.',
  },
  open: { FR: 'Ouvrir', EN: 'Open', ES: 'Abrir' },
  empty: { FR: 'Aucun projet ne correspond à votre recherche.', EN: 'No project matches your search.', ES: 'Ningún proyecto coincide con tu búsqueda.' },
  count: { FR: 'projet(s)', EN: 'project(s)', ES: 'proyecto(s)' },
};

// Première(s) phrase(s) de la description du projet, pour un aperçu court
const getSummary = (description) => {
  if (!description || description.length <= SUMMARY_MAX_LENGTH) return description;
  const cut = description.slice(0, SUMMARY_MAX_LENGTH);
  const sentenceEnd = cut.lastIndexOf('. ');
  return sentenceEnd > 80 ? cut.slice(0, sentenceEnd + 1) : `${cut.slice(0, cut.lastIndexOf(' '))}…`;
};

/* Icônes de la colonne de gauche, dans le style Luna */
const AiIcon = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <rect x="7" y="7" width="18" height="18" rx="3" fill="#3a6fc4" stroke="#163a8a" />
    <rect x="11" y="11" width="10" height="10" rx="1.5" fill="#bfe0ff" />
    <path d="M13 3v4M19 3v4M13 25v4M19 25v4M3 13h4M3 19h4M25 13h4M25 19h4" stroke="#8a96a8" strokeWidth="2" />
    <circle cx="16" cy="16" r="2.5" fill="#3a6fc4" />
  </svg>
);

const SoftwareIcon = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <rect x="3" y="5" width="26" height="22" rx="2" fill="#fff" stroke="#3a6fc4" strokeWidth="1.5" />
    <rect x="3" y="5" width="26" height="5" rx="2" fill="#3a6fc4" />
    <path d="M12 14l-4 4 4 4M20 14l4 4-4 4M17.5 13l-3 10" fill="none" stroke="#1b4fae" strokeWidth="1.8" />
  </svg>
);

const AllIcon = () => (
  <svg viewBox="0 0 32 32" aria-hidden="true">
    <path d="M3 9a2 2 0 0 1 2-2h7l3 3h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="#f6d36b" stroke="#b48a1c" />
    <path d="M3 13h26v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="#fbe39a" stroke="#b48a1c" />
  </svg>
);

const CATEGORY_ICONS = { all: AllIcon, ai: AiIcon, software: SoftwareIcon };

export const Component = ({ currentLanguage, onOpenApp, windowId }) => {
  const [categoryId, setCategoryId] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedId, setSelectedId] = useState(null);
  const { filterItems, highlightText } = useSearchHighlight(windowId);

  // Projets de la catégorie choisie, lus depuis leur propre fichier
  const projects = useMemo(() => {
    const categories = categoryId === 'all' ? CATEGORIES : CATEGORIES.filter((c) => c.id === categoryId);
    const list = categories.flatMap((category) =>
      category.projects.map((module, order) => ({
        id: module.config.id,
        name: getAppLabel(module.config.id, module.config.name, currentLanguage),
        icon: module.config.icon,
        data: module.projectData,
        category,
        order,
      }))
    );
    if (sortBy === 'name') {
      return [...list].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
    }
    return list;
  }, [categoryId, sortBy, currentLanguage]);

  const visibleProjects = filterItems(projects, (project) => project.name);

  const sidebarButtons = [
    { id: 'all', label: COPY.all },
    ...CATEGORIES.map((category) => ({ id: category.id, label: category.label })),
  ];

  return (
    <div className="xp-app xp-arp">
      {/* Colonne de gauche : catégories, comme « Modifier ou supprimer des programmes » */}
      <nav className="xp-arp-sidebar" aria-label={t(COPY.heading, currentLanguage)}>
        {sidebarButtons.map((button) => {
          const Icon = CATEGORY_ICONS[button.id];
          return (
            <button
              key={button.id}
              type="button"
              className={`xp-arp-category ${categoryId === button.id ? 'is-active' : ''}`}
              aria-pressed={categoryId === button.id}
              onClick={() => {
                setCategoryId(button.id);
                setSelectedId(null);
              }}
            >
              <Icon />
              <span>{t(button.label, currentLanguage)}</span>
            </button>
          );
        })}
      </nav>

      <section className="xp-arp-main">
        <header className="xp-arp-header">
          <span className="xp-arp-heading">{t(COPY.heading, currentLanguage)}</span>
          <label className="xp-arp-sort">
            {t(COPY.sortBy, currentLanguage)}
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="recent">{t(COPY.sortRecent, currentLanguage)}</option>
              <option value="name">{t(COPY.sortName, currentLanguage)}</option>
            </select>
          </label>
        </header>

        <div className="xp-arp-list" role="listbox" aria-label={t(COPY.heading, currentLanguage)}>
          {visibleProjects.length === 0 && <p className="xp-arp-empty">{t(COPY.empty, currentLanguage)}</p>}

          {visibleProjects.map((project, index) => {
            const isSelected = project.id === selectedId;
            const showGroup = categoryId === 'all' && sortBy === 'recent'
              && (index === 0 || visibleProjects[index - 1].category.id !== project.category.id);
            return (
              <div key={project.id}>
                {showGroup && <div className="xp-arp-group">{t(project.category.label, currentLanguage)}</div>}
                <div
                  className={`xp-arp-item ${isSelected ? 'is-selected' : ''}`}
                  role="option"
                  aria-selected={isSelected}
                  tabIndex={0}
                  onClick={() => setSelectedId(project.id)}
                  onDoubleClick={() => onOpenApp?.(project.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') onOpenApp?.(project.id);
                  }}
                >
                  <div className="xp-arp-row">
                    <img className="xp-arp-icon" src={project.icon} alt="" />
                    <span className="xp-arp-name">{highlightText(project.name)}</span>
                    <span className="xp-arp-date">
                      <span className="xp-arp-label">{t(COPY.date, currentLanguage)}</span>
                      {t(project.data.date, currentLanguage)}
                    </span>
                  </div>

                  {isSelected && (
                    <div className="xp-arp-details">
                      <p className="xp-arp-summary">{getSummary(t(project.data.description, currentLanguage))}</p>
                      <p>
                        <span className="xp-arp-label">{t(COPY.technologies, currentLanguage)}</span>
                        {project.data.languages.join(', ')}
                      </p>
                      <p>
                        <span className="xp-arp-label">{t(COPY.team, currentLanguage)}</span>
                        {t(project.data.team, currentLanguage)}
                      </p>
                      <div className="xp-arp-actions">
                        <span className="xp-arp-hint">{t(COPY.details, currentLanguage)}</span>
                        <button
                          type="button"
                          className="xp-button xp-arp-open"
                          onClick={(event) => {
                            event.stopPropagation();
                            onOpenApp?.(project.id);
                          }}
                        >
                          {t(COPY.open, currentLanguage)}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <footer className="xp-arp-footer">
          {visibleProjects.length} {t(COPY.count, currentLanguage)}
        </footer>
      </section>
    </div>
  );
};
