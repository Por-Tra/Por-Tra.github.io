/**
 * Application: Projects
 * 
 * Liste des projets - Style Windows XP
 */
import { useState } from 'react';
import { MenuBar, useZoom, getZoomStyle } from '../../components/ProjectLayout';
import { useSearchHighlight } from '../../hooks/useSearchHighlight.jsx';
import { t } from '../../i18n/text';

export const config = {
  id: 'projects',
  name: 'Mes Projets',
  icon: '/icons/folder.webp',
  defaultWidth: 750,
  defaultHeight: 550,
};

const projects = [
  {
    id: 'project-rpg',
    name: { FR: 'RPG 2D', EN: '2D RPG', ES: 'RPG 2D' },
    description: {
      FR: "Jeu vidéo RPG style Pokemon développé en Python avec Pygame. Système de combat au tour par tour, exploration de carte, et gestion d'inventaire.",
      EN: "Pokemon-style RPG video game built in Python with Pygame. Turn-based combat, map exploration, and inventory management.",
      ES: "Videojuego RPG estilo Pokemon desarrollado en Python con Pygame. Combate por turnos, exploración de mapas y gestión de inventario.",
    },
    date: '2022-2023',
    languages: ['Python', 'Pygame'],
    status: 'done',
  },
  {
    id: 'project-soutenance',
    name: { FR: 'Projet Soutenance', EN: 'Defense Project', ES: 'Proyecto de Defensa' },
    description: {
      FR: 'Application web permettant la notation des élèves par les professeurs. Interface intuitive avec gestion des notes et génération de bulletins.',
      EN: 'Web application for teachers to grade students. Intuitive UI with grade management and report generation.',
      ES: 'Aplicación web para que los profesores califiquen a los estudiantes. Interfaz intuitiva con gestión de calificaciones y generación de informes.',
    },
    date: '2025',
    languages: ['HTML', 'CSS', 'PHP', 'SQL'],
    status: 'inProgress',
  },
  {
    id: 'project-reseau',
    name: { FR: 'Réseau Social Local', EN: 'Local Social Network', ES: 'Red Social Local' },
    description: {
      FR: 'Application de messagerie instantanée fonctionnant en réseau local. Chat en temps réel, partage de fichiers et salons de discussion.',
      EN: 'Local network messaging app with real-time chat, file sharing, and chat rooms.',
      ES: 'Aplicación de mensajería en red local con chat en tiempo real, intercambio de archivos y salas de chat.',
    },
    date: '2024',
    languages: ['Python', 'Socket'],
    status: 'done',
  },
];

const COPY = {
  toolbarBack: { FR: 'Précédent', EN: 'Back', ES: 'Atras' },
  toolbarNext: { FR: 'Suivant', EN: 'Next', ES: 'Siguiente' },
  viewList: { FR: 'Liste', EN: 'List', ES: 'Lista' },
  viewDetails: { FR: 'Détails', EN: 'Details', ES: 'Detalles' },
  address: { FR: 'Adresse', EN: 'Address', ES: 'Dirección' },
  addressPath: { FR: 'C:\\Projets', EN: 'C:\\Projects', ES: 'C:\\Proyectos' },
  addressOk: { FR: 'OK' },
  fileMgmt: { FR: 'Gestion des fichiers', EN: 'File management', ES: 'Gestión de archivos' },
  createFolder: { FR: 'Créer un dossier', EN: 'Create a folder', ES: 'Crear una carpeta' },
  publishFolder: { FR: 'Publier ce dossier', EN: 'Publish this folder', ES: 'Publicar esta carpeta' },
  details: { FR: 'Détails', EN: 'Details', ES: 'Detalles' },
  projectsLabel: { FR: 'Projets', EN: 'Projects', ES: 'Proyectos' },
  inProgressLabel: { FR: 'En cours', EN: 'In progress', ES: 'En progreso' },
  doneLabel: { FR: 'Terminé', EN: 'Completed', ES: 'Completado' },
  pageTitle: { FR: 'Mes Projets', EN: 'My Projects', ES: 'Mis Proyectos' },
  pageSubtitle: { FR: 'Portfolio de développement', EN: 'Development portfolio', ES: 'Portafolio de desarrollo' },
  emptySearch: { FR: 'Aucun projet ne correspond à votre recherche', EN: 'No projects match your search', ES: 'No hay proyectos que coincidan con su búsqueda' },
  emptyAll: { FR: 'Aucun projet disponible', EN: 'No projects available', ES: 'No hay proyectos disponibles' },
  tableName: { FR: 'Nom', EN: 'Name', ES: 'Nombre' },
  tableDescription: { FR: 'Description', EN: 'Description', ES: 'Descripción' },
  tableTech: { FR: 'Technologies', EN: 'Technologies', ES: 'Tecnologías' },
  tableDate: { FR: 'Date', EN: 'Date', ES: 'Fecha' },
  tableStatus: { FR: 'Statut', EN: 'Status', ES: 'Estado' },
  tipLabel: { FR: 'Astuce', EN: 'Tip', ES: 'Consejo' },
  tipBody: {
    FR: 'Double-cliquez sur les dossiers de projets sur le bureau pour voir les détails complets avec captures d\'écran et liens GitHub!',
    EN: 'Double-click the project folders on the desktop to see full details with screenshots and GitHub links!',
    ES: '¡Haz doble clic en las carpetas de proyectos en el escritorio para ver todos los detalles con capturas de pantalla y enlaces de GitHub!',
  },
  statusProjects: { FR: 'projets', EN: 'projects', ES: 'proyectos' },
  statusInProgress: { FR: 'en cours', EN: 'in progress', ES: 'en progreso' },
};

