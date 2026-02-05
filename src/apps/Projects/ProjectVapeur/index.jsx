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
    "Afficher la liste des jeux mis en avant sur la page d'accueil",
    "Afficher la liste de tous les jeux sur une page dédiée",
    "Création d'un jeu",
    "Afficher le détail d'un jeu (avec ses infos, son genre et son éditeur)",
    "Modification d'un jeu (nom, description, date de sortie, genre, éditeur)",
    "Suppression d'un jeu",
    "Possibilité d'afficher le jeux sur la page d'accueil (mise en avant)",
    "Afficher la liste des genres sur une page dédiée",
    "Afficher la liste des jeux d'un genre sur une page dédiée",
    "Création d'un éditeur",
    "Afficher la liste des éditeurs sur une page dédiée",
    "Afficher la liste des jeux d'un éditeur sur une page dédiée",
    "Modification d'un éditeur",
    "Suppression d'un éditeur"
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
  steps: [
    "Analyse et cadrage",
    "Modelisation de la base",
    "Developpement des routes",
    "Integration UI",
    "Tests et finitions"
  ],
  images: [screenshot1, screenshot2, screenshot3, screenshot4, screenshot5],
  screenshotSections: [
    {
      title: "Pages et gestion",
      images: [screenshot1, screenshot2, screenshot3, screenshot4, screenshot5]
    }
  ]
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