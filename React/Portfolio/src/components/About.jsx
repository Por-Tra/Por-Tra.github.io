import { useTranslation } from '../i18n';
import Navbar from './Navbar';
import './About.css';

function About({ onNavigate }) {
  const { t } = useTranslation();

  return (
    <div className="page-container about-page">
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
