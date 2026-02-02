/**
 * Application: ProjectRPG
 * 
 * Détails du projet RPG 2D - Style Windows XP
 */
import { ProjectLayout, ProjectSidebar } from '../../../components/ProjectLayout';

// Import des images
import screenshot1 from '../../../assets/Proj1/Capture d\'écran 2025-05-14 100424.png';
import screenshot2 from '../../../assets/Proj1/Capture d\'écran 2025-05-30 165033.png';
import screenshot3 from '../../../assets/Proj1/image.png';

// Import du fichier de téléchargement
import projectZip from '../../../assets/RPG.zip';

export const config = {
  id: 'project-rpg',
  name: 'RPG 2D',
  icon: '/icons/folder.png',
  defaultWidth: 700,
  defaultHeight: 520,
};

const projectData = {
  title: "RPG 2D",
  description: "Ce projet est un projet étudiant qui a été réalisé pendant mes années de lycée. Il s'agit d'un jeu vidéo en 2D de type RPG dans un style Pokemon. Le but du jeu est de parcourir 3 niveaux afin d'éliminer le boss de fin.",
  languages: ["Python"],
  team: "Travaillé en équipe de 2",
  date: "2022-2023",
  features: [
    "Déplacements",
    "Changement de niveau",
    "Animation",
    "Dialogues avec NPC",
    "Combat",
    "Changement de personnage"
  ],
  role: "Développeur",
  skills: [
    "Python",
    "Utilisation d'un IDE (PyCharm)",
    "Gestion de bibliothèque",
    "Utilisation d'outil de conception de niveau"
  ],
  images: [screenshot1, screenshot2, screenshot3]
};

export const Component = ({ onOpenApp }) => {
  return (
    <ProjectLayout
      projectData={projectData}
      addressPath={`C:\\Projets\\${projectData.title}`}
      addressIcon="/icons/folder.png"
      subtitle="Projet de jeu vidéo"
      headerIcon="/icons/folder.png"
      onOpenApp={onOpenApp}
      sidebar={
        <ProjectSidebar
          projectData={projectData}
          downloadFile={projectZip}
          downloadName="RPG.zip"
          githubUrl="https://github.com/Por-Tra"
          technologies={["Python", "Pygame"]}
        />
      }
    />
  );
};
