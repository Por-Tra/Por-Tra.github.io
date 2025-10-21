// ==================== TRANSLATIONS DATABASE ====================
const translations = {
  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      projects: 'Projets',
      about: 'À propos',
      cv: 'CV',
      contact: 'Contact'
    },
    
    // Index page
    index: {
      play: 'CLIQUE',
      press: 'Insérer un disque',
      slpPrefix: 'SLP'
    },
    
    // Menu page
    menu: {
      title: 'Bienvenue sur mon Portfolio',
      subtitle: "Explore mes créations, mes projets d'applications web, de modélisation 3D, de programmation et bien plus encore. Utilise la navigation pour découvrir mon univers créatif et technique.",
      ctaProjects: 'Découvrir mes projets',
      
      projectsTitle: 'Mes Projets',
      projectsDesc: "Du développement d'applications web aux applications de bureautique, je mets à profit mes compétences pour donner vie à des projets variés et ambitieux. Chaque projet est une occasion d'apprendre et de repousser mes limites techniques et créatives.",
      ctaAllProjects: 'Voir tous les projets',
      
      aboutTitle: 'À Propos de Moi',
      aboutDesc: "Passionné par la technologie et la création numérique, je combine mes compétences en programmation, pour concevoir des outils uniques. Mon objectif est de transformer des idées en réalisations concrètes et innovantes, tout en partageant ma passion avec les autres.",
      ctaLearnMore: 'En savoir plus',
      
      cvTitle: 'Mon CV',
      cvDesc: "Consulte mon parcours professionnel, mes formations, mes compétences techniques et mes expériences. Tu peux également télécharger mon CV au format PDF pour en apprendre davantage sur mon profil et mes réalisations.",
      ctaViewCV: 'Consulter mon CV',
      
      contactTitle: 'Me Contacter',
      contactDesc: "Tu as un projet en tête ? Une question ? Une opportunité de collaboration ? N'hésite pas à me contacter par email ou via d'autres plateformes. Je suis toujours ouvert aux échanges et aux nouvelles idées. Travaillons ensemble pour créer quelque chose d'exceptionnel !",
      ctaSendEmail: 'Envoyer un email',
      
      footer: {
        contact: 'Contact',
        styleCredit: 'Style inspiré du site'
      }
    },
    
    // Contact page
    contact: {
      pageTitle: 'Contactez-moi',
      intro: "N'hésitez pas à me contacter pour toute question, collaboration ou opportunité professionnelle.",

      // Aliases to match data-i18n in HTML
      title: 'Me contacter',
      subtitle: "N'hésitez pas à me joindre via mes réseaux ou par email :",
      
      links: {
        linkedin: 'LinkedIn',
        github: 'GitHub',
        instagram: 'Instagram',
        email: 'Email'
      },
      // Flat keys used by HTML
      linkedin: 'LinkedIn',
      github: 'GitHub',
      instagram: 'Instagram',
      email: 'Email',
      
      emailSection: {
        title: 'Contactez-moi par Email',
        address: 'lucascontrerashodapp@gmail.com'
      },
      
      about: {
        title: 'À Propos',
        text: "Étudiant passionné en informatique, je me spécialise dans le développement web, la modélisation 3D et la programmation. Mon objectif est de créer des solutions innovantes et de repousser constamment les limites de mes compétences techniques."
      },
      // Aliases
      aboutTitle: 'À propos',
      aboutText: "Étudiant passionné en informatique, je me spécialise dans le développement web, la modélisation 3D et la programmation. Mon objectif est de créer des solutions innovantes et de repousser constamment les limites de mes compétences techniques.",
      
      formations: {
        title: 'Formations',
        items: [
          'BUT Informatique - IUT Clermont Auvergne',
          'Baccalauréat Scientifique - Mention Bien',
          'Certifications en développement web et 3D'
        ]
      },
      // Aliases and specific lines
      formationsTitle: 'Formations',
      formation1: 'BUT Informatique graphique - Le Puy-en-Velay -- 2024-2027',
      formation2: 'BAC Général - Lycée Marmontel - Mauriac -- 2021-2024',
      
      skills: {
        title: 'Compétences',
        items: [
          'HTML/CSS/JavaScript',
          'Python & C++',
          'Three.js & WebGL',
          'Blender & Modélisation 3D',
          'Git & GitHub',
          'Design UI/UX'
        ]
      },
      skillsTitle: 'Compétences',
      toolsTitle: 'Outils de conception',
      
      interests: {
        title: "Centres d'Intérêt",
        items: [
          {
            title: 'Développement Web',
            desc: 'Création de sites interactifs et responsives'
          },
          {
            title: 'Modélisation 3D',
            desc: 'Design et animation de modèles 3D réalistes'
          },
          {
            title: 'Gaming',
            desc: 'Passionné de jeux vidéo et de game design'
          },
          {
            title: 'Technologie',
            desc: 'Veille technologique et innovation'
          }
        ]
      },
      interestsTitle: 'Intérêts',
      interest1Title: "Lecteur de romans d'aventure",
      interest1Desc: "J'apprécie suivre l'évolution de personnages évoluant dans des contextes sociaux difficiles, comme dans  Cyberpunk 2077 : No Coincidence ou encore Neuromancien.",
      interest2Title: 'Fascination pour les univers postapocalyptiques',
      interest2Desc: "Jeux indépendants, level design et interaction; passion pour la logique de gameplay et l'optimisation.",
      interest3Title: 'Fan de chevalerie',
      interest3Desc: "Je suis toujours présent lors d'événements médiévaux. Vêtue d'une armure, je fais sensation.",
      
      experiences: {
        title: 'Expériences professionnelles',
        items: [
          'ASSISTANT Gérant PHARMACIEN - Pharmacie Malbec, Mauriac (15) - durée : 1mois',
          'Coming soon 👀'
        ]
      }
      ,
      experiencesTitle: 'Expériences professionnelles',
      experience1: 'ASSISTANT Gérant PHARMACIEN - Pharmacie Malbec, Mauriac (15) - durée : 1mois',
      experience2: 'Coming soon 👀'
    },
    
    // CV page
    cv: {
      pageTitle: 'Mon Curriculum Vitae',
      intro: 'Découvrez mon parcours, mes compétences et mes expériences professionnelles.',
      
      downloadBtn: 'Télécharger mon CV',
      viewBtn: 'Ouvrir dans un nouvel onglet',
      
      fallback: 'Le PDF ne peut pas être affiché sur cet appareil.',
      fallbackLink: 'Ouvrir le CV en plein écran',
      
      // Aliases for HTML
      logoTitle: 'Mon CV',
      title: 'Mon Curriculum Vitae',
      subtitle: 'Découvrez mon parcours, mes compétences et mes expériences professionnelles.',
      fallbackText: 'Le PDF ne peut pas être affiché sur cet appareil.'
    },
    
    // Projects page
    projects: {
      pageTitle: 'Mes Projets',
      intro: 'Découvrez mes réalisations en développement web, modélisation 3D et programmation.',

      // Labels used in the UI
      logoTitle: 'Mes Projets',
      title: 'Portfolio - Projets',
      descLabel: 'Description : ',
      langLabel: 'Langages : ',
      teamLabel: 'Equipe : ',
      dateLabel: 'Date : ',
      featuresLabel: 'Fonctionnalités : ',
      roleLabel: 'Mon rôle : ',
      skillsLabel: 'Compétences : ',
      downloadBtn: 'Télécharger le projet (.zip)',

      // Project 1 details
      project1Title: 'RPG 2D',
      project1Desc: "Ce projet est un projet étudiant qui a été réalisé pendant mes années de lycée. Il s'agit d'un jeu vidéo en 2D de type RPG dans un style Pokemon. Le but du jeu est de parcourir 3 niveaux afin d'éliminer le boss de fin.",
      project1Lang: 'Python',
      project1Team: 'Travaillé en équipe de 2',
      project1Date: '2022-2023',
      project1Features: 'Déplacements, changement de niveau, animation, dialogues avec NPC, combat, changement de personnage',
      project1Role: 'Développeur',
      project1Skills: "Python, utilisation d'un IDE (pycharm), gestion de bibliothèque, utilisation d'outil de conception de niveau",

      // Project 2 details
      project2Title: 'Projet de soutenance',
      project2Desc: "Il s'agit d'un projet universitaire dont le but était de fabriquer une application web pour noter les élèves",
      project2Lang: 'HTML, CSS, PHP, SQL',
      project2Team: '11 personnes (par groupe de classe)',
      project2Date: '10 septembre 2025 - 3 octobre 2025',
      project2Features: 'gestion des élèves, des notes, des projets',
      project2Role: "Développeur back-end, réalisation de la partie 3.3 et du système d'envoi de mail automatique",
      project2Skills: 'HTML, CSS, PHP, SQL, Git, travail avec une grande équipe',

      // 3D section
      section3dTitle: 'Mes Projets 3D',
      section3dDesc: 'Sélectionnez un projet ci-dessous pour en savoir plus ou pour y accéder directement.',
      card1Title: "Modélisation d'une chambre en low poly",
      card1Desc: "Visualisation interactive d'une chambre moderne",
      card2Title: 'Projet 2',
      card3Title: 'Projet 3',
      comingSoon: 'À venir'
    },
    
    // 3D page
    scene3d: {
      pageTitle: 'Chambre Low Poly',
      desc: 'Modélisation 3D - Utilisez la souris pour explorer',
      // Aliases used in HTML
      logo: 'Projet 3D',
      title: 'Chambre Low Poly',
      subtitle: 'Modélisation 3D - Utilisez la souris pour explorer',
      
      controls: {
        rotate: 'Rotation',
        zoom: 'Zoom',
        pan: 'Déplacer'
      },
      
      loading: 'Chargement',
      error: 'Erreur de chargement'
    },
    
    // Common
    common: {
      loading: 'Chargement...',
      error: 'Une erreur est survenue',
      close: 'Fermer',
      next: 'Suivant',
      previous: 'Précédent',
      menu: 'Menu',
      portfolio: 'Mon portfolio'
    }
  },
  
  en: {
    // Navigation
    nav: {
      home: 'Home',
      projects: 'Projects',
      about: 'About',
      cv: 'Resume',
      contact: 'Contact'
    },
    
    // Index page
    index: {
      play: 'CLICK',
      press: 'Insert disk',
      slpPrefix: 'SLP'
    },
    
    // Menu page
    menu: {
      title: 'Welcome to my Portfolio',
      subtitle: 'Explore my creations, web application projects, 3D modeling, programming and much more. Use the navigation to discover my creative and technical universe.',
      ctaProjects: 'Discover my projects',
      
      projectsTitle: 'My Projects',
      projectsDesc: 'From web application development to desktop applications, I use my skills to bring varied and ambitious projects to life. Each project is an opportunity to learn and push my technical and creative limits.',
      ctaAllProjects: 'View all projects',
      
      aboutTitle: 'About Me',
      aboutDesc: 'Passionate about technology and digital creation, I combine my programming skills to design unique tools. My goal is to transform ideas into concrete and innovative achievements, while sharing my passion with others.',
      ctaLearnMore: 'Learn more',
      
      cvTitle: 'My Resume',
      cvDesc: 'Check out my professional background, education, technical skills and experiences. You can also download my resume in PDF format to learn more about my profile and achievements.',
      ctaViewCV: 'View my resume',
      
      contactTitle: 'Contact Me',
      contactDesc: "Do you have a project in mind? A question? A collaboration opportunity? Don't hesitate to contact me by email or via other platforms. I'm always open to exchanges and new ideas. Let's work together to create something exceptional!",
      ctaSendEmail: 'Send an email',
      
      footer: {
        contact: 'Contact',
        styleCredit: 'Style inspired by the website'
      }
    },
    
    // Contact page
    contact: {
      pageTitle: 'Contact Me',
      intro: "Feel free to contact me for any questions, collaboration or professional opportunity.",
      // Aliases
      title: 'Contact me',
      subtitle: 'Feel free to reach me via my socials or by email:',
      
      links: {
        linkedin: 'LinkedIn',
        github: 'GitHub',
        instagram: 'Instagram',
        email: 'Email'
      },
      // Flat keys used by HTML
      linkedin: 'LinkedIn',
      github: 'GitHub',
      instagram: 'Instagram',
      email: 'Email',
      
      emailSection: {
        title: 'Contact me by Email',
        address: 'lucascontrerashodapp@gmail.com'
      },
      
      about: {
        title: 'About',
        text: "Passionate computer science student, I specialize in web development, 3D modeling and programming. My goal is to create innovative solutions and constantly push the boundaries of my technical skills."
      },
      aboutTitle: 'About',
      aboutText: "Passionate computer science student, I specialize in web development, 3D modeling and programming. My goal is to create innovative solutions and constantly push the boundaries of my technical skills.",
      
      formations: {
        title: 'Education',
        items: [
          'Computer Science BUT - IUT Clermont Auvergne',
          'Scientific Baccalaureate - High Honors',
          'Web development and 3D certifications'
        ]
      },
      formationsTitle: 'Education',
      formation1: 'BUT Computer Science - Le Puy-en-Velay -- 2024-2027',
      formation2: 'General Baccalaureate - Lycée Marmontel - Mauriac -- 2021-2024',
      
      skills: {
        title: 'Skills',
        items: [
          'HTML/CSS/JavaScript',
          'Python & C++',
          'Three.js & WebGL',
          'Blender & 3D Modeling',
          'Git & GitHub',
          'UI/UX Design'
        ]
      },
      skillsTitle: 'Skills',
      toolsTitle: 'Design tools',
      
      interests: {
        title: 'Interests',
        items: [
          {
            title: 'Web Development',
            desc: 'Creating interactive and responsive websites'
          },
          {
            title: '3D Modeling',
            desc: 'Design and animation of realistic 3D models'
          },
          {
            title: 'Gaming',
            desc: 'Passionate about video games and game design'
          },
          {
            title: 'Technology',
            desc: 'Technology watch and innovation'
          }
        ]
      },
      interestsTitle: 'Interests',
      interest1Title: 'Adventure novel reader',
      interest1Desc: 'I enjoy following characters evolving in challenging social contexts, like in Cyberpunk 2077: No Coincidence or Neuromancer.',
      interest2Title: 'Fascination for post-apocalyptic universes',
      interest2Desc: 'Indie games, level design and interaction; passion for gameplay logic and optimization.',
      interest3Title: 'Medieval fan',
      interest3Desc: "I'm always present at medieval events. Wearing armor, I make an impression.",
      
      experiences: {
        title: 'Professional Experience',
        items: [
          'ASSISTANT Manager PHARMACIST - Pharmacie Malbec, Mauriac (15) - duration: 1 month',
          'Coming soon 👀'
        ]
      }
      ,
      experiencesTitle: 'Professional Experience',
      experience1: 'ASSISTANT Manager PHARMACIST - Pharmacie Malbec, Mauriac (15) - duration: 1 month',
      experience2: 'Coming soon 👀'
    },
    
    // CV page
    cv: {
      pageTitle: 'My Resume',
      intro: 'Discover my background, skills and professional experiences.',
      
      downloadBtn: 'Download my resume',
      viewBtn: 'Open in new tab',
      
      fallback: 'PDF cannot be displayed on this device.',
      fallbackLink: 'Open resume in full screen',
      
      // Aliases for HTML
      logoTitle: 'My Resume',
      title: 'My Resume',
      subtitle: 'Discover my background, skills and professional experiences.',
      fallbackText: 'PDF cannot be displayed on this device.'
    },
    
    // Projects page
    projects: {
      pageTitle: 'My Projects',
      intro: 'Discover my achievements in web development, 3D modeling and programming.',

      logoTitle: 'My Projects',
      title: 'Portfolio - Projects',
      descLabel: 'Description: ',
      langLabel: 'Languages: ',
      teamLabel: 'Team: ',
      dateLabel: 'Date: ',
      featuresLabel: 'Features: ',
      roleLabel: 'My role: ',
      skillsLabel: 'Skills: ',
      downloadBtn: 'Download project (.zip)',

      project1Title: '2D RPG',
      project1Desc: 'This is a student project done during my high school years. It is a 2D RPG in a Pokemon-like style. The goal is to go through 3 levels to defeat the final boss.',
      project1Lang: 'Python',
      project1Team: 'Worked in a team of 2',
      project1Date: '2022-2023',
      project1Features: 'Movement, level change, animation, NPC dialogues, combat, character change',
      project1Role: 'Developer',
      project1Skills: 'Python, IDE usage (PyCharm), library management, level design tools',

      project2Title: 'Defense presentation project',
      project2Desc: 'A university project to build a web app to grade students',
      project2Lang: 'HTML, CSS, PHP, SQL',
      project2Team: '11 people (class groups)',
      project2Date: 'Sep 10, 2025 - Oct 3, 2025',
      project2Features: 'student, grades, and projects management',
      project2Role: 'Back-end developer, built section 3.3 and automatic email sending system',
      project2Skills: 'HTML, CSS, PHP, SQL, Git, work with a large team',

      section3dTitle: 'My 3D Projects',
      section3dDesc: 'Select a project below to learn more or access it directly.',
      card1Title: 'Low poly room modeling',
      card1Desc: 'Interactive visualization of a modern room',
      card2Title: 'Project 2',
      card3Title: 'Project 3',
      comingSoon: 'Coming soon'
    },
    
    // 3D page
    scene3d: {
      pageTitle: 'Low Poly Room',
      desc: '3D Modeling - Use mouse to explore',
      logo: '3D Project',
      title: 'Low Poly Room',
      subtitle: '3D Modeling - Use mouse to explore',
      
      controls: {
        rotate: 'Rotate',
        zoom: 'Zoom',
        pan: 'Move'
      },
      
      loading: 'Loading',
      error: 'Loading error'
    },
    
    // Common
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      close: 'Close',
      next: 'Next',
      previous: 'Previous',
      menu: 'Menu',
      portfolio: 'My portfolio'
    }
  }
};

