import { useState } from 'react';
import { useSearchHighlight } from '../../hooks/useSearchHighlight.jsx';

const projects = [
  {
    id: 'project-rpg',
    name: 'RPG 2D',
    description: 'Jeu vidéo RPG style Pokemon développé en Python avec Pygame. Système de combat au tour par tour, exploration de carte, et gestion d\'inventaire.',
    date: '2022-2023',
    languages: ['Python', 'Pygame'],
    status: 'Terminé',
    icon: '🎮',
    color: '#4a90d9',
  },
  {
    id: 'project-soutenance',
    name: 'Projet Soutenance',
    description: 'Application web permettant la notation des élèves par les professeurs. Interface intuitive avec gestion des notes et génération de bulletins.',
    date: '2025',
    languages: ['HTML', 'CSS', 'PHP', 'SQL'],
    status: 'En cours',
    icon: '📊',
    color: '#5cb85c',
  },
  {
    id: 'project-reseau',
    name: 'Réseau Social Local',
    description: 'Application de messagerie instantanée fonctionnant en réseau local. Chat en temps réel, partage de fichiers et salons de discussion.',
    date: '2024',
    languages: ['Python', 'Socket'],
    status: 'Terminé',
    icon: '💬',
    color: '#f0ad4e',
  },
];

const ProjectsContent = () => {
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'list' | 'details'
  const [selectedProject, setSelectedProject] = useState(null);
  const { query, filterItems, highlightText, isSearching } = useSearchHighlight('projects-window');

  // Filter projects based on search query
  const filteredProjects = filterItems(projects, (p) => `${p.name} ${p.description}`);

  return (
    <div className="h-full bg-gradient-to-b from-[#f5f5f5] to-[#e8e8e8] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a246a] to-[#3a6ea5] text-white p-3 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📁</span>
            <div>
              <h1 className="text-lg font-bold">Mes Projets</h1>
              <p className="text-xs text-blue-200">Portfolio de développement</p>
            </div>
          </div>
          <div className="text-xs bg-white/20 px-3 py-1 rounded">
            {filteredProjects.length} projets
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-[#ece9d8] border-b border-[#808080] px-3 py-2 flex items-center gap-4">
        <div className="flex items-center gap-1 text-xs">
          <span className="text-gray-600">Affichage:</span>
          <button
            onClick={() => setViewMode('cards')}
            className={`px-2 py-1 rounded transition-colors ${
              viewMode === 'cards' 
                ? 'bg-[#316ac5] text-white' 
                : 'bg-white border border-[#a0a0a0] hover:bg-gray-100'
            }`}
          >
            🃏 Cartes
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-2 py-1 rounded transition-colors ${
              viewMode === 'list' 
                ? 'bg-[#316ac5] text-white' 
                : 'bg-white border border-[#a0a0a0] hover:bg-gray-100'
            }`}
          >
            📋 Liste
          </button>
          <button
            onClick={() => setViewMode('details')}
            className={`px-2 py-1 rounded transition-colors ${
              viewMode === 'details' 
                ? 'bg-[#316ac5] text-white' 
                : 'bg-white border border-[#a0a0a0] hover:bg-gray-100'
            }`}
          >
            📊 Détails
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Cards View */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                  className={`bg-white rounded-lg shadow-md border overflow-hidden cursor-pointer 
                             transform transition-all hover:scale-[1.02] hover:shadow-lg
                             ${selectedProject === project.id ? 'ring-2 ring-[#316ac5]' : 'border-gray-200'}`}
                >
                  {/* Card Header */}
                  <div 
                    className="p-3 text-white"
                    style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}dd)` }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{project.icon}</span>
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                        project.status === 'En cours' 
                          ? 'bg-yellow-400 text-yellow-900' 
                          : 'bg-white/30 text-white'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <h3 className="font-bold mt-2">{highlightText(project.name)}</h3>
                    <p className="text-xs opacity-80">{project.date}</p>
                  </div>

                  {/* Card Body */}
                  <div className="p-3">
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {highlightText(project.description)}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {project.languages.map((lang) => (
                        <span 
                          key={lang}
                          className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-3 py-2 bg-gray-50 border-t text-xs text-center text-gray-500">
                    Double-cliquez sur l'icône du bureau pour plus de détails
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-400">
                {isSearching ? 'Aucun projet ne correspond à votre recherche' : 'Aucun projet disponible'}
              </div>
            )}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                  className={`flex items-center gap-4 p-4 cursor-pointer transition-colors
                             ${index !== filteredProjects.length - 1 ? 'border-b border-gray-100' : ''}
                             ${selectedProject === project.id ? 'bg-[#316ac5]/10' : 'hover:bg-gray-50'}`}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                    style={{ backgroundColor: `${project.color}20` }}
                  >
                    {project.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-800">{highlightText(project.name)}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        project.status === 'En cours' 
                          ? 'bg-yellow-100 text-yellow-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{highlightText(project.description)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-600">{project.date}</p>
                    <div className="flex flex-wrap gap-1 mt-1 justify-end">
                      {project.languages.slice(0, 2).map((lang) => (
                        <span key={lang} className="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
                          {lang}
                        </span>
                      ))}
                      {project.languages.length > 2 && (
                        <span className="text-xs text-gray-400">+{project.languages.length - 2}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                {isSearching ? 'Aucun projet ne correspond à votre recherche' : 'Aucun projet disponible'}
              </div>
            )}
          </div>
        )}

        {/* Details View (Table) */}
        {viewMode === 'details' && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            {filteredProjects.length > 0 ? (
              <table className="w-full text-sm">
                <thead className="bg-gradient-to-b from-[#f5f5f5] to-[#e8e8e8]">
                  <tr>
                    <th className="text-left p-3 border-b font-medium text-gray-600">Projet</th>
                    <th className="text-left p-3 border-b font-medium text-gray-600">Description</th>
                    <th className="text-left p-3 border-b font-medium text-gray-600">Technologies</th>
                    <th className="text-left p-3 border-b font-medium text-gray-600">Date</th>
                    <th className="text-left p-3 border-b font-medium text-gray-600">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project, i) => (
                    <tr 
                      key={project.id} 
                      className={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 cursor-pointer`}
                      onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                    >
                      <td className="p-3 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <span>{project.icon}</span>
                          <span className="font-medium">{highlightText(project.name)}</span>
                        </div>
                      </td>
                      <td className="p-3 border-b border-gray-100 text-gray-600 max-w-xs truncate">
                        {highlightText(project.description)}
                      </td>
                      <td className="p-3 border-b border-gray-100">
                        <div className="flex flex-wrap gap-1">
                          {project.languages.map((lang) => (
                            <span 
                              key={lang} 
                              className="text-xs px-1.5 py-0.5 rounded bg-[#316ac5] text-white"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-3 border-b border-gray-100 text-gray-600">{project.date}</td>
                      <td className="p-3 border-b border-gray-100">
                        <span className={`text-xs px-2 py-1 rounded font-medium ${
                          project.status === 'En cours' 
                            ? 'bg-yellow-100 text-yellow-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-8 text-gray-400">
                {isSearching ? 'Aucun projet ne correspond à votre recherche' : 'Aucun projet disponible'}
              </div>
            )}
          </div>
        )}

        {/* Tip Box */}
        <div className="mt-4 bg-gradient-to-r from-[#ffffd5] to-[#fff8c4] border border-[#c0a000] rounded-lg p-3 flex items-center gap-3">
          <span className="text-xl">💡</span>
          <p className="text-sm text-gray-700">
            <strong>Astuce:</strong> Double-cliquez sur les dossiers de projets sur le bureau pour voir 
            les détails complets avec captures d'écran et liens GitHub!
          </p>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#ece9d8] border-t border-[#808080] px-3 py-1.5 text-xs text-gray-600 flex justify-between items-center">
        <span>📁 {filteredProjects.length} projets • {filteredProjects.filter(p => p.status === 'En cours').length} en cours</span>
        <span>Mode: {viewMode === 'cards' ? 'Cartes' : viewMode === 'list' ? 'Liste' : 'Détails'}</span>
      </div>
    </div>
  );
};

export default ProjectsContent;
