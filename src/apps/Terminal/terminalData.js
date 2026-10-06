/**
 * Données pour le Terminal
 */
import { t, getLocale } from '../../i18n/text';

const CATEGORIES = {
  languages: { FR: 'Langages', EN: 'Languages', ES: 'Lenguajes' },
  web: { FR: 'Web', EN: 'Web', ES: 'Web' },
  tools: { FR: 'Outils', EN: 'Tools', ES: 'Herramientas' },
};

export const SKILLS = [
  { name: 'JavaScript', level: 85, category: CATEGORIES.languages },
  { name: 'Python', level: 80, category: CATEGORIES.languages },
  { name: 'C++/C#/C', level: 75, category: CATEGORIES.languages },
  { name: 'PHP', level: 70, category: CATEGORIES.languages },
  { name: 'SQL', level: 75, category: CATEGORIES.languages },
  { name: 'HTML/CSS', level: 85, category: CATEGORIES.web },
  { name: 'React', level: 70, category: CATEGORIES.web },
  { name: 'Blender', level: 65, category: CATEGORIES.tools },
  { name: 'VS Code', level: 90, category: CATEGORIES.tools },
  { name: 'Visual Studio', level: 80, category: CATEGORIES.tools },
  { name: 'Git', level: 85, category: CATEGORIES.tools },
  { name: 'Qt', level: 60, category: CATEGORIES.tools },
];

export const PROJECTS = [
  {
    id: 'rpg',
    appId: 'project-rpg',
    name: 'RPG 2D - The Elder Scrolls',
    description: { FR: 'RPG 2D réalisé en Python', EN: '2D RPG made with Python', ES: 'RPG 2D realizado en Python' },
    tech: ['Python', 'Pygame'],
    github: 'https://github.com/Por-Tra/ElderScrolls2D',
    learned: {
      FR: 'Game loops, Pathfinding, Gestion d\'état',
      EN: 'Game loops, Pathfinding, State management',
      ES: 'Game loops, Pathfinding, Gestión de estado',
    }
  },
  {
    id: 'soutenance',
    appId: 'project-soutenance',
    name: { FR: 'Gestionnaire de notes et d\'élèves', EN: 'Grades and students manager', ES: 'Gestor de notas y alumnos' },
    description: {
      FR: 'Logiciel web de gestion d\'élèves et de notes',
      EN: 'Web software for managing students and grades',
      ES: 'Software web de gestión de alumnos y notas',
    },
    tech: ['PHP', 'JavaScript', 'SQL'],
    github: 'https://github.com/Por-Tra/NotesManager',
    learned: {
      FR: 'Full-stack web, Gestion de base de données, UX utilisateur',
      EN: 'Full-stack web, Database management, User experience',
      ES: 'Full-stack web, Gestión de bases de datos, Experiencia de usuario',
    }
  },
  {
    id: 'reseau',
    appId: 'project-reseau',
    name: { FR: 'Réseau Social Local (RSL)', EN: 'Local Social Network (RSL)', ES: 'Red Social Local (RSL)' },
    description: {
      FR: 'Messagerie qui fonctionne en réseau local',
      EN: 'Messaging app that runs on a local network',
      ES: 'Mensajería que funciona en red local',
    },
    tech: ['Python', 'Socket Programming'],
    github: 'https://github.com/Por-Tra/RSL',
    learned: {
      FR: 'Réseaux, protocoles, synchronisation distribuée',
      EN: 'Networking, protocols, distributed synchronization',
      ES: 'Redes, protocolos, sincronización distribuida',
    }
  },
  {
    id: 'mycoria',
    appId: 'mycoria-project',
    name: 'Mycoria',
    description: {
      FR: 'Jeu vidéo réalisé sur Unreal Engine',
      EN: 'Video game made with Unreal Engine',
      ES: 'Videojuego realizado con Unreal Engine',
    },
    tech: ['C++', 'Unreal Engine'],
    github: 'https://github.com/Por-Tra/Mycoria',
    learned: {
      FR: 'Game development, C++ avancé, Architecture large-scale',
      EN: 'Game development, Advanced C++, Large-scale architecture',
      ES: 'Desarrollo de videojuegos, C++ avanzado, Arquitectura a gran escala',
    }
  },
  {
    id: 'vapeur',
    appId: 'vapeur-project',
    name: 'Vapeur',
    description: {
      FR: 'Réplique de l\'application Steam',
      EN: 'Replica of the Steam application',
      ES: 'Réplica de la aplicación Steam',
    },
    tech: ['Node.js', 'Prisma', 'Handlebars', 'SQL'],
    github: 'https://github.com/Por-Tra/Vapeur',
    learned: {
      FR: 'Architecture web complète, ORM, Templating',
      EN: 'Full web architecture, ORM, Templating',
      ES: 'Arquitectura web completa, ORM, Templating',
    }
  }
];