// ==================== LANGUAGE MANAGER ====================
class LanguageManager {
  constructor() {
    this.storageKey = 'portfolio_lang';
    this.currentLang = this.getStoredLang();
    this.listeners = [];
  }
  
  // Get language from localStorage or browser default
  getStoredLang() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored === 'en' || stored === 'fr') return stored;
    return navigator.language && navigator.language.startsWith('fr') ? 'fr' : 'en';
  }
  
  // Get current language
  getLang() {
    return this.currentLang;
  }
  
  // Set language and save to localStorage
  setLang(lang) {
    if (lang !== 'en' && lang !== 'fr') return;
    this.currentLang = lang;
    localStorage.setItem(this.storageKey, lang);
    this.notifyListeners();
  }
  
  // Get translation
  t(path) {
    const keys = path.split('.');
    let value = translations[this.currentLang];
    
    for (const key of keys) {
      if (value && typeof value === 'object') {
        value = value[key];
      } else {
        return null; // Missing: indicate not found
      }
    }
    // If resolved value is falsy, treat as missing
    return (value === undefined || value === null) ? null : value
  }
  
  // Add listener for language changes
  onChange(callback) {
    this.listeners.push(callback);
  }
  
  // Notify all listeners
  notifyListeners() {
    this.listeners.forEach(callback => callback(this.currentLang));
  }
}

