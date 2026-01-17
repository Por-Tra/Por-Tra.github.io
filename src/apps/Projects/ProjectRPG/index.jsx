/**
 * Application: ProjectRPG
 * 
 * Détails du projet RPG 2D - Style Windows XP
 */

// Import project images
import screenshot1 from '../../../assets/Proj1/Capture d\'écran 2025-05-14 100424.png';
import screenshot2 from '../../../assets/Proj1/Capture d\'écran 2025-05-30 165033.png';
import screenshot3 from '../../../assets/Proj1/image.png';

export const config = {
  id: 'project-rpg',
  name: 'RPG 2D',
  icon: '/icons/folder.png',
  defaultWidth: 700,
  defaultHeight: 520,
};

const projectData = {
  title: "RPG 2D",
  description: "Ce projet est un projet étudiant qui a été réalisé pendant mes années de lycée. Il s'agit d'un jeu vidéo en 2D de type RPG dans un style Pokemon. Le but du jeu est de parcourir 3 niveaux afin d'éliminer le boss de fin.",
  languages: ["Python"],
  team: "Travaillé en équipe de 2",
  date: "2022-2023",
  features: [
    "Déplacements",
    "Changement de niveau",
    "Animation",
    "Dialogues avec NPC",
    "Combat",
    "Changement de personnage"
  ],
  role: "Développeur",
  skills: [
    "Python",
    "Utilisation d'un IDE (PyCharm)",
    "Gestion de bibliothèque",
    "Utilisation d'outil de conception de niveau"
  ],
  images: [screenshot1, screenshot2, screenshot3]
};

export const Component = () => {
  return (
    <div className="xp-app">
      {/* Menu Bar */}
      <div className="xp-menubar">
        <span className="xp-menubar-item">Fichier</span>
        <span className="xp-menubar-item">Édition</span>
        <span className="xp-menubar-item">Affichage</span>
        <span className="xp-menubar-item">?</span>
      </div>

      {/* Address Bar */}
      <div className="xp-addressbar">
        <span className="xp-addressbar-label">Adresse</span>
        <div className="xp-addressbar-input">
          <img src="/icons/folder.png" alt="" className="w-4 h-4" />
          <span>C:\Projets\{projectData.title}</span>
        </div>
        <button className="xp-addressbar-go">OK</button>
      </div>

      {/* Main Content */}
      <div className="xp-content">
        {/* Sidebar */}
        <div className="xp-sidebar">
          <div className="xp-sidebar-box">
            <div className="xp-sidebar-title">
              <img src="/icons/folder.png" alt="" />
              Gestion du projet
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/folder.png" alt="" />
              Ouvrir le dossier
            </div>
            <a href="https://github.com/Por-Tra" target="_blank" rel="noopener noreferrer" className="xp-sidebar-link">
              <img src="/icons/git.png" alt="" />
              Voir sur GitHub
            </a>
          </div>

          <div className="xp-sidebar-box">
            <div className="xp-sidebar-title">
              <img src="/icons/questionMark.png" alt="" />
              Détails
            </div>
            <div className="xp-sidebar-text">
              <p><strong>Date:</strong> {projectData.date}</p>
              <p><strong>Équipe:</strong> {projectData.team}</p>
              <p><strong>Rôle:</strong> {projectData.role}</p>
            </div>
          </div>

          <div className="xp-sidebar-box">
            <div className="xp-sidebar-title">
              <img src="/icons/setting.png" alt="" />
              Technologies
            </div>
            <div className="xp-sidebar-text">
              {projectData.languages.map((lang, i) => (
                <p key={i}>{lang}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="xp-content-main">
          {/* Page Header */}
          <div className="xp-page-header">
            <img src="/icons/folder.png" alt="" className="xp-page-header-icon" />
            <div>
              <h1 className="xp-page-title">{projectData.title}</h1>
              <p className="xp-page-subtitle">Projet de jeu vidéo</p>
            </div>
          </div>

          {/* Description */}
          <div className="xp-box xp-mb-3">
            <div className="xp-box-header">
              <img src="/icons/questionMark.png" alt="" />
              Description
            </div>
            <div className="xp-box-content">
              <p className="xp-text-gray" style={{ lineHeight: '1.6' }}>
                {projectData.description}
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="xp-box xp-mb-3">
            <div className="xp-box-header xp-box-header-green">
              <img src="/icons/folder.png" alt="" />
              Fonctionnalités
            </div>
            <div className="xp-box-content">
              <ul className="xp-list">
                {projectData.features.map((feature, i) => (
                  <li key={i} className="xp-list-item">
                    <img src="/icons/folder.png" alt="" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Skills */}
          <div className="xp-box xp-mb-3">
            <div className="xp-box-header xp-box-header-cyan">
              <img src="/icons/setting.png" alt="" />
              Compétences développées
            </div>
            <div className="xp-box-content">
              <div className="xp-flex" style={{ flexWrap: 'wrap', gap: '4px' }}>
                {projectData.skills.map((skill, i) => (
                  <span key={i} className="xp-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Screenshots */}
          <div className="xp-box">
            <div className="xp-box-header xp-box-header-orange">
              <img src="/icons/explorer.png" alt="" />
              Captures d'écran
            </div>
            <div className="xp-box-content">
              <div className="xp-grid-2" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {projectData.images.map((img, i) => (
                  <div key={i} className="xp-screenshot">
                    <img src={img} alt={`Screenshot ${i + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="xp-statusbar">
        <span>Projet: {projectData.title}</span>
        <span>{projectData.features.length} fonctionnalités</span>
      </div>
    </div>
  );
};
