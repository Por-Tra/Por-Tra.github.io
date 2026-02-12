/**
 * Données pour le Terminal
 */

export const SKILLS = [
  { name: 'JavaScript', level: 85, category: 'Langages' },
  { name: 'Python', level: 80, category: 'Langages' },
  { name: 'C++/C#/C', level: 75, category: 'Langages' },
  { name: 'PHP', level: 70, category: 'Langages' },
  { name: 'SQL', level: 75, category: 'Langages' },
  { name: 'HTML/CSS', level: 85, category: 'Web' },
  { name: 'React', level: 70, category: 'Web' },
  { name: 'Blender', level: 65, category: 'Outils' },
  { name: 'VS Code', level: 90, category: 'Outils' },
  { name: 'Visual Studio', level: 80, category: 'Outils' },
  { name: 'Git', level: 85, category: 'Outils' },
  { name: 'Qt', level: 60, category: 'Outils' },
];

export const PROJECTS = [
  {
    id: 'rpg',
    appId: 'project-rpg',
    name: 'RPG 2D - The Elder Scrolls',
    description: 'RPG 2D réalisé en Python',
    tech: ['Python', 'Pygame'],
    github: 'https://github.com/Por-Tra/ElderScrolls2D',
    learned: 'Game loops, Pathfinding, Gestion d\'état'
  },
  {
    id: 'soutenance',
    appId: 'project-soutenance',
    name: 'Gestionnaire de notes et d\'élèves',
    description: 'Logiciel web de gestion d\'élèves et de notes',
    tech: ['PHP', 'JavaScript', 'SQL'],
    github: 'https://github.com/Por-Tra/NotesManager',
    learned: 'Full-stack web, Gestion de base de données, UX utilisateur'
  },
  {
    id: 'reseau',
    appId: 'project-reseau',
    name: 'Réseau Social Local (RSL)',
    description: 'Messagerie qui fonctionne en réseau local',
    tech: ['Python', 'Socket Programming'],
    github: 'https://github.com/Por-Tra/RSL',
    learned: 'Réseaux, protocoles, synchronisation distribuée'
  },
  {
    id: 'mycoria',
    appId: 'mycoria-project',
    name: 'Mycoria',
    description: 'Jeu vidéo réalisé sur UnrealEngine',
    tech: ['C++', 'Unreal Engine'],
    github: 'https://github.com/Por-Tra/Mycoria',
    learned: 'Game development, C++ avancé, Architecture large-scale'
  },
  {
    id: 'vapeur',
    appId: 'vapeur-project',
    name: 'Vapeur',
    description: 'Réplique de l\'application Steam',
    tech: ['Node.js', 'Prisma', 'Handlebars', 'SQL'],
    github: 'https://github.com/Por-Tra/Vapeur',
    learned: 'Architecture web complète, ORM, Templating'
  }
];

export const MAN_PAGES = {
  'about': 'Affiche un résumé à propos de Lucas.\nÉtudiant en BUT Informatique Graphique passionné par les défis de développement variés.',
  'projects': 'Liste tous les projets réalisés.\n\nUtilisez "man <nom-projet>" pour plus de détails:\nman mycoria, man rsl, man elder-scrolls-2d, man notes-manager, man vapeur',
  'date': 'Affiche la date et l\'heure actuelle.',
  'pic': 'Affiche un portrait ASCII art.',
  'skills': 'Affiche les compétences techniques avec barres de progression.',
  'whoami': 'Affiche les informations utilisateur.',
  'open': 'Ouvre un projet ou une URL.\n\nUsage: open <project-id>\nExemples: open mycoria, open rsl',
  'theme': 'Modifie le thème de couleur du terminal.\n\nUsage: theme <nom>\nThèmes disponibles: dark (par défaut), green, amber',
  'help': 'Affiche cette aide.',
  'clear': 'Efface l\'écran du terminal.',
  'history': 'Affiche l\'historique des commandes.',
  'sudo': 'Tentative de privilèges administrateur (échoue intentionnellement).',
  'coffee': 'Compile la motivation',
};

export const EASTER_EGGS = {
  'sudo rm -rf /': 'Permission denied. Nice try ;)',
  'coffee': 'Compiling motivation...\n✓ Motivation compiled successfully!',
  'lsb': 'Je sais que vous cherchez "lsb_release -a" pour les infos système, mais je ne suis pas une distribution Linux malheureuse.',
  'whoami?': 'Pas de point d\'interrogation, c\'est whoami. ¬_¬',
  'date.now()': 'Date actuelle : ' + new Date().toLocaleString() + '\n Tu aurais pu regarder en bas de l\'écran aussi...',
  'caca' :  'Très mature tout ça ...',
  'pipi' : 'Toujours aussi mature ...',
  'prout' : 'Bon, on va arrêter là hein ...',
  

};

export const getSkillsDisplay = () => {
  const grouped = {};
  SKILLS.forEach(skill => {
    if (!grouped[skill.category]) grouped[skill.category] = [];
    grouped[skill.category].push(skill);
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

export const getProjectDetails = (projectId) => {
  const project = PROJECTS.find(p => p.id === projectId);
  if (!project) return null;

  return `
Project: ${project.name}
Description: ${project.description}
Technologies: ${project.tech.join(', ')}
GitHub: ${project.github}
Learned: ${project.learned}
  `;
};