// Create global instance
window.langManager = new LanguageManager();

// ==================== AUTO TRANSLATE ELEMENTS ====================
function translatePage() {
  const lang = window.langManager.getLang();
  
  // Translate elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = window.langManager.t(key);
    // If missing translation, keep original content as-is
    if (translation === null) return;

    if (Array.isArray(translation)) {
      // Handle arrays (for lists)
      element.innerHTML = translation.map(item => `<li>${item}</li>`).join('');
    } else if (typeof translation === 'object') {
      // Handle objects (complex structures)
      console.warn('Cannot auto-translate object:', key);
    } else {
      // Simple text
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    }
  });
  
  // Update language selector buttons
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });
}

// ==================== LANGUAGE SELECTOR COMPONENT ====================
function createLanguageSelector(containerId = 'lang-selector') {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const lang = window.langManager.getLang();
  
  container.innerHTML = `
    <button data-lang="fr" class="${lang === 'fr' ? 'active' : ''}">FR</button>
    <button data-lang="en" class="${lang === 'en' ? 'active' : ''}">EN</button>
  `;
  
  container.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      const newLang = btn.getAttribute('data-lang');
      window.langManager.setLang(newLang);
    });
  });
}

// ==================== INITIALIZATION ====================
// Listen for language changes
window.langManager.onChange((lang) => {
  translatePage();
  // Dispatch custom event for specific components
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
});

// Auto-translate on page load
document.addEventListener('DOMContentLoaded', () => {
  translatePage();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LanguageManager, translations, translatePage, createLanguageSelector };
}
