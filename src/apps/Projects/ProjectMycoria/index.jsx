

/**
 * Application: ProjectMycoria
 * 
 * Détails du projet Mycoria - Style Windows XP
 */
import { ProjectLayout, ProjectSidebar } from '../../../components/ProjectLayout';

// Import des images
import screenshot1 from '../../../assets/Proj3/Capture d\'écran 2025-10-25 192040.png';
import screenshot2 from '../../../assets/Proj3/Capture d\'écran 2025-10-25 192048.png';
import screenshot3 from '../../../assets/Proj3/Capture d\'écran 2025-10-25 192101.png';

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
  images: [screenshot1, screenshot2, screenshot3]
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