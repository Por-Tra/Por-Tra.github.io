/**
 * Application: ProjectVapeur
 * 
 * Détails du projet Vapeur - Style Windows XP
 */
import { ProjectLayout, ProjectSidebar } from '../../../components/ProjectLayout';

// Import des images
import screenshot1 from '../../../assets/Proj-Vapeur/1.png';
import screenshot2 from '../../../assets/Proj-Vapeur/2.png';
import screenshot3 from '../../../assets/Proj-Vapeur/3.png';
import screenshot4 from '../../../assets/Proj-Vapeur/4.png';
import screenshot5 from '../../../assets/Proj-Vapeur/5.png';

export const config = {
  id: 'vapeur-project',
  name: 'Vapeur',
  icon: '/icons/folder.png',
  defaultWidth: 700,
  defaultHeight: 520,
};

const projectData = {
  title: "Vapeur",
  description: "Projet universitaire de deuxième année consistant à créer une petite application web ayant pour but d'être connectée à un serveur via express.js et une base de données avec prisma. L'application web est une copie biaisée de la fameuse application Steam.",
  languages: ["Javascript", "Express.js", "Prisma", "Handlebars"],
  team: "Travaillé en équipe de 4",
  date: "Décembre 2025",
  features: [
    "Ajout/suppression de jeux dans une bibliothèque personnelle",
    "Connexion à une base de données pour stocker les informations des utilisateurs",
    "Mise en avant de jeux choisis par l'administrateur"
  ],
  role: "Ajout d'un jeu dans la bibliothèque, connexion à la base de données, ajout d'un éditeur de jeu",
  skills: [
    "JavaScript",
    "Express.js",
    "Prisma",
    "Handlebars",
    "Travail en équipe",
    "Versioning Git"
  ],
  images: [screenshot1, screenshot2, screenshot3, screenshot4, screenshot5]
};

export const Component = ({ onOpenApp }) => {
  return (
    <ProjectLayout
      projectData={projectData}
      addressPath="C:\Projets\Vapeur"
      addressIcon="/icons/folder.png"
      subtitle="Application web connectée à une base de données"
      headerIcon="/icons/folder.png"
      onOpenApp={onOpenApp}
      sidebar={
        <ProjectSidebar
          projectData={projectData}
          githubUrl="https://github.com/Por-Tra/Projet-Vapeur"
          technologies={["Express.js", "Prisma", "Handlebars"]}
        />
      }
    />
  );
};

// Dépot git
// https://github.com/Por-Tra/Projet-Vapeur