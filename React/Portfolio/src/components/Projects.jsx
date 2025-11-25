import { useTranslation } from '../i18n';
import Navbar from './Navbar';
import './Projects.css';

function Projects({ onNavigate }) {
  const { t } = useTranslation();

  return (
    <div className="page-container projects-page">
      {/* Visual layers */}
      <div className="noise"></div>
      <div className="noise noise-moving"></div>
      <div className="scanlines"></div>

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
