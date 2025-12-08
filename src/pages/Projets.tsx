import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import './Projets.css';

const Projets = () => {
  const projects = [
    {
      title: 'Lorem',
      description: 'Lorem',
      tags: ['Lorem', 'Lorem', 'Lorem', 'Lorem'],
      image: '/project1.jpg',
      link: '#'
    },
    {
      title: 'Lorem',
      description: 'Lorem',
      tags: ['Lorem', 'Lorem', 'Lorem', 'Lorem'],
      image: '/project1.jpg',
      link: '#'
    },
    {
      title: 'Lorem',
      description: 'Lorem',
      tags: ['Lorem', 'Lorem', 'Lorem', 'Lorem'],
      image: '/project1.jpg',
      link: '#'
    },
    {
      title: 'Lorem',
      description: 'Lorem',
      tags: ['Lorem', 'Lorem', 'Lorem', 'Lorem'],
      image: '/project1.jpg',
      link: '#'
    },
  ];

  return (
    <div className="page projets-page">
      <Navbar />
      
      <div className="cyber-grid"></div>
      
      <motion.div 
        className="page-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="page-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="page-title">
            <span className="title-line"></span>
            <span className="title-text">MES PROJETS</span>
            <span className="title-line"></span>
          </h1>
          <p className="page-subtitle">
            Explorez mes créations technologiques et innovations numériques
          </p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Projets;
