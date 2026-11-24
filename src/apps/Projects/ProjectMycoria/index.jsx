

/**
 * Application: ProjectMycoria
 * 
 * Détails du projet Mycoria - Style Windows XP
 */
import { ProjectLayout, ProjectSidebar } from '../../../components/ProjectLayout';

// Import des images
import screenshot1 from '../../../assets/Proj-Mycoria/1.webp';
import screenshot2 from '../../../assets/Proj-Mycoria/2.webp';
import screenshot3 from '../../../assets/Proj-Mycoria/3.webp';
import screenshot4 from '../../../assets/Proj-Mycoria/4.webp';
import screenshot5 from '../../../assets/Proj-Mycoria/5.webp';
import screenshot6 from '../../../assets/Proj-Mycoria/6.webp';
import screenshot7 from '../../../assets/Proj-Mycoria/7.webp';
import screenshot8 from '../../../assets/Proj-Mycoria/8.webp';
import screenshot9 from '../../../assets/Proj-Mycoria/9.webp';
import screenshot10 from '../../../assets/Proj-Mycoria/10.webp';
import screenshot11 from '../../../assets/Proj-Mycoria/11.webp';
import screenshot12 from '../../../assets/Proj-Mycoria/12.webp';

export const config = {
  id: 'mycoria-project',
  name: 'Mycoria',
  icon: '/icons/folder.webp',
  defaultWidth: 700,
  defaultHeight: 520,
};

const projectData = {
  title: "Mycoria",
  description: {
    FR: "Projet universitaire de première année visant à développer un jeu vidéo en 3D à l'aide du moteur Unreal Engine. Le jeu se déroule dans le Livradois-Forez et met en scène un enquêteur explorant des environnements naturels et urbains pour comprendre qui empoisonne les populations locales.",
    EN: "First-year university project to develop a 3D video game with Unreal Engine. The game takes place in the Livradois-Forez region and follows an investigator exploring natural and urban environments to find out who is poisoning the local population.",
    ES: "Proyecto universitario de primer año cuyo objetivo es desarrollar un videojuego en 3D con el motor Unreal Engine. El juego transcurre en el Livradois-Forez y presenta a un investigador que explora entornos naturales y urbanos para descubrir quién está envenenando a la población local."
  },
  languages: ["Blueprints", "Unreal Engine"],
  team: { FR: "Travaillé en équipe de 7", EN: "Team of 7", ES: "Trabajo en equipo de 7" },
  date: { FR: "Mai - Juin 2025", EN: "May - June 2025", ES: "Mayo - Junio 2025" },
  features: [
    { FR: "Exploration d'environnements 3D réalistes", EN: "Exploration of realistic 3D environments", ES: "Exploración de entornos 3D realistas" },
    { FR: "Mécaniques de dialogue et d'enquête", EN: "Dialogue and investigation mechanics", ES: "Mecánicas de diálogo e investigación" },
    { FR: "Système de quêtes et d'objectifs", EN: "Quest and objective system", ES: "Sistema de misiones y objetivos" },
    { FR: "Ambiance sonore", EN: "Sound design", ES: "Ambientación sonora" }
  ],
  role: {
    FR: "Gestion du projet, gestion de l'équipe, code blueprints",
    EN: "Project management, team management, Blueprints scripting",
    ES: "Gestión del proyecto, gestión del equipo, programación en Blueprints"
  },
  skills: [
    "Blueprints",
    "Unreal Engine",
    { FR: "Gestion de projet", EN: "Project management", ES: "Gestión de proyectos" },
    { FR: "Gestion d'équipe", EN: "Team management", ES: "Gestión de equipos" },
    { FR: "Travail en équipe", EN: "Teamwork", ES: "Trabajo en equipo" }
  ],
  steps: [
    { FR: "Organisation et planification", EN: "Organization and planning", ES: "Organización y planificación" },
    { FR: "Recherche, collecte et optimisation des ressources", EN: "Research, collection and optimization of assets", ES: "Búsqueda, recopilación y optimización de recursos" },
    { FR: "Conception des environnements et du gameplay", EN: "Environment and gameplay design", ES: "Diseño de los entornos y de la jugabilidad" },
    { FR: "Développement du jeu", EN: "Game development", ES: "Desarrollo del juego" },
    { FR: "Réglages des bugs + finitions", EN: "Bug fixing + polishing", ES: "Corrección de errores + acabados" }
  ],
  images: [screenshot1, screenshot2, screenshot3, screenshot4, screenshot5, screenshot6, screenshot7, screenshot8, screenshot9, screenshot10, screenshot11, screenshot12],
  screenshotSections: [
    {
      title: { FR: "Environnements", EN: "Environments", ES: "Entornos" },
      images: [screenshot1, screenshot2, screenshot3, screenshot4, screenshot5]
    },
    {
      title: "UI",
      images: [screenshot6, screenshot7, screenshot8, screenshot9, screenshot10]
    },
    {
      title: { FR: "Conception dans Unreal Engine", EN: "Design in Unreal Engine", ES: "Diseño en Unreal Engine" },
      images: [ screenshot11, screenshot12]
    }
  ]
};

export const Component = ({ onOpenApp, currentLanguage }) => {
  return (
    <ProjectLayout
      projectData={projectData}
      addressPath={{ FR: "C:\\Projets\\Mycoria", EN: "C:\\Projects\\Mycoria", ES: "C:\\Proyectos\\Mycoria" }}
      addressIcon="/icons/signal.webp"
      subtitle={{ FR: "Jeu vidéo 3D - Unreal Engine", EN: "3D video game - Unreal Engine", ES: "Videojuego 3D - Unreal Engine" }}
      headerIcon="/icons/signal.webp"
      onOpenApp={onOpenApp}
      currentLanguage={currentLanguage}
      sidebar={
        <ProjectSidebar
          projectData={projectData}
          technologies={["Blueprints", "Unreal Engine 5"]}
          currentLanguage={currentLanguage}
        />
      }
    />
  );
};
