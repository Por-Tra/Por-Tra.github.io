/**
 * Application: Skills
 * 
 * Affichage des compétences techniques - Style Windows XP
 */
import { MenuBar, useZoom, getZoomStyle } from '../../components/ProjectLayout';
import { t } from '../../i18n/text';

export const config = {
  id: 'skills',
  name: 'Compétences',
  icon: '/icons/note.webp',
  defaultWidth: 650,
  defaultHeight: 500,
};

const skills = [
  { name: 'JavaScript', level: 60, category: 'languages' },
  { name: 'Python', level: 80, category: 'languages' },
  { name: 'C++', level: 70, category: 'languages' },
  { name: 'C#', level: 80, category: 'languages' },
  { name: 'C', level: 50, category: 'languages' },
  { name: 'PHP', level: 70, category: 'languages' },
  { name: 'SQL', level: 75, category: 'languages' },
  { name: 'HTML', level: 85, category: 'web' },
  { name: 'CSS', level: 10, category: 'web' },
  { name: 'React', level: 40, category: 'web' },
  { name: 'VS Code', level: 90, category: 'tools' },
  { name: 'Visual Studio', level: 90, category: 'tools' },
  { name: 'Git', level: 90, category: 'tools' },
  { name: 'Qt', level: 60, category: 'tools' }
];

const AcadmicSkills = [
  { name: { FR: 'Développer des applications informatiques simples', EN: 'Build simple software applications', ES: 'Desarrollar aplicaciones informáticas sencillas' }, checked: true },
  { name: { FR: 'Appréhender et construire des algorithmes', EN: 'Understand and build algorithms', ES: 'Comprender y construir algoritmos' }, checked: true },
  { name: { FR: 'Installer et configurer un poste de travail', EN: 'Install and configure a workstation', ES: 'Instalar y configurar un puesto de trabajo' }, checked: true },
  { name: { FR: 'Concevoir et mettre en place une base de données à partir d’un cahier des charges client', EN: 'Design and implement a database from client requirements', ES: 'Diseñar e implementar una base de datos a partir de un pliego de condiciones del cliente' }, checked: true },
  { name: { FR: 'Identifier les besoins métiers des clients et des utilisateurs', EN: 'Identify business needs of clients and users', ES: 'Identificar las necesidades de negocio de los clientes y usuarios' }, checked: true },
  { name: { FR: 'Identifier ses aptitudes pour travailler dans une équipe', EN: 'Identify your strengths for teamwork', ES: 'Identificar sus aptitudes para trabajar en equipo' }, checked: true }
];


const learningSkills = [
  { FR: 'Cmake' },
  { FR: 'Unity' },
  { FR: 'Kotlin' },
  { FR: 'Relation de base de données NoSQL', EN: 'NoSQL database relationships', ES: 'Relaciones de base de datos NoSQL' },
  { FR: 'Docker' },
  { FR: 'virtualisation', EN: 'virtualization', ES: 'virtualización' },
  { EN: 'deep learning' }
];

const COPY = {
  toolbarBack: { FR: 'Précédent', EN: 'Back', ES: 'Atras' },
  toolbarFolders: { FR: 'Dossiers', EN: 'Folders', ES: 'Carpetas' },
  address: { FR: 'Adresse', EN: 'Address', ES: 'Dirección' },
  addressPath: { FR: 'C:\\Utilisateurs\\Lucas\\Compétences', EN: 'C:\\Users\\Lucas\\Skills', ES: 'C:\\Usuarios\\Lucas\\Habilidades' },
  categories: { FR: 'Catégories', EN: 'Categories', ES: 'Categorías' },
  academic: { FR: 'Académiques', EN: 'Academic', ES: 'Académicas' },
  languages: { FR: 'Langages', EN: 'Languages', ES: 'Idiomas' },
  web: { FR: 'Web', EN: 'Web', ES: 'Web' },
  tools: { FR: 'Outils', EN: 'Tools', ES: 'Herramientas' },
  stats: { FR: 'Statistiques', EN: 'Statistics', ES: 'Estadísticas' },
  total: { FR: 'Total' },
  training: { FR: 'Formation', EN: 'Program', ES: 'Formación' },
  location: { FR: 'Lieu', EN: 'Location', ES: 'Ubicación' },
  headerTitle: { FR: 'Mes Compétences', EN: 'My Skills', ES: 'Mis Habilidades' },
  headerSubtitle: { FR: 'Langages de programmation et outils maîtrisés', EN: 'Programming languages and tools', ES: 'Lenguajes de programación y herramientas' },
  academicTitle: { FR: 'Compétences Académiques', EN: 'Academic Skills', ES: 'Habilidades Académicas' },
  learningTitle: { FR: 'En cours d\'apprentissage', EN: 'Currently learning', ES: 'Actualmente aprendiendo' },
  statusSkills: { FR: 'compétences', EN: 'skills', ES: 'habilidades' },
  statusFooter: { FR: 'BUT Informatique - Le Puy-en-Velay', EN: 'Graphic Computing - Le Puy-en-Velay', ES: 'Computación Gráfica - Le Puy-en-Velay' },
};

