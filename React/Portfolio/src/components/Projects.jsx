import { useTranslation } from '../i18n';
import Navbar from './Navbar';
import Aurora from './Aurora';
import CardSwap, { Card } from './CardSwap';
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
        <div style={{ height: '600px', position: 'relative' }}>
          <CardSwap
            cardDistance={60}
            verticalDistance={70}
            delay={5000}
            pauseOnHover={false}
          >
            <Card>
              <h3>Card 1</h3>
              <p>Your content here</p>
            </Card>
            <Card>
              <h3>Card 2</h3>
              <p>Your content here</p>
            </Card>
            <Card>
              <h3>Card 3</h3>
              <p>Your content here</p>
            </Card>
          </CardSwap>
        </div>
      </div>

      {/* Navbar */}
      <Navbar currentPage="projects" onNavigate={onNavigate} />
    </div>
  );
}

export default Projects;
