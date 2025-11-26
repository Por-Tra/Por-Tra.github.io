import { useTranslation } from '../i18n';
import Navbar from './Navbar';
import Aurora from './Aurora';
import './Projects.css';

function Projects({ onNavigate }) {
  const { t } = useTranslation();

  return (
    <div className="page-container projects-page">
      {/* Aurora Background */}
      <Aurora
        colorStops={["#ffffff", "#00ffff", "#0000ff"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />

      {/* Content */}
      <div className="page-content">
        {/* Votre contenu ici */}
      </div>

      {/* Navbar */}
      <Navbar currentPage="projects" onNavigate={onNavigate} />
    </div>
  );
}

export default Projects;
