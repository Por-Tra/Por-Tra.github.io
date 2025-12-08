import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import CyberButton from '../components/CyberButton';
import SocialLogoLoop from '../components/SocialLogoLoop';
import Icons from '../components/Icons';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Ajouter la logique d'envoi ici
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Icons.Email />,
      label: 'Email',
      value: 'lucas.travailleur@gmail.com',
      link: 'mailto:lucas.travailleur@gmail.com'
    },
    {
      icon: <Icons.Location />,
      label: 'Localisation',
      value: 'France',
      link: '#'
    }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: <Icons.GitHub />, link: 'https://github.com/Por-Tra' },
    { name: 'LinkedIn', icon: <Icons.LinkedIn />, link: 'https://www.linkedin.com/in/lucas-travailleur/' },
    { name: 'Portfolio', icon: <Icons.Portfolio />, link: 'https://por-tra.github.io/' }
  ];

  return (
    <div className="page contact-page">
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
            <span className="title-text">CONTACT</span>
            <span className="title-line"></span>
          </h1>
          <p className="page-subtitle">
            Discutons de votre prochain projet
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div 
            className="contact-info-section"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">
              <span className="title-bracket">{'<'}</span>
              INFORMATIONS
              <span className="title-bracket">{'/>'}</span>
            </h2>

            <div className="contact-cards">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  className="contact-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="card-icon">{info.icon}</div>
                  <div className="card-info">
                    <span className="info-label">{info.label}</span>
                    <span className="info-value">{info.value}</span>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="social-section">
              <h3 className="social-title">Réseaux Sociaux</h3>
              <SocialLogoLoop links={socialLinks} />
            </div>

            <div className="availability-card">
              <div className="availability-status">
                <Icons.CheckCircle />
                <span>Disponible pour de nouveaux projets</span>
              </div>
            </div>
          </motion.div>

          
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