export const MAN_PAGES = {
  'about': {
    FR: 'Affiche un résumé à propos de Lucas.\nÉtudiant en BUT Informatique Graphique passionné par les défis de développement variés.',
    EN: 'Displays a short summary about Lucas.\nGraphic Computing student passionate about all kinds of development challenges.',
    ES: 'Muestra un resumen sobre Lucas.\nEstudiante de Informática Gráfica apasionado por los desafíos de desarrollo variados.',
  },
  'projects': {
    FR: 'Liste tous les projets réalisés.\n\nUtilisez "man <nom-projet>" pour plus de détails:\nman rpg, man soutenance, man reseau, man mycoria, man vapeur',
    EN: 'Lists all completed projects.\n\nUse "man <project-name>" for more details:\nman rpg, man soutenance, man reseau, man mycoria, man vapeur',
    ES: 'Lista todos los proyectos realizados.\n\nUsa "man <nombre-proyecto>" para más detalles:\nman rpg, man soutenance, man reseau, man mycoria, man vapeur',
  },
  'date': {
    FR: 'Affiche la date et l\'heure actuelle.',
    EN: 'Displays the current date and time.',
    ES: 'Muestra la fecha y la hora actuales.',
  },
  'pic': {
    FR: 'Affiche un portrait ASCII art.',
    EN: 'Displays an ASCII art portrait.',
    ES: 'Muestra un retrato en arte ASCII.',
  },
  'skills': {
    FR: 'Affiche les compétences techniques avec barres de progression.',
    EN: 'Displays technical skills with progress bars.',
    ES: 'Muestra las habilidades técnicas con barras de progreso.',
  },
  'whoami': {
    FR: 'Affiche les informations utilisateur.',
    EN: 'Displays user information.',
    ES: 'Muestra la información del usuario.',
  },
  'open': {
    FR: 'Ouvre un projet.\n\nUsage: open <project-id>\nExemples: open mycoria, open reseau',
    EN: 'Opens a project.\n\nUsage: open <project-id>\nExamples: open mycoria, open reseau',
    ES: 'Abre un proyecto.\n\nUso: open <project-id>\nEjemplos: open mycoria, open reseau',
  },
  'theme': {
    FR: 'Modifie le thème de couleur du terminal.\n\nUsage: theme <nom>\nThèmes disponibles: classic (par défaut), dark, green, amber',
    EN: 'Changes the terminal color theme.\n\nUsage: theme <name>\nAvailable themes: classic (default), dark, green, amber',
    ES: 'Cambia el tema de color del terminal.\n\nUso: theme <nombre>\nTemas disponibles: classic (por defecto), dark, green, amber',
  },
  'help': {
    FR: 'Affiche l\'aide.',
    EN: 'Displays the help.',
    ES: 'Muestra la ayuda.',
  },
  'clear': {
    FR: 'Efface l\'écran du terminal.',
    EN: 'Clears the terminal screen.',
    ES: 'Limpia la pantalla del terminal.',
  },
  'history': {
    FR: 'Affiche l\'historique des commandes.',
    EN: 'Displays the command history.',
    ES: 'Muestra el historial de comandos.',
  },
  'sudo': {
    FR: 'Tentative de privilèges administrateur (échoue intentionnellement).',
    EN: 'Attempts to get administrator privileges (fails on purpose).',
    ES: 'Intento de obtener privilegios de administrador (falla a propósito).',
  },
  'coffee': {
    FR: 'Compile la motivation',
    EN: 'Compiles motivation',
    ES: 'Compila la motivación',
  },
};

