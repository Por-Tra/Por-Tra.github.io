import { motion } from 'framer-motion';
import './SocialLogoLoop.css';

interface SocialLink {
  name: string;
  icon: React.ReactNode;
  link: string;
}

interface SocialLogoLoopProps {
  links: SocialLink[];
}

const SocialLogoLoop = ({ links }: SocialLogoLoopProps) => {
  return (
    <div className="social-logo-loop">
      <motion.div 
        className="logo-track"
        animate={{
          x: [0, -100 * links.length]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear"
          }
        }}
      >
        {/* Afficher les liens deux fois pour créer l'effet de boucle infinie */}
        {[...links, ...links, ...links].map((social, index) => (
          <a
            key={`${social.name}-${index}`}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="social-logo-item"
          >
            <div className="social-icon-wrapper">
              {social.icon}
            </div>
            <span className="social-name">{social.name}</span>
          </a>
        ))}
      </motion.div>
    </div>
  );
};

export default SocialLogoLoop;
