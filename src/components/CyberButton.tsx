import { motion } from 'framer-motion';
import './CyberButton.css';

interface CyberButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
}

const CyberButton = ({ children, onClick, variant = 'primary', type = 'button' }: CyberButtonProps) => {
  return (
    <motion.button
      className={`cyber-button ${variant}`}
      onClick={onClick}
      type={type}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="button-content">{children}</span>
      <span className="button-glitch" aria-hidden="true">{children}</span>
      <span className="button-glitch" aria-hidden="true">{children}</span>
      <div className="button-clip">
        <div className="button-clip-inner"></div>
      </div>
    </motion.button>
  );
};

export default CyberButton;