const CATEGORY_LABELS = {
  languages: COPY.languages,
  web: COPY.web,
  tools: COPY.tools,
};

export const Component = ({ currentLanguage }) => {
  const { zoom, zoomIn, zoomOut, resetZoom } = useZoom();

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
        <div className="xp-toolbar-separator"></div>
        <button className="xp-toolbar-btn">
          <img src="/icons/folder.webp" alt="" className="w-4 h-4" />
          {t(COPY.toolbarFolders, currentLanguage)}
        </button>
      </div>

      {/* Address Bar */}
      <div className="xp-addressbar">
        <span className="xp-addressbar-label">{t(COPY.address, currentLanguage)}</span>
        <div className="xp-addressbar-input">
          <img src="/icons/note.webp" alt="" className="w-4 h-4" />
          <span>{t(COPY.addressPath, currentLanguage)}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="xp-content xp-content-zoomable" style={getZoomStyle(zoom)}>
        {/* Sidebar */}
        <div className="xp-sidebar">
          <div className="xp-sidebar-box">
            <div className="xp-sidebar-header">
              <img src="/icons/folder.webp" alt="" className="w-4 h-4" />
              {t(COPY.categories, currentLanguage)}
            </div>

            <div className="xp-sidebar-content">
              <a href="#academiques" className="xp-sidebar-link">
                <img src="/icons/note.webp" alt="" className="w-3 h-3" />
                {t(COPY.academic, currentLanguage)}
              </a>
              <a href="#languages" className="xp-sidebar-link">
                <img src="/icons/terminal.webp" alt="" className="w-3 h-3" />
                {t(COPY.languages, currentLanguage)}
              </a>
              <a href="#web" className="xp-sidebar-link">
                <img src="/icons/explorer.webp" alt="" className="w-3 h-3" />
                {t(COPY.web, currentLanguage)}
              </a>
              <a href="#tools" className="xp-sidebar-link">
                <img src="/icons/setting.webp" alt="" className="w-3 h-3" />
                {t(COPY.tools, currentLanguage)}
              </a>
            </div>
          </div>

          <div className="xp-sidebar-box">
            <div className="xp-sidebar-header">
              <img src="/icons/questionMark.webp" alt="" className="w-4 h-4" />
              {t(COPY.stats, currentLanguage)}
            </div>
            <div className="xp-sidebar-content">
              <p className="xp-sidebar-info"><strong>{t(COPY.total, currentLanguage)}:</strong> {skills.length + AcadmicSkills.length} {t(COPY.statusSkills, currentLanguage)}</p>
              <p className="xp-sidebar-info"><strong>{t(COPY.training, currentLanguage)}:</strong> BUT Informatique</p>
              <p className="xp-sidebar-info"><strong>{t(COPY.location, currentLanguage)}:</strong> Le Puy-en-Velay</p>
            </div>
          </div>
        </div>

        {/* Main Panel */}
        <div className="xp-content-main">
          {/* Header */}
          <div className="xp-content-header">
            <img src="/icons/note.webp" alt="" className="w-12 h-12" />
            <div>
              <h1 className="xp-title">{t(COPY.headerTitle, currentLanguage)}</h1>
              <p className="xp-subtitle">{t(COPY.headerSubtitle, currentLanguage)}</p>
            </div>
          </div>

          {/* Academic Skills Section */}
          <div id="academiques" className="xp-box">
            <div className="xp-box-header">
              <img src="/icons/note.webp" alt="" className="w-4 h-4" />
              {t(COPY.academicTitle, currentLanguage)}
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
                    <span className="text-xs text-[#000000]">{t(skill.name, currentLanguage)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills by Category */}
          {['languages', 'web', 'tools'].map((category) => (
            <div key={category} id={category} className="xp-box">
              <div className="xp-box-header">
                <img src={category === 'languages' ? '/icons/terminal.webp' : category === 'web' ? '/icons/explorer.webp' : '/icons/setting.webp'} alt="" className="w-4 h-4" />
                {t(CATEGORY_LABELS[category], currentLanguage)}
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
            <img src="/icons/questionMark.webp" alt="" className="w-5 h-5 flex-shrink-0" />
            <div>
              <strong>{t(COPY.learningTitle, currentLanguage)}:</strong>
              <div className="xp-tags mt-2">
                {learningSkills.map((tech, index) => (
                  <span key={`${index}-${t(tech, currentLanguage)}`} className="xp-tag">{t(tech, currentLanguage)}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="xp-statusbar">
        <span>{skills.length + AcadmicSkills.length} {t(COPY.statusSkills, currentLanguage)}</span>
        <span>{t(COPY.statusFooter, currentLanguage)}</span>
      </div>
    </div>
  );
};
