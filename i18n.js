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
        text: "Passionné par l’informatique depuis mes premiers pas dans le code, je vois chaque projet comme une opportunité de relever des défis techniques et de créer des solutions claires et performantes. Que ce soit en développant un jeu interactif en Python, une application de gestion avec une interface intuitive ou un système réseau optimisé, j’aime structurer mes idées pour aboutir à des résultats fonctionnels et élégants."
      },
      // Aliases
      aboutTitle: 'À propos',
      aboutText: "Passionné par l’informatique depuis mes premiers pas dans le code, je vois chaque projet comme une opportunité de relever des défis techniques et de créer des solutions claires et performantes. Que ce soit en développant un jeu interactif en Python, une application de gestion avec une interface intuitive ou un système réseau optimisé, j’aime structurer mes idées pour aboutir à des résultats fonctionnels et élégants.",

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
      langsTitle: 'Langages de programmation',
      // Individual skill lines for contact page (FR)
      skill1: 'Développer des applications informatiques simples',
      skill2: 'Appréhender et construire des algorithmes',
      skill3: 'Installer et configurer un poste de travail',
      skill4: 'Concevoir et mettre en place une base de données à partir d’un cahier des charges client',
      skill5: 'Identifier les besoins métiers des clients et des utilisateurs',
      skill6: 'Identifier ses aptitudes pour travailler dans une équipe',
      // Languages & tools labels (FR)
      lang_js: 'JavaScript',
      lang_py: 'Python',
      lang_cpp: 'C++ / C# / C',
      lang_php: 'PHP',
      lang_sql: 'SQL',
      tool_blender: 'Blender',
      tool_vscode: 'Visual Studio Code',
      tool_vs: 'Visual Studio 2022',
      tool_git: 'Git',
      tool_qt: 'Qt',
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
          'À venir'
        ]
      }
      ,
      experiencesTitle: 'Expériences professionnelles',
      experience1: 'ASSISTANT Gérant PHARMACIEN - Pharmacie Malbec, Mauriac (15) - durée : 1mois',
      experience2: 'À venir'
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

  // Project 3 (RSL)
  project3Title: 'Projet Réseau Social Local',
  project3Desc: "C'est un projet qui a pour but de permettre un échange de messages depuis 2 machines distinctes et avec la possibilité d'héberger le serveur très facilement",
  project3Lang: 'Python',
  project3Team: 'Travaillé en équipe de 2',
  project3Date: 'mars-mai 2024',
  project3Features: 'Échange de messages entre 2 utilisateurs et ordinateurs, historique des messages, hébergement du serveur, fonctionnel uniquement en réseau local',
  project3Role: 'Synchronisation des messages, interface, gestion du serveur',
  project3Skills: 'Python, serveur socket, interface graphique, bibliothèques Python',

      // 3D section
      section3dTitle: 'Mes Projets 3D',
      section3dDesc: 'Sélectionnez un projet ci-dessous pour en savoir plus ou pour y accéder directement.',
      card1Title: "Modélisation d'une chambre en low poly",
      card1Desc: "Visualisation interactive d'une chambre moderne",
      card2Title: 'Modélisation d'une partie du système solaire',
      card2Desc: 'Visualisation interactive du système solaire',
      card3Title: 'Projet 3',
      comingSoon: 'À venir',
      seeMoreBtn: 'Voir plus'
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
    
    // BIOS Menu page
    bios: {
      mainMenu: 'Menu Principal',
      advanced: 'Fonctionnalités Avancées',
      system: 'Configuration Système',
      exit: 'Options de Sortie',
      
      viewProjects: 'Voir Tous les Projets',
      aboutMe: 'En Savoir Plus sur Moi',
      viewCV: 'Voir le Curriculum Vitae',
      contactInfo: "Envoyer un Email ou Se Connecter",
      
      room3d: 'Modèle 3D Chambre',
      solar3d: 'Système Solaire',
      interactive: 'Visualisation Interactive',
      
      language: 'Langue',
      exitSetup: 'Quitter la Configuration',
      returnHome: "Retour à l'Accueil",
      
      helpTitle: "Aide à la Navigation",
      helpMove: 'Déplacer la Sélection',
      helpSelect: 'Sélectionner un Élément',
      helpExit: "Retour à l'Accueil",
      
      systemInfo: 'Informations Système',
      version: 'Version',
      date: 'Date',
      time: 'Heure',
      
      footerHelp: 'Aide',
      footerSave: 'Sauvegarder & Quitter',
      footerExit: 'Quitter'
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
        text: "Passionate about computer science since my first steps in coding, I see each project as an opportunity to tackle technical challenges and create clear, high-performing solutions. Whether developing an interactive game in Python, a management application with an intuitive interface, or an optimized network system, I enjoy structuring my ideas to achieve functional and elegant results."
      },
      aboutTitle: 'About',
      aboutText: "Passionate about computer science since my first steps in coding, I see each project as an opportunity to tackle technical challenges and create clear, high-performing solutions. Whether developing an interactive game in Python, a management application with an intuitive interface, or an optimized network system, I enjoy structuring my ideas to achieve functional and elegant results.",

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
      langsTitle: 'Programming Languages',
      // Individual skill lines for contact page (EN)
      skill1: 'Develop simple software applications',
      skill2: 'Understand and build algorithms',
      skill3: 'Install and configure a workstation',
      skill4: "Design and implement a database from a client's specifications",
      skill5: 'Identify business needs of clients and users',
      skill6: 'Identify aptitudes to work in a team',
      // Languages & tools labels (EN)
      lang_js: 'JavaScript',
      lang_py: 'Python',
      lang_cpp: 'C++ / C# / C',
      lang_php: 'PHP',
      lang_sql: 'SQL',
      tool_blender: 'Blender',
      tool_vscode: 'Visual Studio Code',
      tool_vs: 'Visual Studio 2022',
      tool_git: 'Git',
      tool_qt: 'Qt',
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
          'Coming soon'
        ]
      }
      ,
      experiencesTitle: 'Professional Experience',
      experience1: 'ASSISTANT Manager PHARMACIST - Pharmacie Malbec, Mauriac (15) - duration: 1 month',
      experience2: 'Coming soon'
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

  // Project 3 (RSL)
  project3Title: 'Local Social Network Project',
  project3Desc: 'This project aims to enable message exchange between two distinct machines and offers easy server hosting.',
  project3Lang: 'Python',
  project3Team: 'Worked in a team of 2',
  project3Date: 'March–May 2024',
  project3Features: 'Message exchange between two users/computers, message history, server hosting, works on local network only',
  project3Role: 'Message synchronization, UI, server management',
  project3Skills: 'Python, socket server, GUI, Python libraries',

      section3dTitle: 'My 3D Projects',
      section3dDesc: 'Select a project below to learn more or access it directly.',
      card1Title: 'Low poly room modeling',
      card1Desc: 'Interactive visualization of a modern room',
      card2Title: 'Solar system modeling',
      card2Desc: 'Interactive visualization of the solar system',
      card3Title: 'Project 3',
      comingSoon: 'Coming soon',
      seeMoreBtn: 'See more'
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
    
    // BIOS Menu page
    bios: {
      mainMenu: 'Main Menu',
      advanced: 'Advanced Features',
      system: 'System Configuration',
      exit: 'Exit Options',
      
      viewProjects: 'View All Projects',
      aboutMe: 'Learn More About Me',
      viewCV: 'View Curriculum Vitae',
      contactInfo: 'Send Email or Connect',
      
      room3d: '3D Room Model',
      solar3d: 'Solar System',
      interactive: 'Interactive Viewer',
      
      language: 'Language',
      exitSetup: 'Exit Setup',
      returnHome: 'Return to Home',
      
      helpTitle: 'Navigation Help',
      helpMove: 'Move Selection',
      helpSelect: 'Select Item',
      helpExit: 'Exit to Home',
      
      systemInfo: 'System Information',
      version: 'Version',
      date: 'Date',
      time: 'Time',
      
      footerHelp: 'Help',
      footerSave: 'Save & Exit',
      footerExit: 'Exit'
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
  },
  
  es: {
    // Navigation
    nav: {
      home: 'Inicio',
      projects: 'Proyectos',
      about: 'Acerca de',
      cv: 'CV',
      contact: 'Contacto'
    },
    
    // Index page
    index: {
      play: 'CLIC',
      press: 'Insertar disco',
      slpPrefix: 'SLP'
    },
    
    // Menu page
    menu: {
      title: 'Bienvenido a mi Portafolio',
      subtitle: 'Explora mis creaciones, proyectos de aplicaciones web, modelado 3D, programación y mucho más. Usa la navegación para descubrir mi universo creativo y técnico.',
      ctaProjects: 'Descubrir mis proyectos',
      
      projectsTitle: 'Mis Proyectos',
      projectsDesc: 'Desde el desarrollo de aplicaciones web hasta aplicaciones de escritorio, utilizo mis habilidades para dar vida a proyectos variados y ambiciosos. Cada proyecto es una oportunidad para aprender y superar mis límites técnicos y creativos.',
      ctaAllProjects: 'Ver todos los proyectos',
      
      aboutTitle: 'Acerca de Mí',
      aboutDesc: 'Apasionado por la tecnología y la creación digital, combino mis habilidades de programación para diseñar herramientas únicas. Mi objetivo es transformar ideas en logros concretos e innovadores, mientras comparto mi pasión con los demás.',
      ctaLearnMore: 'Saber más',
      
      cvTitle: 'Mi CV',
      cvDesc: 'Consulta mi trayectoria profesional, formación, habilidades técnicas y experiencias. También puedes descargar mi CV en formato PDF para conocer más sobre mi perfil y logros.',
      ctaViewCV: 'Consultar mi CV',
      
      contactTitle: 'Contáctame',
      contactDesc: '¿Tienes un proyecto en mente? ¿Una pregunta? ¿Una oportunidad de colaboración? No dudes en contactarme por correo electrónico o a través de otras plataformas. Siempre estoy abierto a intercambios y nuevas ideas. ¡Trabajemos juntos para crear algo excepcional!',
      ctaSendEmail: 'Enviar un correo',
      
      footer: {
        contact: 'Contacto',
        styleCredit: 'Estilo inspirado en el sitio web'
      }
    },
    
    // Contact page
    contact: {
      pageTitle: 'Contáctame',
      intro: 'No dudes en contactarme para cualquier pregunta, colaboración u oportunidad profesional.',
      
      title: 'Contáctame',
      subtitle: 'No dudes en contactarme a través de mis redes o por correo electrónico:',
      
      links: {
        linkedin: 'LinkedIn',
        github: 'GitHub',
        instagram: 'Instagram',
        email: 'Correo'
      },
      linkedin: 'LinkedIn',
      github: 'GitHub',
      instagram: 'Instagram',
      email: 'Correo',
      
      emailSection: {
        title: 'Contáctame por Correo',
        address: 'lucascontrerashodapp@gmail.com'
      },
      
      about: {
        title: 'Acerca de',
        text: 'Apasionado por la informática desde mis primeros pasos en la codificación, veo cada proyecto como una oportunidad para enfrentar desafíos técnicos y crear soluciones claras y de alto rendimiento. Ya sea desarrollando un juego interactivo en Python, una aplicación de gestión con una interfaz intuitiva o un sistema de red optimizado, disfruto estructurando mis ideas para lograr resultados funcionales y elegantes.'
      },
      aboutTitle: 'Acerca de',
      aboutText: 'Apasionado por la informática desde mis primeros pasos en la codificación, veo cada proyecto como una oportunidad para enfrentar desafíos técnicos y crear soluciones claras y de alto rendimiento. Ya sea desarrollando un juego interactivo en Python, una aplicación de gestión con una interfaz intuitiva o un sistema de red optimizado, disfruto estructurando mis ideas para lograr resultados funcionales y elegantes.',
      
      formations: {
        title: 'Formación',
        items: [
          'BUT Informática - IUT Clermont Auvergne',
          'Bachillerato Científico - Mención Excelente',
          'Certificaciones en desarrollo web y 3D'
        ]
      },
      formationsTitle: 'Formación',
      formation1: 'BUT Informática gráfica - Le Puy-en-Velay -- 2024-2027',
      formation2: 'Bachillerato General - Lycée Marmontel - Mauriac -- 2021-2024',
      
      skills: {
        title: 'Habilidades',
        items: [
          'HTML/CSS/JavaScript',
          'Python y C++',
          'Three.js y WebGL',
          'Blender y Modelado 3D',
          'Git y GitHub',
          'Diseño UI/UX'
        ]
      },
      skillsTitle: 'Habilidades',
      langsTitle: 'Lenguajes de programación',
      // Individual skill lines for contact page (ES)
      skill1: 'Desarrollar aplicaciones informáticas simples',
      skill2: 'Comprender y construir algoritmos',
      skill3: 'Instalar y configurar un puesto de trabajo',
      skill4: 'Diseñar e implementar una base de datos a partir del pliego de requisitos del cliente',
      skill5: 'Identificar las necesidades empresariales de clientes y usuarios',
      skill6: 'Identificar aptitudes para trabajar en equipo',
      // Languages & tools labels (ES)
      lang_js: 'JavaScript',
      lang_py: 'Python',
      lang_cpp: 'C++ / C# / C',
      lang_php: 'PHP',
      lang_sql: 'SQL',
      tool_blender: 'Blender',
      tool_vscode: 'Visual Studio Code',
      tool_vs: 'Visual Studio 2022',
      tool_git: 'Git',
      tool_qt: 'Qt',
      toolsTitle: 'Herramientas de diseño',
      
      interests: {
        title: 'Intereses',
        items: [
          {
            title: 'Desarrollo Web',
            desc: 'Creación de sitios interactivos y responsivos'
          },
          {
            title: 'Modelado 3D',
            desc: 'Diseño y animación de modelos 3D realistas'
          },
          {
            title: 'Gaming',
            desc: 'Apasionado de los videojuegos y el diseño de juegos'
          },
          {
            title: 'Tecnología',
            desc: 'Vigilancia tecnológica e innovación'
          }
        ]
      },
      interestsTitle: 'Intereses',
      interest1Title: 'Lector de novelas de aventuras',
      interest1Desc: 'Disfruto siguiendo la evolución de personajes que evolucionan en contextos sociales difíciles, como en Cyberpunk 2077: No Coincidence o Neuromante.',
      interest2Title: 'Fascinación por los universos postapocalípticos',
      interest2Desc: 'Juegos independientes, diseño de niveles e interacción; pasión por la lógica del juego y la optimización.',
      interest3Title: 'Fan de la caballería',
      interest3Desc: 'Siempre estoy presente en eventos medievales. Vistiendo armadura, causo sensación.',
      
      experiences: {
        title: 'Experiencia Profesional',
        items: [
          'ASISTENTE Gerente FARMACÉUTICO - Pharmacie Malbec, Mauriac (15) - duración: 1 mes',
          'Próximamente'
        ]
      },
      experiencesTitle: 'Experiencia Profesional',
      experience1: 'ASISTENTE Gerente FARMACÉUTICO - Pharmacie Malbec, Mauriac (15) - duración: 1 mes',
      experience2: 'Próximamente'
    },
    
    // CV page
    cv: {
      pageTitle: 'Mi Currículum Vitae',
      intro: 'Descubre mi trayectoria, habilidades y experiencias profesionales.',
      
      downloadBtn: 'Descargar mi CV',
      viewBtn: 'Abrir en nueva pestaña',
      
      fallback: 'El PDF no se puede mostrar en este dispositivo.',
      fallbackLink: 'Abrir el CV en pantalla completa',
      
      logoTitle: 'Mi CV',
      title: 'Mi Currículum Vitae',
      subtitle: 'Descubre mi trayectoria, habilidades y experiencias profesionales.',
      fallbackText: 'El PDF no se puede mostrar en este dispositivo.'
    },
    
    // Projects page
    projects: {
      pageTitle: 'Mis Proyectos',
      intro: 'Descubre mis logros en desarrollo web, modelado 3D y programación.',
      
      logoTitle: 'Mis Proyectos',
      title: 'Portafolio - Proyectos',
      descLabel: 'Descripción: ',
      langLabel: 'Lenguajes: ',
      teamLabel: 'Equipo: ',
      dateLabel: 'Fecha: ',
      featuresLabel: 'Funcionalidades: ',
      roleLabel: 'Mi rol: ',
      skillsLabel: 'Habilidades: ',
      downloadBtn: 'Descargar proyecto (.zip)',
      
      project1Title: 'RPG 2D',
      project1Desc: 'Este es un proyecto estudiantil realizado durante mis años de bachillerato. Es un juego de video en 2D tipo RPG con estilo Pokémon. El objetivo del juego es recorrer 3 niveles para eliminar al jefe final.',
      project1Lang: 'Python',
      project1Team: 'Trabajé en equipo de 2',
      project1Date: '2022-2023',
      project1Features: 'Movimientos, cambio de nivel, animación, diálogos con NPCs, combate, cambio de personaje',
      project1Role: 'Desarrollador',
      project1Skills: 'Python, uso de IDE (PyCharm), gestión de bibliotecas, uso de herramientas de diseño de niveles',
      
      project2Title: 'Proyecto de presentación',
      project2Desc: 'Un proyecto universitario cuyo objetivo era crear una aplicación web para calificar estudiantes',
      project2Lang: 'HTML, CSS, PHP, SQL',
      project2Team: '11 personas (grupos de clase)',
      project2Date: '10 de septiembre de 2025 - 3 de octubre de 2025',
      project2Features: 'gestión de estudiantes, calificaciones y proyectos',
      project2Role: 'Desarrollador back-end, realización de la parte 3.3 y del sistema de envío automático de correos',
      project2Skills: 'HTML, CSS, PHP, SQL, Git, trabajo con un gran equipo',

    // Project 3 (RSL)
    project3Title: 'Proyecto de Red Social Local',
    project3Desc: 'Este proyecto tiene como objetivo permitir el intercambio de mensajes entre dos máquinas distintas y ofrecer un alojamiento del servidor fácil.',
    project3Lang: 'Python',
    project3Team: 'Trabajo en equipo de 2',
    project3Date: 'marzo-mayo 2024',
    project3Features: 'Intercambio de mensajes entre 2 usuarios/ordenadores, historial de mensajes, alojamiento del servidor, funciona solo en red local',
    project3Role: 'Sincronización de mensajes, interfaz, gestión del servidor',
    project3Skills: 'Python, servidor socket, interfaz gráfica, bibliotecas Python',
      
      section3dTitle: 'Mis Proyectos 3D',
      section3dDesc: 'Selecciona un proyecto a continuación para saber más o acceder directamente.',
      card1Title: 'Modelado de habitación low poly',
      card1Desc: 'Visualización interactiva de una habitación moderna',
      card2Title: 'Modelado del sistema solar',
      card2Desc: 'Visualización interactiva del sistema solar',
      card3Title: 'Proyecto 3',
      comingSoon: 'Próximamente',
      seeMoreBtn: 'Ver más'
    },
    
    // 3D page
    scene3d: {
      pageTitle: 'Habitación Low Poly',
      desc: 'Modelado 3D - Usa el ratón para explorar',
      
      logo: 'Proyecto 3D',
      title: 'Habitación Low Poly',
      subtitle: 'Modelado 3D - Usa el ratón para explorar',
      
      controls: {
        rotate: 'Rotar',
        zoom: 'Zoom',
        pan: 'Mover'
      },
      
      loading: 'Cargando',
      error: 'Error de carga'
    },
    
    // BIOS Menu page
    bios: {
      mainMenu: 'Menú Principal',
      advanced: 'Funciones Avanzadas',
      system: 'Configuración del Sistema',
      exit: 'Opciones de Salida',
      
      viewProjects: 'Ver Todos los Proyectos',
      aboutMe: 'Saber Más Sobre Mí',
      viewCV: 'Ver Currículum Vitae',
      contactInfo: 'Enviar Email o Conectar',
      
      room3d: 'Modelo 3D Habitación',
      solar3d: 'Sistema Solar',
      interactive: 'Visor Interactivo',
      
      language: 'Idioma',
      exitSetup: 'Salir de la Configuración',
      returnHome: 'Volver al Inicio',
      
      helpTitle: 'Ayuda de Navegación',
      helpMove: 'Mover Selección',
      helpSelect: 'Seleccionar Elemento',
      helpExit: 'Salir al Inicio',
      
      systemInfo: 'Información del Sistema',
      version: 'Versión',
      date: 'Fecha',
      time: 'Hora',
      
      footerHelp: 'Ayuda',
      footerSave: 'Guardar y Salir',
      footerExit: 'Salir'
    },
    
    // Common
    common: {
      loading: 'Cargando...',
      error: 'Ocurrió un error',
      close: 'Cerrar',
      next: 'Siguiente',
      previous: 'Anterior',
      menu: 'Menú',
      portfolio: 'Mi portafolio'
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
    if (stored === 'en' || stored === 'fr' || stored === 'es') return stored;
    
    // Detect browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('fr')) return 'fr';
    if (browserLang.startsWith('es')) return 'es';
    return 'en';
  }
  
  // Get current language
  getLang() {
    return this.currentLang;
  }
  
  // Set language and save to localStorage
  setLang(lang) {
    if (lang !== 'en' && lang !== 'fr' && lang !== 'es') return;
    this.currentLang = lang;
    localStorage.setItem(this.storageKey, lang);
    this.notifyListeners();
  }
  
  // Get translation
  t(path) {
    const keys = path.split('.')
    let value = translations[this.currentLang]

    for (const key of keys) {
      if (value && typeof value === 'object') {
        value = value[key]
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
    <button data-lang="es" class="${lang === 'es' ? 'active' : ''}">ES</button>
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
