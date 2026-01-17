/**
 * Application: ProjectSoutenance
 * 
 * Détails du projet Soutenance - Style Windows XP
 */



import screenshot1 from '../../../assets/Proj2/Capture d\'écran 2025-10-07 085609.png';
import screenshot2 from '../../../assets/Proj2/Capture d\'écran 2025-10-07 085646.png';
import screenshot3 from '../../../assets/Proj2/Capture d\'écran 2025-10-07 085653.png';

// Import project download file
import projectZip from '../../../assets/projet_sql-main.zip';


export const config = {
  id: 'project-soutenance',
  name: 'Projet Soutenance',
  icon: '/icons/folder.png',
  defaultWidth: 700,
  defaultHeight: 550,
};

const projectData = {
  title: "Projet de Soutenance",
  description: "Il s'agit d'un projet universitaire dont le but était de fabriquer une application web pour noter les élèves.",
  languages: ["HTML", "CSS", "PHP", "SQL"],
  team: "11 personnes (par groupe de classe)",
  date: "10 septembre 2025 - 3 octobre 2025",
  features: [
    "Gestion des élèves",
    "Gestion des notes",
    "Gestion des projets",
    "Système d'envoi de mail automatique"
  ],
  role: "Développeur back-end, réalisation de la partie 3.3 et du système d'envoi de mail automatique",
  skills: [
    "HTML",
    "CSS",
    "PHP",
    "SQL",
    "Git",
    "Travail avec une grande équipe"
  ],
  downloadLink: "#",
  images: [screenshot1, screenshot2, screenshot3]
};

export const Component = () => {
  return (
    <div className="xp-app">
      {/* Menu Bar */}
      <div className="xp-menubar">
        <span>Fichier</span>
        <span>Édition</span>
        <span>Affichage</span>
        <span>Outils</span>
        <span>?</span>
      </div>

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
          <img src="/icons/folder.png" alt="" className="w-4 h-4" />
          <span>C:\Projets\Soutenance</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="xp-content">
        {/* Sidebar */}
        <div className="xp-sidebar">
          <div className="xp-sidebar-box">
            <div className="xp-sidebar-header">
              <img src="/icons/folder.png" alt="" className="w-4 h-4" />
              Gestion du projet
            </div>
            <div className="xp-sidebar-content">
              <a href={projectZip} download="projet_soutenance.zip" className="xp-sidebar-link">
                <img src="/icons/download.png" alt="" className="w-3 h-3" />
                Télécharger (.zip)
              </a>
              <a href="#" className="xp-sidebar-link">
                <img src="/icons/web.png" alt="" className="w-3 h-3" />
                Voir sur GitHub
              </a>
            </div>
          </div>

          <div className="xp-sidebar-box">
            <div className="xp-sidebar-header">
              <img src="/icons/info.png" alt="" className="w-4 h-4" />
              Informations
            </div>
            <div className="xp-sidebar-content">
              <p className="xp-sidebar-info"><strong>Date:</strong></p>
              <p className="xp-sidebar-info-small">{projectData.date}</p>
              <p className="xp-sidebar-info"><strong>Équipe:</strong></p>
              <p className="xp-sidebar-info-small">{projectData.team}</p>
            </div>
          </div>
        </div>

        {/* Main Panel */}
        <div className="xp-content-main">
          {/* Header */}
          <div className="xp-content-header">
            <img src="/icons/folder.png" alt="" className="w-12 h-12" />
            <div>
              <h1 className="xp-title">{projectData.title}</h1>
              <p className="xp-subtitle">Projet universitaire - Application web de notation</p>
            </div>
          </div>

          {/* Description */}
          <div className="xp-box">
            <div className="xp-box-header">
              <img src="/icons/questionMark.png" alt="" className="w-4 h-4" />
              Description
            </div>
            <div className="xp-box-content">
              <p>{projectData.description}</p>
            </div>
          </div>

          {/* Role */}
          <div className="xp-tipbox">
            <img src="/icons/user.png" alt="" className="w-4 h-4 flex-shrink-0" />
            <div>
              <strong>Mon rôle:</strong> {projectData.role}
            </div>
          </div>

          {/* Languages */}
          <div className="xp-box xp-box-blue">
            <div className="xp-box-header">
              <img src="/icons/code.png" alt="" className="w-4 h-4" />
              Langages utilisés
            </div>
            <div className="xp-box-content">
              <div className="xp-tags">
                {projectData.languages.map((lang, i) => (
                  <span key={i} className="xp-tag xp-tag-blue">{lang}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="xp-box">
            <div className="xp-box-header">
              <img src="/icons/check.png" alt="" className="w-4 h-4" />
              Fonctionnalités
            </div>
            <div className="xp-box-content">
              <ul className="xp-list">
                {projectData.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Skills */}
          <div className="xp-box xp-box-green">
            <div className="xp-box-header">
              <img src="/icons/skills.png" alt="" className="w-4 h-4" />
              Compétences développées
            </div>
            <div className="xp-box-content">
              <div className="xp-tags">
                {projectData.skills.map((skill, i) => (
                  <span key={i} className="xp-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Screenshots */}
          <div className="xp-box">
            <div className="xp-box-header">
              <img src="/icons/image.png" alt="" className="w-4 h-4" />
              Captures d'écran
            </div>
            <div className="xp-box-content">
              <div className="xp-screenshots">
                {projectData.images.map((img, i) => (
                  <img key={i} src={img} alt={`Screenshot ${i + 1}`} className="xp-screenshot" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="xp-statusbar">
        <span>{projectData.features.length} fonctionnalités</span>
        <span>{projectData.skills.length} compétences</span>
      </div>
    </div>
  );
};
