import { useTranslation } from '../i18n';
import Navbar from './Navbar';
import Aurora from './Aurora';
import './CV.css';

function CV({ onNavigate }) {
  const { t } = useTranslation();

  return (
    <div className="page-container cv-page">
      {/* Aurora Background */}
      <Aurora
        colorStops={["#0f172a", "#1e293b", "#6366f1"]}
        blend={0.6}
        amplitude={0.8}
        speed={0.4}
      />

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
