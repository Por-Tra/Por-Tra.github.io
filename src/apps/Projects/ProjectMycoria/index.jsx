

/**
 * Application: ProjectMycoria
 * 
 * Détails du projet Mycoria - Style Windows XP
 */
import { ProjectLayout, ProjectSidebar } from '../../../components/ProjectLayout';

// Import des images
import screenshot1 from '../../../assets/Proj-Mycoria/1.png';
import screenshot2 from '../../../assets/Proj-Mycoria/2.png';
import screenshot3 from '../../../assets/Proj-Mycoria/3.png';
import screenshot4 from '../../../assets/Proj-Mycoria/4.png';
import screenshot5 from '../../../assets/Proj-Mycoria/5.png';
import screenshot6 from '../../../assets/Proj-Mycoria/6.png';
import screenshot7 from '../../../assets/Proj-Mycoria/7.png';
import screenshot8 from '../../../assets/Proj-Mycoria/8.png';
import screenshot9 from '../../../assets/Proj-Mycoria/9.png';
import screenshot10 from '../../../assets/Proj-Mycoria/10.png';
import screenshot11 from '../../../assets/Proj-Mycoria/11.png';
import screenshot12 from '../../../assets/Proj-Mycoria/12.png';

export const config = {
  id: 'mycoria-project',
  name: 'Mycoria',
  icon: '/icons/folder.png',
  defaultWidth: 700,
  defaultHeight: 520,
};

const projectData = {
  title: "Mycoria",
  description: "Projet universitaire de première année visant à développer un jeu vidéo en 3D à l'aide du moteur Unreal Engine. Le jeu se déroule dans le livradois Forez et met en scène un enquêteur explorant des environnements naturels et urbains pour résoudre comprendre qui empoisonne les populations local.",
  languages: ["Blueprints", "Unreal Engine"],
  team: "Travaillé en équipe de 7",
  date: "Mai - Juin 2025",
  features: [
    "Exploration d'environnements 3D réalistes",
    "Mécaniques de dialogue et d'enquête",
    "Système de quêtes et d'objectifs",
    "Ambiance sonore"
  ],
  role: "Gestion du projet, gestion de l'équipe, code blueprints",
  skills: [
    "Blueprints",
    "Unreal Engine",
    "Gestion de projet",
    "Gestion d'équipe",
    "Travail en équipe"
  ],
  steps: [
    "Organisation et planification",
    "Recherche, collecte et optimisation des ressources",
    "Conception des environnements et du gameplay",
    "Développement du jeu",
    "Réglages des bugs + finitions"
  ],
  images: [screenshot1, screenshot2, screenshot3, screenshot4, screenshot5, screenshot6, screenshot7, screenshot8, screenshot9, screenshot10, screenshot11, screenshot12],
  screenshotSections: [
    {
      title: "Environnements",
      images: [screenshot1, screenshot2, screenshot3, screenshot4, screenshot5]
    },
    {
      title: "UI",
      images: [screenshot6, screenshot7, screenshot8, screenshot9, screenshot10]
    },
    {
      title: "Conception dans Unreal Engine",
      images: [ screenshot11, screenshot12]
    }
  ]
};

export const Component = ({ onOpenApp }) => {
  return (
    <ProjectLayout
      projectData={projectData}
      addressPath="C:\\Projets\\Mycoria"
      addressIcon="/icons/signal.png"
      subtitle="Jeu vidéo 3D - Unreal Engine"
      headerIcon="/icons/signal.png"
      onOpenApp={onOpenApp}
      sidebar={
        <ProjectSidebar
          projectData={projectData}
          technologies={["Blueprints", "Unreal Engine 5"]}
        />
      }
    />
  );
};