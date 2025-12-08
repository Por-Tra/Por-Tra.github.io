import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import './Projets.css';
import { useState } from 'react';

const Projets = () => {

  const projects = [
    {
      title: 'SAE 1.1 - Visualisation de données',
      image: '/project1.jpg',
      link: '/projets/visualisation'
    },
    {
      title: 'Jeu RPG 2D (Python / NSI)',
      image: '/project2.jpg',
      link: '/projets/rpg'
    },
    {
      title: 'Générateur ASCII Art (C++)',
      image: '/project3.jpg',
      link: '/projets/ascii'
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextProject = () => {
    setCurrent((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrent((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="page projets-page">
      <Navbar />

      <motion.div
        className="page-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >

        {/* Header */}
        <motion.div
          className="page-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="page-title">
            <span className="title-text">MES PROJETS</span>
          </h1>

          <p className="page-subtitle">
            Explorez mes créations technologiques et innovations numériques
          </p>
        </motion.div>

        {/* 🎯 Nouveau carrousel */}
        <motion.div className="carousel-container">

          <motion.button className="nav-btn left" onClick={prevProject}>
            ‹
          </motion.button>

          <div className="carousel">
            {projects.map((project, index) => (
              <motion.a
                key={index}
                href={project.link}
                className={`carousel-item ${current === index ? 'active' : ''}`}
                initial={{ scale: 0.7, opacity: 0.4 }}
                animate={current === index ? { scale: 1.1, opacity: 1 } : {}}
                transition={{ type: "spring", stiffness: 120 }}
              >
                <img src={project.image} alt={project.title} />
                <h3>{project.title}</h3>
              </motion.a>
            ))}
          </div>

          <motion.button className="nav-btn right" onClick={nextProject}>
            ›
          </motion.button>

        </motion.div>

      </motion.div>

    </div>
  );
};

export default Projets;
