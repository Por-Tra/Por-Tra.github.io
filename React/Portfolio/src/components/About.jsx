import { useTranslation } from '../i18n';
import Navbar from './Navbar';
import Aurora from './Aurora';
import FallingText from './FallingText';
import LogoLoop from './LogoLoop';
import TextType from './TextType';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiInstagram, SiLinkedin, SiGithub } from 'react-icons/si';
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
        colorStops={["#ffffff", "#00ffff", "#0000ff"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />

      {/* Content */}
      <div className="page-content">
        {/* Hero Section */}
        <div className="about-hero">
          <TextType
            as="h1"
            className="hero-title"
            text={["À Propos", "Developer", "Créateur"]}
            typingSpeed={100}
            pauseDuration={2000}
            showCursor={true}
            cursorCharacter="|"
            loop={true}
          />
          <p className="hero-subtitle">Développeur passionné par la création d'expériences web innovantes</p>
        </div>

        {/* Social Links */}
        <div className="social-section">
          <TextType
            as="h2"
            className="section-title"
            text={["Connectons-nous", "Let's Connect", "Rejoignez-moi"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            loop={true}
          />
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
          <TextType
            as="h2"
            className="section-title"
            text={["Langages maîtrisés", "Tech Stack", "Compétences"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            loop={true}
          />
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
