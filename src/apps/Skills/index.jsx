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
  { name: 'JavaScript', level: 60, category: 'Langages' },
  { name: 'Python', level: 80, category: 'Langages' },
  { name: 'C++', level: 70, category: 'Langages' },
  {name: 'C#', level: 80, category: 'Langages'},
  {name: 'C', level: 50, category: 'Langages'},
  { name: 'PHP', level: 70, category: 'Langages' },
  { name: 'SQL', level: 75, category: 'Langages' },
  { name: 'HTML', level: 85, category: 'Web' },
  {name: 'CSS', level: 10, category: 'Web'},
  { name: 'React', level: 40, category: 'Web' },
  { name: 'VS Code', level: 90, category: 'Outils' },
  { name: 'Visual Studio', level: 90, category: 'Outils' },
  { name: 'Git', level: 90, category: 'Outils' },
  { name: 'Qt', level: 60, category: 'Outils' }
];

const AcadmicSkills = [
  {name : "Développer des applications informatiques simples", checked: true},
  {name :" Appréhender et construire des algorithmes", checked: true},
  {name :" Installer et configurer un poste de travail", checked: true},
  {name : "Concevoir et mettre en place une base de données à partir d’un cahier des charges client", checked: true},
  {name : "Identifier les besoins métiers des clients et des utilisateurs", checked: true},
  {name : "Identifier ses aptitudes pour travailler dans une équipe", checked: true}
];


const learningSkills = ['Cmake', 'Unity', 'Kotlin', 'Relation de base de données NoSQL'];

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
              <a href="#academiques" className="xp-sidebar-link">
                <img src="/icons/education.png" alt="" className="w-3 h-3" />
                Académiques
              </a>
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
              <p className="xp-sidebar-info"><strong>Total:</strong> {skills.length + AcadmicSkills.length} compétences</p>
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

          {/* Academic Skills Section */}
          <div id="academiques" className="xp-box">
            <div className="xp-box-header">
              <img src="/icons/education.png" alt="" className="w-4 h-4" />
              Compétences Académiques
            </div>
            <div className="xp-box-content">
              <div className="space-y-2">
                {AcadmicSkills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {skill.checked ? (
                        <div className="w-4 h-4 border-2 border-[#003c74] bg-[#316ac5] flex items-center justify-center">
                          <div className="w-2 h-2 bg-white transform rotate-45 border-r-2 border-b-2 border-white" style={{ borderWidth: '0 2px 2px 0', width: '6px', height: '10px', marginTop: '-2px', marginLeft: '-1px' }}></div>
                        </div>
                      ) : (
                        <div className="w-4 h-4 border-2 border-[#808080] bg-white"></div>
                      )}
                    </div>
                    <span className="text-xs text-[#000000]">{skill.name}</span>
                  </div>
                ))}
              </div>
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
        <span>{skills.length + AcadmicSkills.length} compétences</span>
        <span>BUT Informatique - Le Puy-en-Velay</span>
      </div>
    </div>
  );
};
