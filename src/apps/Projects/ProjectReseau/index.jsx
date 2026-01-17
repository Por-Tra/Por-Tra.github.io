/**
 * Application: ProjectReseau
 * 
 * Détails du projet Réseau Social Local - Style Windows XP
 */

// Import project images
import screenshot1 from '../../../assets/Proj3/Capture d\'écran 2025-10-25 192040.png';
import screenshot2 from '../../../assets/Proj3/Capture d\'écran 2025-10-25 192048.png';
import screenshot3 from '../../../assets/Proj3/Capture d\'écran 2025-10-25 192101.png';

// Import project download file
import projectZip from '../../../assets/Projet RSL.zip';

export const config = {
  id: 'project-reseau',
  name: 'Réseau Social Local',
  icon: '/icons/folder.png',
  defaultWidth: 700,
  defaultHeight: 520,
};

const projectData = {
  title: "Réseau Social Local",
  description: "C'est un projet qui a pour but de permettre un échange de messages depuis 2 machines distinctes et avec la possibilité d'héberger le serveur très facilement.",
  languages: ["Python"],
  team: "Travaillé en équipe de 2",
  date: "Mars - Mai 2024",
  features: [
    "Échange de messages entre 2 utilisateurs et ordinateurs",
    "Historique des messages",
    "Hébergement du serveur",
    "Fonctionnel uniquement en réseau local"
  ],
  role: "Synchronisation des messages, interface, gestion du serveur",
  skills: [
    "Python",
    "Serveur socket",
    "Interface graphique",
    "Bibliothèques Python"
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
          <img src="/icons/signal.png" alt="" className="w-4 h-4" />
          <span>C:\Projets\ReseauSocialLocal</span>
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
            <a href={projectZip} download="Projet_RSL.zip" className="xp-sidebar-link">
              <img src="/icons/folder.png" alt="" />
              Télécharger (.zip)
            </a>
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
            </div>
          </div>

          <div className="xp-sidebar-box">
            <div className="xp-sidebar-title">
              <img src="/icons/setting.png" alt="" />
              Technologies
            </div>
            <div className="xp-sidebar-text">
              <p>Socket TCP/IP</p>
              <p>Interface Tkinter</p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="xp-content-main">
          {/* Page Header */}
          <div className="xp-page-header">
            <img src="/icons/signal.png" alt="" className="xp-page-header-icon" />
            <div>
              <h1 className="xp-page-title">{projectData.title}</h1>
              <p className="xp-page-subtitle">Application de messagerie en réseau local</p>
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

          {/* Role */}
          <div className="xp-tipbox xp-mb-3">
            <img src="/icons/setting.png" alt="" />
            <div className="xp-tipbox-text">
              <strong>Mon rôle:</strong> {projectData.role}
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
