/**
 * Application: Skills
 * 
 * Affichage des compétences techniques - Style Windows XP
 */
import { MenuBar, useZoom, getZoomStyle } from '../../components/ProjectLayout';

export const config = {
  id: 'skills',
  name: 'Compétences',
  icon: '/icons/note.png',
  defaultWidth: 650,
  defaultHeight: 500,
};

const skills = [
  { name: 'JavaScript', level: 85, category: 'Langages' },
  { name: 'Python', level: 80, category: 'Langages' },
  { name: 'C++/C#/C', level: 75, category: 'Langages' },
  { name: 'PHP', level: 70, category: 'Langages' },
  { name: 'SQL', level: 75, category: 'Langages' },
  { name: 'HTML/CSS', level: 85, category: 'Web' },
  { name: 'React', level: 70, category: 'Web' },
  { name: 'Blender', level: 65, category: 'Outils' },
  { name: 'VS Code', level: 90, category: 'Outils' },
  { name: 'Visual Studio', level: 80, category: 'Outils' },
  { name: 'Git', level: 85, category: 'Outils' },
  { name: 'Qt', level: 60, category: 'Outils' },
];

const learningSkills = ['TypeScript', 'Docker', 'Node.js', 'MongoDB'];

export const Component = () => {
  const { zoom, zoomIn, zoomOut, resetZoom } = useZoom();

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
          <img src="/icons/back.png" alt="" className="w-4 h-4" />
          Précédent
        </button>
        <div className="xp-toolbar-separator"></div>
        <button className="xp-toolbar-btn">
          <img src="/icons/folder.png" alt="" className="w-4 h-4" />
          Dossiers
        </button>
      </div>

      {/* Address Bar */}
      <div className="xp-addressbar">
        <span className="xp-addressbar-label">Adresse</span>
        <div className="xp-addressbar-input">
          <img src="/icons/note.png" alt="" className="w-4 h-4" />
          <span>C:\Utilisateurs\Lucas\Compétences</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="xp-content xp-content-zoomable" style={getZoomStyle(zoom)}>
        {/* Sidebar */}
        <div className="xp-sidebar">
          <div className="xp-sidebar-box">
            <div className="xp-sidebar-header">
              <img src="/icons/folder.png" alt="" className="w-4 h-4" />
              Catégories
            </div>
            <div className="xp-sidebar-content">
              <a href="#langages" className="xp-sidebar-link">
                <img src="/icons/code.png" alt="" className="w-3 h-3" />
                Langages
              </a>
              <a href="#web" className="xp-sidebar-link">
                <img src="/icons/web.png" alt="" className="w-3 h-3" />
                Web
              </a>
              <a href="#outils" className="xp-sidebar-link">
                <img src="/icons/setting.png" alt="" className="w-3 h-3" />
                Outils
              </a>
            </div>
          </div>

          <div className="xp-sidebar-box">
            <div className="xp-sidebar-header">
              <img src="/icons/info.png" alt="" className="w-4 h-4" />
              Statistiques
            </div>
            <div className="xp-sidebar-content">
              <p className="xp-sidebar-info"><strong>Total:</strong> {skills.length} compétences</p>
              <p className="xp-sidebar-info"><strong>Formation:</strong> BUT Informatique</p>
              <p className="xp-sidebar-info"><strong>Lieu:</strong> Le Puy-en-Velay</p>
            </div>
          </div>
        </div>

        {/* Main Panel */}
        <div className="xp-content-main">
          {/* Header */}
          <div className="xp-content-header">
            <img src="/icons/note.png" alt="" className="w-12 h-12" />
            <div>
              <h1 className="xp-title">Mes Compétences</h1>
              <p className="xp-subtitle">Langages de programmation et outils maîtrisés</p>
            </div>
          </div>

          {/* Skills by Category */}
          {['Langages', 'Web', 'Outils'].map((category) => (
            <div key={category} id={category.toLowerCase()} className="xp-box">
              <div className="xp-box-header">
                <img src={category === 'Langages' ? '/icons/code.png' : category === 'Web' ? '/icons/web.png' : '/icons/setting.png'} alt="" className="w-4 h-4" />
                {category}
              </div>
              <div className="xp-box-content">
                <div className="space-y-2">
                  {skills
                    .filter((s) => s.category === category)
                    .map((skill) => (
                      <div key={skill.name} className="flex items-center gap-2">
                        <span className="w-24 text-xs font-medium">{skill.name}</span>
                        <div className="flex-1 bg-[#d4d0c8] border border-[#808080] h-4 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-b from-[#00aa00] to-[#006600] flex items-center justify-end pr-1"
                            style={{ width: `${skill.level}%` }}
                          >
                            <span className="text-[9px] text-white font-bold">{skill.level}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}

          {/* Learning Section */}
          <div className="xp-tipbox">
            <img src="/icons/questionMark.png" alt="" className="w-5 h-5 flex-shrink-0" />
            <div>
              <strong>En cours d'apprentissage:</strong>
              <div className="xp-tags mt-2">
                {learningSkills.map((tech) => (
                  <span key={tech} className="xp-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="xp-statusbar">
        <span>{skills.length} compétences</span>
        <span>BUT Informatique - Le Puy-en-Velay</span>
      </div>
    </div>
  );
};