const STATUS_LABELS = {
  done: COPY.doneLabel,
  inProgress: COPY.inProgressLabel,
};

export const Component = ({ currentLanguage }) => {
  const { zoom, zoomIn, zoomOut, resetZoom } = useZoom();
  const [viewMode, setViewMode] = useState('list');
  const [selectedProject, setSelectedProject] = useState(null);
  const { query, filterItems, highlightText, isSearching } = useSearchHighlight('projects');

  // Filter projects based on search query
  const filteredProjects = filterItems(projects, (p) => {
    const name = t(p.name, currentLanguage);
    const description = t(p.description, currentLanguage);
    return `${name} ${description}`;
  });

  return (
    <div className="xp-app">
      {/* Menu Bar avec Zoom */}
      <MenuBar 
        zoom={zoom} 
        onZoomIn={zoomIn} 
        onZoomOut={zoomOut} 
        onReset={resetZoom}
        currentLanguage={currentLanguage}
      />

      {/* Toolbar */}
      <div className="xp-toolbar">
        <button className="xp-toolbar-btn">
          <img src="/icons/back.webp" alt="" className="w-4 h-4" />
          {t(COPY.toolbarBack, currentLanguage)}
        </button>
        <button className="xp-toolbar-btn">
          <img src="/icons/back.webp" style={{ transform: 'scaleX(-1)' }} alt="" className="w-4 h-4" />
          {t(COPY.toolbarNext, currentLanguage)}
        </button>
        <div className="xp-toolbar-separator" />
        <button 
          className={`xp-toolbar-btn ${viewMode === 'list' ? 'bg-[#316ac5] text-white' : ''}`}
          onClick={() => setViewMode('list')}
        >
          <img src="/icons/folder.webp" alt="" className="w-4 h-4" />
          {t(COPY.viewList, currentLanguage)}
        </button>
        <button 
          className={`xp-toolbar-btn ${viewMode === 'details' ? 'bg-[#316ac5] text-white' : ''}`}
          onClick={() => setViewMode('details')}
        >
          <img src="/icons/note.webp" alt="" className="w-4 h-4" />
          {t(COPY.viewDetails, currentLanguage)}
        </button>
      </div>

      {/* Address Bar */}
      <div className="xp-addressbar">
        <span className="xp-addressbar-label">{t(COPY.address, currentLanguage)}</span>
        <div className="xp-addressbar-input">
          <img src="/icons/folder.webp" alt="" className="w-4 h-4" />
          <span>{t(COPY.addressPath, currentLanguage)}</span>
        </div>
        <button className="xp-addressbar-go">{t(COPY.addressOk, currentLanguage)}</button>
      </div>

      {/* Main Content */}
      <div className="xp-content xp-content-zoomable" style={getZoomStyle(zoom)}>
        {/* Sidebar */}
        <div className="xp-sidebar">
          <div className="xp-sidebar-box">
            <div className="xp-sidebar-title">
              <img src="/icons/folder.webp" alt="" />
              {t(COPY.fileMgmt, currentLanguage)}
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/folder.webp" alt="" />
              {t(COPY.createFolder, currentLanguage)}
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/explorer.webp" alt="" />
              {t(COPY.publishFolder, currentLanguage)}
            </div>
          </div>

          <div className="xp-sidebar-box">
            <div className="xp-sidebar-title">
              <img src="/icons/questionMark.webp" alt="" />
              {t(COPY.details, currentLanguage)}
            </div>
            <div className="xp-sidebar-text">
              <p><strong>{t(COPY.projectsLabel, currentLanguage)}:</strong> {filteredProjects.length}</p>
              <p><strong>{t(COPY.inProgressLabel, currentLanguage)}:</strong> {filteredProjects.filter(p => p.status === 'inProgress').length}</p>
              <p><strong>{t(COPY.doneLabel, currentLanguage)}:</strong> {filteredProjects.filter(p => p.status === 'done').length}</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="xp-content-main">
          {/* Page Header */}
          <div className="xp-page-header">
            <img src="/icons/folder.webp" alt="" className="xp-page-header-icon" />
            <div>
              <h1 className="xp-page-title">{t(COPY.pageTitle, currentLanguage)}</h1>
              <p className="xp-page-subtitle">{t(COPY.pageSubtitle, currentLanguage)}</p>
            </div>
          </div>

          {/* List View */}
          {viewMode === 'list' && (
            <div className="xp-box">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                    className={`xp-flex xp-gap-2 xp-items-center xp-p-2 cursor-pointer
                               ${index !== filteredProjects.length - 1 ? 'border-b border-[#e0e0e0]' : ''}
                               ${selectedProject === project.id ? 'bg-[#316ac5] text-white' : 'hover:bg-[#e8f0ff]'}`}
                    style={{ padding: '8px' }}
                  >
                    <img src="/icons/folder.webp" alt="" className="w-8 h-8" />
                    <div className="xp-flex-1">
                      <div className="xp-flex xp-gap-2 xp-items-center">
                        <span className="xp-text-bold">{highlightText(t(project.name, currentLanguage))}</span>
                        <span className={`xp-tag ${project.status === 'inProgress' ? 'xp-tag-yellow' : 'xp-tag-green'}`}>
                          {t(STATUS_LABELS[project.status], currentLanguage)}
                        </span>
                      </div>
                      <p className={`xp-text-sm ${selectedProject === project.id ? 'text-white' : 'xp-text-gray'}`}>
                        {highlightText(t(project.description, currentLanguage))}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`xp-text-sm ${selectedProject === project.id ? 'text-white' : 'xp-text-gray'}`}>
                        {project.date}
                      </p>
                      <div className="xp-flex xp-gap-1" style={{ justifyContent: 'flex-end', marginTop: '4px' }}>
                        {project.languages.map((lang) => (
                          <span key={lang} className="xp-tag xp-tag-blue">{lang}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="xp-text-gray" style={{ padding: '16px', textAlign: 'center' }}>
                  {isSearching ? t(COPY.emptySearch, currentLanguage) : t(COPY.emptyAll, currentLanguage)}
                </div>
              )}
            </div>
          )}

          {/* Details View */}
          {viewMode === 'details' && (
            <div className="xp-box">
              {filteredProjects.length > 0 ? (
                <table className="xp-table">
                  <thead>
                    <tr>
                      <th>{t(COPY.tableName, currentLanguage)}</th>
                      <th>{t(COPY.tableDescription, currentLanguage)}</th>
                      <th>{t(COPY.tableTech, currentLanguage)}</th>
                      <th>{t(COPY.tableDate, currentLanguage)}</th>
                      <th>{t(COPY.tableStatus, currentLanguage)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map((project) => (
                      <tr 
                        key={project.id}
                        onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                        className="cursor-pointer"
                      >
                        <td>
                          <div className="xp-flex xp-gap-2 xp-items-center">
                            <img src="/icons/folder.webp" alt="" className="w-4 h-4" />
                            <span className="xp-text-bold">{highlightText(t(project.name, currentLanguage))}</span>
                          </div>
                        </td>
                        <td className="xp-text-gray" style={{ maxWidth: '200px' }}>
                          {highlightText(t(project.description, currentLanguage).substring(0, 50))}...
                        </td>
                        <td>
                          {project.languages.map((lang) => (
                            <span key={lang} className="xp-tag xp-tag-blue">{lang}</span>
                          ))}
                        </td>
                        <td>{project.date}</td>
                        <td>
                          <span className={`xp-tag ${project.status === 'inProgress' ? 'xp-tag-yellow' : 'xp-tag-green'}`}>
                            {t(STATUS_LABELS[project.status], currentLanguage)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="xp-text-gray" style={{ padding: '16px', textAlign: 'center' }}>
                  {isSearching ? t(COPY.emptySearch, currentLanguage) : t(COPY.emptyAll, currentLanguage)}
                </div>
              )}
            </div>
          )}

          {/* Tip Box */}
          <div className="xp-tipbox xp-mt-3">
            <img src="/icons/questionMark.webp" alt="" />
            <div className="xp-tipbox-text">
              <strong>{t(COPY.tipLabel, currentLanguage)}:</strong> {t(COPY.tipBody, currentLanguage)}
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="xp-statusbar">
        <span>{filteredProjects.length} {t(COPY.statusProjects, currentLanguage)}</span>
        <span>{filteredProjects.filter(p => p.status === 'inProgress').length} {t(COPY.statusInProgress, currentLanguage)}</span>
      </div>
    </div>
  );
};
