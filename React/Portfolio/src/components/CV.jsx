import { useTranslation } from '../i18n';
import Navbar from './Navbar';
import './CV.css';

function CV({ onNavigate }) {
  const { t } = useTranslation();

  return (
    <div className="page-container cv-page">
      {/* Visual layers */}
      <div className="noise"></div>
      <div className="noise noise-moving"></div>
      <div className="scanlines"></div>

      {/* Content */}
      <div className="page-content">
        {/* Votre contenu ici */}
      </div>

      {/* Navbar */}
      <Navbar currentPage="cv" onNavigate={onNavigate} />
    </div>
  );
}

export default CV;
