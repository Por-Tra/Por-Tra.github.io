import { useTranslation } from '../i18n';
import Navbar from './Navbar';
import Aurora from './Aurora';
import Folder from './Folder';
import './Projects.css';

function Projects({ onNavigate }) {
  const { t } = useTranslation();

  return (
    <div className="page-container projects-page">
      {/* Aurora Background */}
      <Aurora
        colorStops={["#0f172a", "#1e293b", "#6366f1"]}
        blend={0.6}
        amplitude={0.8}
        speed={0.4}
      />

      {/* Content */}
      <div className="page-content">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">{t('nav.projects') || 'Mes Projets'}</h1>
          <p className="page-subtitle">Voici une sélection de projets sur lesquels j'ai travaillé</p>
        </div>

        {/* Projects Sections */}
        <div className="projects-sections">
          {/* Section 1: Featured Projects */}
          <section className="project-section">
            <h2 className="section-title">Projets en Vedette</h2>
            <div className="featured-projects">
              <div className="project-card">
                <div className="project-card-content">
                  <h3>SAE 1.1 — Visualisation Scientifique</h3>
                  <p>Application en C++ permettant l'analyse et l'affichage de données scientifiques avec interface graphique.</p>
                  <button onClick={() => window.open('https://github.com/Por-Tra', '_blank')}>Voir plus</button>
                </div>
              </div>

              <div className="project-card">
                <div className="project-card-content">
                  <h3>RPG 2D — Projet NSI</h3>
                  <p>Jeu en Python avec génération procédurale de map, système de combats et gestion d'inventaire.</p>
                  <button onClick={() => window.open('https://github.com/Por-Tra', '_blank')}>Voir plus</button>
                </div>
              </div>

              <div className="project-card">
                <div className="project-card-content">
                  <h3>Générateur d'ASCII Art</h3>
                  <p>Programme C++ convertissant n'importe quelle image en ASCII avec gestion des niveaux de gris.</p>
                  <button onClick={() => window.open('https://github.com/Por-Tra', '_blank')}>Voir plus</button>
                </div>
              </div>
            </div>
          </section>

          

          {/* Section 3: Resources & Downloads */}
          <section className="project-section">
            <h2 className="section-title">Ressources & Téléchargements</h2>
            <p className="section-description">Téléchargez mes projets ou accédez aux dépôts GitHub</p>
            <div className="resources-section">
              <div className="folder-container">
                <Folder size={2} color="#6366f1" className="custom-folder" />
                <p className="folder-label">Fichiers de projet</p>
              </div>
              <div className="resource-links">
                <a href="https://github.com/Por-Tra" target="_blank" rel="noopener noreferrer" className="resource-link">
                  <span className="resource-icon">💻</span>
                  <span>Voir le repo GitHub</span>
                </a>
                <a href="#" className="resource-link">
                  <span className="resource-icon">📦</span>
                  <span>Télécharger .zip</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Navbar */}
      <Navbar currentPage="projects" onNavigate={onNavigate} />
    </div>
  );
}

export default Projects;
