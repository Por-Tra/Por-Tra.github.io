import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Icons from '../components/Icons';
import './APropos.css';

const APropos = () => {
  const skills = [
    { name: 'React & TypeScript', level: 85 },
    { name: 'Python & IA', level: 90 },
    { name: 'Node.js & Backend', level: 80 },
    { name: 'UI/UX Design', level: 75 },
    { name: 'Machine Learning', level: 85 },
    { name: 'Git & DevOps', level: 80 }
  ];

  const experiences = [
    {
      year: '2024',
      title: 'Développeur Full Stack',
      company: 'Projets Personnels & Open Source',
      description: 'Développement d\'applications web modernes et exploration de l\'IA'
    },
    {
      year: '2023',
      title: 'Formation Avancée',
      company: 'Spécialisation IA & Machine Learning',
      description: 'Étude approfondie des technologies d\'intelligence artificielle et de leurs applications'
    },
    {
      year: '2022',
      title: 'Développement Web',
      company: 'Projets Freelance',
      description: 'Création de sites web et applications pour divers clients'
    }
  ];

  return (
    <div className="page apropos-page">
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
            <span className="title-text">À PROPOS</span>
            <span className="title-line"></span>
          </h1>
        </motion.div>

        <div className="apropos-content">
          <motion.div 
            className="about-section"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="profile-card">
              <div className="profile-glow"></div>
              <div className="profile-image">
                <div className="image-border"></div>
                <div className="image-placeholder">
                  <Icons.Code />
                </div>
              </div>
              
              <div className="profile-info">
                <h2 className="profile-name">Lucas Travailleur</h2>
                <p className="profile-tagline">Développeur Full Stack & Passionné d'IA</p>
                
                <div className="profile-stats">
                  <div className="stat">
                    <span className="stat-number">3+</span>
                    <span className="stat-label">Années</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">20+</span>
                    <span className="stat-label">Projets</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">100%</span>
                    <span className="stat-label">Passion</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bio-card">
              <h3 className="section-title">
                <span className="title-bracket">{'<'}</span>
                BIO
                <span className="title-bracket">{'/>'}</span>
              </h3>
              <p className="bio-text">
                Développeur passionné spécialisé dans les technologies web modernes et l'intelligence artificielle. 
                Je crée des solutions innovantes en combinant React, TypeScript, Python et les dernières avancées en IA.
              </p>
              <p className="bio-text">
                Mon objectif est de développer des applications performantes, intuitives et à la pointe de la technologie, 
                tout en explorant les possibilités infinies offertes par l'apprentissage automatique et le développement full-stack.
              </p>
              <p className="bio-text">
                Actuellement en recherche active d'opportunités pour contribuer à des projets ambitieux et 
                continuer à développer mes compétences dans un environnement stimulant.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="skills-section"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="section-title">
              <span className="title-bracket">{'<'}</span>
              COMPÉTENCES
              <span className="title-bracket">{'/>'}</span>
            </h3>
            
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="skill-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percent">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div 
                      className="skill-progress"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            className="experience-section"
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="section-title">
              <span className="title-bracket">{'<'}</span>
              EXPÉRIENCE
              <span className="title-bracket">{'/>'}</span>
            </h3>
            
            <div className="timeline">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="timeline-item"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="timeline-marker">
                    <div className="marker-dot"></div>
                    <div className="marker-line"></div>
                  </div>
                  
                  <div className="timeline-content">
                    <span className="timeline-year">{exp.year}</span>
                    <h4 className="timeline-title">{exp.title}</h4>
                    <p className="timeline-company">{exp.company}</p>
                    <p className="timeline-description">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default APropos;
