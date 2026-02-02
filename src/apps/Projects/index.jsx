/**
 * Application: Projects
 * 
 * Liste des projets - Style Windows XP
 */
import { useState } from 'react';
import { MenuBar, useZoom, getZoomStyle } from '../../components/ProjectLayout';

export const config = {
  id: 'projects',
  name: 'Mes Projets',
  icon: '/icons/folder.png',
  defaultWidth: 750,
  defaultHeight: 550,
};

const projects = [
  {
    id: 'project-rpg',
    name: 'RPG 2D',
    description: 'Jeu vidéo RPG style Pokemon développé en Python avec Pygame. Système de combat au tour par tour, exploration de carte, et gestion d\'inventaire.',
    date: '2022-2023',
    languages: ['Python', 'Pygame'],
    status: 'Terminé',
  },
  {
    id: 'project-soutenance',
    name: 'Projet Soutenance',
    description: 'Application web permettant la notation des élèves par les professeurs. Interface intuitive avec gestion des notes et génération de bulletins.',
    date: '2025',
    languages: ['HTML', 'CSS', 'PHP', 'SQL'],
    status: 'En cours',
  },
  {
    id: 'project-reseau',
    name: 'Réseau Social Local',
    description: 'Application de messagerie instantanée fonctionnant en réseau local. Chat en temps réel, partage de fichiers et salons de discussion.',
    date: '2024',
    languages: ['Python', 'Socket'],
    status: 'Terminé',
  },
];

export const Component = () => {
  const { zoom, zoomIn, zoomOut, resetZoom } = useZoom();
  const [viewMode, setViewMode] = useState('list');
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="xp-app">
      {/* Menu Bar avec Zoom */}
      <MenuBar 
        zoom={zoom} 
        onZoomIn={zoomIn} 
        onZoomOut={zoomOut} 
        onReset={resetZoom}
      />

      {/* Toolbar */}
      <div className="xp-toolbar">
        <button className="xp-toolbar-btn">
          <img src="/icons/arrow_left.png" alt="" className="w-4 h-4" />
          Précédent
        </button>
        <button className="xp-toolbar-btn">
          <img src="/icons/arrow_right.png" alt="" className="w-4 h-4" />
          Suivant
        </button>
        <div className="xp-toolbar-separator" />
        <button 
          className={`xp-toolbar-btn ${viewMode === 'list' ? 'bg-[#316ac5] text-white' : ''}`}
          onClick={() => setViewMode('list')}
        >
          <img src="/icons/folder.png" alt="" className="w-4 h-4" />
          Liste
        </button>
        <button 
          className={`xp-toolbar-btn ${viewMode === 'details' ? 'bg-[#316ac5] text-white' : ''}`}
          onClick={() => setViewMode('details')}
        >
          <img src="/icons/note.png" alt="" className="w-4 h-4" />
          Détails
        </button>
      </div>

      {/* Address Bar */}
      <div className="xp-addressbar">
        <span className="xp-addressbar-label">Adresse</span>
        <div className="xp-addressbar-input">
          <img src="/icons/folder.png" alt="" className="w-4 h-4" />
          <span>C:\Projets</span>
        </div>
        <button className="xp-addressbar-go">OK</button>
      </div>

      {/* Main Content */}
      <div className="xp-content xp-content-zoomable" style={getZoomStyle(zoom)}>
        {/* Sidebar */}
        <div className="xp-sidebar">
          <div className="xp-sidebar-box">
            <div className="xp-sidebar-title">
              <img src="/icons/folder.png" alt="" />
              Gestion des fichiers
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/folder.png" alt="" />
              Créer un dossier
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/explorer.png" alt="" />
              Publier ce dossier
            </div>
          </div>

          <div className="xp-sidebar-box">
            <div className="xp-sidebar-title">
              <img src="/icons/questionMark.png" alt="" />
              Détails
            </div>
            <div className="xp-sidebar-text">
              <p><strong>Projets:</strong> {projects.length}</p>
              <p><strong>En cours:</strong> {projects.filter(p => p.status === 'En cours').length}</p>
              <p><strong>Terminés:</strong> {projects.filter(p => p.status === 'Terminé').length}</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="xp-content-main">
          {/* Page Header */}
          <div className="xp-page-header">
            <img src="/icons/folder.png" alt="" className="xp-page-header-icon" />
            <div>
              <h1 className="xp-page-title">Mes Projets</h1>
              <p className="xp-page-subtitle">Portfolio de développement</p>
            </div>
          </div>

          {/* List View */}
          {viewMode === 'list' && (
            <div className="xp-box">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                  className={`xp-flex xp-gap-2 xp-items-center xp-p-2 cursor-pointer
                             ${index !== projects.length - 1 ? 'border-b border-[#e0e0e0]' : ''}
                             ${selectedProject === project.id ? 'bg-[#316ac5] text-white' : 'hover:bg-[#e8f0ff]'}`}
                  style={{ padding: '8px' }}
                >
                  <img src="/icons/folder.png" alt="" className="w-8 h-8" />
                  <div className="xp-flex-1">
                    <div className="xp-flex xp-gap-2 xp-items-center">
                      <span className="xp-text-bold">{project.name}</span>
                      <span className={`xp-tag ${project.status === 'En cours' ? 'xp-tag-yellow' : 'xp-tag-green'}`}>
                        {project.status}
                      </span>
                    </div>
                    <p className={`xp-text-sm ${selectedProject === project.id ? 'text-white' : 'xp-text-gray'}`}>
                      {project.description}
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
              ))}
            </div>
          )}

          {/* Details View */}
          {viewMode === 'details' && (
            <div className="xp-box">
              <table className="xp-table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Technologies</th>
                    <th>Date</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr 
                      key={project.id}
                      onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                      className="cursor-pointer"
                    >
                      <td>
                        <div className="xp-flex xp-gap-2 xp-items-center">
                          <img src="/icons/folder.png" alt="" className="w-4 h-4" />
                          <span className="xp-text-bold">{project.name}</span>
                        </div>
                      </td>
                      <td className="xp-text-gray" style={{ maxWidth: '200px' }}>
                        {project.description.substring(0, 50)}...
                      </td>
                      <td>
                        {project.languages.map((lang) => (
                          <span key={lang} className="xp-tag xp-tag-blue">{lang}</span>
                        ))}
                      </td>
                      <td>{project.date}</td>
                      <td>
                        <span className={`xp-tag ${project.status === 'En cours' ? 'xp-tag-yellow' : 'xp-tag-green'}`}>
                          {project.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Tip Box */}
          <div className="xp-tipbox xp-mt-3">
            <img src="/icons/questionMark.png" alt="" />
            <div className="xp-tipbox-text">
              <strong>Astuce:</strong> Double-cliquez sur les dossiers de projets sur le bureau pour voir 
              les détails complets avec captures d'écran et liens GitHub!
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="xp-statusbar">
        <span>{projects.length} projets</span>
        <span>{projects.filter(p => p.status === 'En cours').length} en cours</span>
      </div>
    </div>
  );
};
