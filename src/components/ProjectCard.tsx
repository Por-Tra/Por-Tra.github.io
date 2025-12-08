import { motion } from 'framer-motion';
import './ProjectCard.css';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
  index: number;
}

const ProjectCard = ({ title, description, tags, image, link, index }: ProjectCardProps) => {
  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className="card-glow"></div>
      
      {image && (
        <div className="card-image">
          <img src={image} alt={title} />
          <div className="image-overlay"></div>
        </div>
      )}
      
      <div className="card-content">
        <h3 className="card-title">
          <span className="title-bracket">{'<'}</span>
          {title}
          <span className="title-bracket">{'>'}</span>
        </h3>
        
        <p className="card-description">{description}</p>
        
        <div className="card-tags">
          {tags.map((tag, i) => (
            <span key={i} className="tag">
              #{tag}
            </span>
          ))}
        </div>
        
        {link && (
          <a href={link} className="card-link" target="_blank" rel="noopener noreferrer">
            <span>VOIR LE PROJET</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </a>
        )}
      </div>
      
      <div className="card-corner top-left"></div>
      <div className="card-corner top-right"></div>
      <div className="card-corner bottom-left"></div>
      <div className="card-corner bottom-right"></div>
    </motion.div>
  );
};

export default ProjectCard;