export const EASTER_EGGS = {
  'sudo rm -rf /': 'Permission denied. Nice try ;)',
  'coffee': 'Compiling motivation...\n✓ Motivation compiled successfully!',
  'lsb': {
    FR: 'Je sais que vous cherchez "lsb_release -a" pour les infos système, mais je ne suis pas une distribution Linux malheureuse.',
    EN: 'I know you\'re looking for "lsb_release -a" to get system info, but I\'m not some unfortunate Linux distribution.',
    ES: 'Sé que buscas "lsb_release -a" para ver la información del sistema, pero no soy una distribución Linux desafortunada.',
  },
  'whoami?': {
    FR: 'Pas de point d\'interrogation, c\'est whoami. ¬_¬',
    EN: 'No question mark, it\'s whoami. ¬_¬',
    ES: 'Sin signo de interrogación, es whoami. ¬_¬',
  },
  'date.now()': (lang) => t({
    FR: 'Date actuelle : ',
    EN: 'Current date: ',
    ES: 'Fecha actual: ',
  }, lang) + new Date().toLocaleString(getLocale(lang)) + t({
    FR: '\n Tu aurais pu regarder en bas de l\'écran aussi...',
    EN: '\n You could have just looked at the bottom of the screen...',
    ES: '\n También podrías haber mirado abajo de la pantalla...',
  }, lang),
};

export const getEasterEgg = (input, lang) => {
  const egg = EASTER_EGGS[input];
  if (!egg) return null;
  return typeof egg === 'function' ? egg(lang) : t(egg, lang);
};

const HELP_SECTIONS = [
  {
    title: { FR: 'BASIQUES', EN: 'BASICS', ES: 'BÁSICOS' },
    rows: [
      ['help', { FR: 'Affiche cette aide', EN: 'Shows this help', ES: 'Muestra esta ayuda' }],
      ['clear', { FR: 'Efface l\'écran', EN: 'Clears the screen', ES: 'Limpia la pantalla' }],
      ['history', { FR: 'Historique des commandes', EN: 'Command history', ES: 'Historial de comandos' }],
    ],
  },
  {
    title: { FR: 'INFORMATIONS', EN: 'INFORMATION', ES: 'INFORMACIÓN' },
    rows: [
      ['whoami', { FR: 'Infos sur Lucas', EN: 'Info about Lucas', ES: 'Info sobre Lucas' }],
      ['about', { FR: 'À propos', EN: 'About', ES: 'Acerca de' }],
      ['date', { FR: 'Date et heure', EN: 'Date and time', ES: 'Fecha y hora' }],
      ['pic', { FR: 'Portrait ASCII art', EN: 'ASCII art portrait', ES: 'Retrato en arte ASCII' }],
    ],
  },
  {
    title: { FR: 'COMPÉTENCES & PROJETS', EN: 'SKILLS & PROJECTS', ES: 'HABILIDADES Y PROYECTOS' },
    rows: [
      ['skills', { FR: 'Affiche les skills', EN: 'Shows skills', ES: 'Muestra las habilidades' }],
      ['projects', { FR: 'Liste les projets', EN: 'Lists projects', ES: 'Lista los proyectos' }],
      [{ FR: 'open <projet>', EN: 'open <project>', ES: 'open <proyecto>' }, { FR: 'Ouvre un projet', EN: 'Opens a project', ES: 'Abre un proyecto' }],
      [{ FR: 'man <commande>', EN: 'man <command>', ES: 'man <comando>' }, { FR: 'Détails d\'une commande', EN: 'Command details', ES: 'Detalles de un comando' }],
    ],
  },
  {
    title: { FR: 'PERSONNALISATION', EN: 'CUSTOMIZATION', ES: 'PERSONALIZACIÓN' },
    rows: [
      [{ FR: 'theme <nom>', EN: 'theme <name>', ES: 'theme <nombre>' }, { FR: 'Thème (classic/dark...)', EN: 'Theme (classic/dark...)', ES: 'Tema (classic/dark...)' }],
    ],
  },
];

