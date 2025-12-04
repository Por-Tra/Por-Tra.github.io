import { useTranslation } from '../i18n';
import Navbar from './Navbar';
import Aurora from './Aurora';
import FallingText from './FallingText';
import LogoLoop from './LogoLoop';
import { SiInstagram, SiLinkedin, SiGithub } from 'react-icons/si';
import './About.css';

const techLogos = [
  { node: <SiInstagram />, title: "Insta", href: "https://www.instagram.com/lucas_contreras_hodapp_/" },
  { node: <SiLinkedin />, title: "LinkedIn", href: "https://www.linkedin.com/in/lucas-contreras-hodapp/" },
  { node: <SiGithub />, title: "TypeScript", href: "https://github.com/Por-Tra" }
];

function About({ onNavigate }) {
  const { t } = useTranslation();

  return (
    <div className="page-container about-page">
      {/* Aurora Background */}
      <Aurora
        colorStops={["#0f172a", "#1e293b", "#8b5cf6"]}
        blend={0.6}
        amplitude={0.8}
        speed={0.4}
      />

      {/* Content */}
      <div className="page-content">
        {/* Hero Section */}
        <div className="about-hero">
          <h1 className="hero-title">À Propos</h1>
          <p className="hero-subtitle">Développeur passionné par la création d'expériences web innovantes</p>
        </div>

        {/* Social Links */}
        <div className="social-section">
          <h2 className="section-title">Connectons-nous</h2>
          <div className="logo-loop-wrapper">
            <LogoLoop
              logos={techLogos}
              speed={120}
              direction="left"
              logoHeight={48}
              gap={40}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#000000"
              ariaLabel="Réseaux sociaux"
            />
          </div>
        </div>

        {/* Skills Section */}
        <div className="falling-text-section">
          <h2 className="section-title">Langages maîtrisés</h2>
          <div className="falling-text-wrapper">
            <FallingText
              text={`Python JavaScript C++ C# PHP HTML SQL VisualStudioCode VisualStudio2022 Git/Github Blender Qt`}
              highlightWords={["Python", "JavaScript", "C++", "C#", "Git/Github"]}
              highlightClass="highlighted"
              trigger="hover"
              backgroundColor="transparent"
              wireframes={false}
              gravity={0.56}
              fontSize="2rem"
              mouseConstraintStiffness={0.9}
            />
          </div>
        </div>
      </div>      {/* Navbar */}
      <Navbar currentPage="about" onNavigate={onNavigate} />
    </div>
  );
}

export default About;
