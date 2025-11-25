import { useTranslation } from '../i18n';
import Navbar from './Navbar';
import './About.css';

function About({ onNavigate }) {
  const { t } = useTranslation();

  return (
    <div className="page-container about-page">
      {/* Visual layers */}
      <div className="noise"></div>
      <div className="noise noise-moving"></div>
      <div className="scanlines"></div>

      {/* Content */}
      <div className="page-content">
        {/* Votre contenu ici */}
      </div>

      {/* Navbar */}
      <Navbar currentPage="about" onNavigate={onNavigate} />
    </div>
  );
}

export default About;
