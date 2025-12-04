import { useTranslation } from '../i18n';
import Navbar from './Navbar';
import Aurora from './Aurora';
import CardSwap, { Card } from './CardSwap';
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
          <p className="page-subtitle">Découvrez mes réalisations</p>
        </div>

        {/* Projects Sections */}
        <div className="projects-sections">
          {/* Section 1: CardSwap Projects */}
          <section className="project-section">
            <h2 className="section-title">Projets Principaux</h2>
            <div className="section-content">
              <div style={{ height: '600px', position: 'relative' }}>
                <CardSwap
                  cardDistance={60}
                  verticalDistance={70}
                  delay={5000}
                  pauseOnHover={false}
                >
                  <Card>
                    <div className="project-card-content">
                      <h3>Projet 1</h3>
                      <p>Description du projet 1</p>
                    </div>
                  </Card>
                  <Card>
                    <div className="project-card-content">
                      <h3>Projet 2</h3>
                      <p>Description du projet 2</p>
                    </div>
                  </Card>
                  <Card>
                    <div className="project-card-content">
                      <h3>Projet 3</h3>
                      <p>Description du projet 3</p>
                    </div>
                  </Card>
                </CardSwap>
              </div>
            </div>
          </section>

          {/* Section 2: Downloads */}
          <section className="project-section">
            <h2 className="section-title">Téléchargements</h2>
            <div className="section-content downloads-section">
              <div className="folder-container">
                <Folder size={2} color="#6366f1" className="custom-folder" />
                <p className="folder-label">Fichiers de projet</p>
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
