/**
 * Application: About
 * 
 * Page "À propos" avec les informations personnelles - Style Windows XP
 */
import { MenuBar, useZoom, getZoomStyle } from '../../components/ProjectLayout';
import profilePic from '../../assets/PP.jpg';

export const config = {
  id: 'about',
  name: 'À propos',
  icon: '/icons/note.png',
  defaultWidth: 700,
  defaultHeight: 520,
};

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
          <img src="/icons/arrow_left.png" alt="" className="w-4 h-4" />
          Précédent
        </button>
        <button className="xp-toolbar-btn">
          <img src="/icons/arrow_right.png" alt="" className="w-4 h-4" />
          Suivant
        </button>
        <div className="xp-toolbar-separator" />
        <button className="xp-toolbar-btn">
          <img src="/icons/folder.png" alt="" className="w-4 h-4" />
          Mes Projets
        </button>
        <button className="xp-toolbar-btn">
          <img src="/icons/note.png" alt="" className="w-4 h-4" />
          Mon CV
        </button>
      </div>

      {/* Address Bar */}
      <div className="xp-addressbar">
        <span className="xp-addressbar-label">Adresse</span>
        <div className="xp-addressbar-input">
          <img src="/icons/note.png" alt="" className="w-4 h-4" />
          <span>À propos de moi</span>
        </div>
        <button className="xp-addressbar-go">OK</button>
      </div>

      {/* Main Content */}
      <div className="xp-content xp-content-zoomable" style={getZoomStyle(zoom)}>
        {/* Sidebar */}
        <div className="xp-sidebar">
          {/* Social Links */}
          <div className="xp-sidebar-box">
            <div className="xp-sidebar-title">
              <img src="/icons/link.png" alt="" />
              Social Links
            </div>
            <a href="https://www.instagram.com/lucas_contreras_hodapp_/" target="_blank" rel="noopener noreferrer" className="xp-sidebar-link">
              <img src="/icons/explorer.png" alt="" />
              Instagram
            </a>
            <a href="https://github.com/Por-Tra" target="_blank" rel="noopener noreferrer" className="xp-sidebar-link">
              <img src="/icons/git.png" alt="" />
              Github
            </a>
            <a href="https://linkedin.com/in/lucas-contreras-hodapp" target="_blank" rel="noopener noreferrer" className="xp-sidebar-link">
              <img src="/icons/link.png" alt="" />
              LinkedIn
            </a>
          </div>

          {/* Skills */}
          <div className="xp-sidebar-box">
            <div className="xp-sidebar-title">
              <img src="/icons/setting.png" alt="" />
              Skills
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/folder.png" alt="" />
              Développement Web
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/folder.png" alt="" />
              Développement logiciels
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/setting.png" alt="" />
              Perfectionniste
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/questionMark.png" alt="" />
              Créativité
            </div>

            <div className="xp-sidebar-link">
              <img src="/icons/setting.png" alt="" />
              Résolution de problèmes
            </div>
          </div>

          {/* Software */}
          <div className="xp-sidebar-box">
            <div className="xp-sidebar-title">
              <img src="/icons/folder.png" alt="" />
              Software
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/folder.png" alt="" />
              VS Code
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/folder.png" alt="" />
              VS 2022
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/git.png" alt="" />
              Git/GitHub 
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/folder.png" alt="" />
              Docker
            </div>
            <div className="xp-sidebar-link">
              <img src="/icons/folder.png" alt="" />
              Blender
            </div>

          </div>
        </div>

        {/* Main Content Area */}
        <div className="xp-content-main">
          {/* Header */}
          <h1 className="text-2xl font-bold xp-text-blue xp-mb-3">About Me</h1>

          {/* About Section 1 */}
          <div className="xp-flex xp-gap-3 xp-mb-3">
            <img src={profilePic} alt="Lucas Contreras Hodapp" className="xp-profile-pic" />
            <p className="xp-text-gray" style={{ lineHeight: '1.6' }}>
              Je suis Lucas, étudiant en BUT Informatique Graphique au Puy-en-Velay. 
              Je m'attaque à des défis de développement variés et je me concentre sur la 
              concrétisation d'idées, que ce soit pour résoudre des problèmes concrets 
              ou explorer des concepts ambitieux comme recréer un système d'exploitation 
              entier dans un navigateur. Ma formation a commencé au lycée Marmontel, 
              où les études et l'informatique m'ont appris la discipline et le travail d'équipe.
            </p>
          </div>

          {/* About Section 3 */}
          <div className="xp-flex xp-gap-3 xp-mb-3">
            <p className="xp-text-gray" style={{ lineHeight: '1.6' }}>
              Après m'être engagé dans le développement, j'ai intégré le BUT Informatique Graphique 
              et commencé à travailler sur des projets allant des jeux vidéo aux logiciels pratique. 
            </p>
          </div>

          {/* About Section 4 */}
          <div className="xp-flex xp-gap-3 xp-mb-3">
            <p className="xp-text-gray" style={{ lineHeight: '1.6' }}>
              J'ai d'abord découvert la rigueur, la discipline et l'envie de toujours repousser 
              mes limites à travers les études et la programmation. Je suis obsédé par les détails, 
              le processus et le fait de toujours relever la barre à chaque projet. Mon objectif 
              est de créer un travail qui a un impact durable.
            </p>
          </div>

          {/* Footer */}
          <div className="xp-statusbar" style={{ position: 'static', marginTop: '12px' }}>
            <span>En savoir plus sur Lucas</span>
          </div>
        </div>
      </div>
    </div>
  );
};