export const getHelpText = (lang) => {
  const header = t({ FR: 'LISTE DES COMMANDES', EN: 'COMMAND LIST', ES: 'LISTA DE COMANDOS' }, lang);
  const tip = t({
    FR: 'Astuce: Tab pour autocomplétion, ↑/↓ pour historique',
    EN: 'Tip: Tab for autocompletion, ↑/↓ for history',
    ES: 'Consejo: Tab para autocompletar, ↑/↓ para el historial',
  }, lang);

  const sections = HELP_SECTIONS.map((section) => ({
    title: t(section.title, lang),
    rows: section.rows.map(([cmd, desc]) => [t(cmd, lang), t(desc, lang)]),
  }));

  const leftWidth = Math.max(...sections.flatMap((s) => [s.title, ...s.rows.map((r) => r[0])]).map((v) => v.length)) + 1;
  const rightWidth = Math.max(...sections.flatMap((s) => s.rows.map((r) => r[1].length))) + 1;
  const innerWidth = leftWidth + rightWidth + 3;

  const line = (left, mid, right) => `${left}${'─'.repeat(leftWidth + 1)}${mid}${'─'.repeat(rightWidth + 1)}${right}`;
  const row = (a, b) => `│ ${a.padEnd(leftWidth)}│ ${b.padEnd(rightWidth)}│`;

  const lines = [
    `┌${'─'.repeat(innerWidth)}┐`,
    `│ ${header.padEnd(innerWidth - 1)}│`,
    line('├', '┬', '┤'),
  ];
  sections.forEach((section, index) => {
    if (index > 0) lines.push(line('├', '┼', '┤'));
    lines.push(row(section.title, ''));
    section.rows.forEach(([cmd, desc]) => lines.push(row(cmd, desc)));
  });
  lines.push(line('└', '┴', '┘'));

  return `${lines.join('\n')}\n\n${tip}`;
};

export const getSkillsDisplay = (lang) => {
  const grouped = {};
  SKILLS.forEach(skill => {
    const category = t(skill.category, lang);
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(skill);
  });

  let result = '';
  Object.entries(grouped).forEach(([category, skills]) => {
    result += `\n${category}:\n`;
    skills.forEach(skill => {
      const barLength = 20;
      const filledLength = Math.round((skill.level / 100) * barLength);
      const bar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);
      result += `  ${skill.name.padEnd(15)} ${bar} ${skill.level}%\n`;
    });
  });
  return result;
};

export const getProjectDetails = (projectId, lang) => {
  const project = PROJECTS.find(p => p.id === projectId);
  if (!project) return null;

  const labels = {
    project: { FR: 'Projet', EN: 'Project', ES: 'Proyecto' },
    description: { FR: 'Description', EN: 'Description', ES: 'Descripción' },
    technologies: { FR: 'Technologies', EN: 'Technologies', ES: 'Tecnologías' },
    learned: { FR: 'Appris', EN: 'Learned', ES: 'Aprendido' },
  };

  return `
${t(labels.project, lang)}: ${t(project.name, lang)}
${t(labels.description, lang)}: ${t(project.description, lang)}
${t(labels.technologies, lang)}: ${project.tech.join(', ')}
GitHub: ${project.github}
${t(labels.learned, lang)}: ${t(project.learned, lang)}
  `;
};
