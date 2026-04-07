import { ProjectLayout, ProjectSidebar } from '../../../components/ProjectLayout';

// Import des images
import screenshot1 from '../../../assets/Proj-FDH/1.webp';
import screenshot2 from '../../../assets/Proj-FDH/2.webp';
import screenshot3 from '../../../assets/Proj-FDH/3.webp';
import screenshot4 from '../../../assets/Proj-FDH/4.webp';
import screenshot5 from '../../../assets/Proj-FDH/5.webp';

export const config = {
  id: 'FDH-project',
  name: 'Forge des héros',
  icon: '/icons/folder.webp',
  defaultWidth: 700,
  defaultHeight: 520,
};

const projectData = {
  title: "Forge de Héros",
  description: "Projet universitaire de deuxième année consistant à créer une application fullstack de création et gestion de personnages de jeu de rôle, inspirée de l'univers de Donjons & Dragons. Le projet se compose d'une application Symfony (fullstack + API REST) et d'une application React consommant cette API.",
  languages: ["PHP", "Symfony", "JavaScript", "React", "SQLite"],
  team: "Travaillé en équipe de 5",
  date: "mars 2026 - durée: 1 semaine",
  features: [
    "Inscription et connexion avec gestion des rôles (admin automatique pour le premier inscrit)",
    "CRUD des personnages avec système de stats Point Buy (27 points à répartir entre 8 et 15)",
    "Calcul automatique des points de vie (dé de vie + modificateur de Constitution)",
    "Upload d'un avatar pour chaque personnage",
    "Gestion des groupes d'aventure (Party) avec taille maximum",
    "Inscription / désinscription de personnages dans des groupes",
    "Recherche et filtres de personnages par nom, classe et race",
    "Filtre des groupes : complets ou avec places disponibles",
    "Interface d'administration : gestion des races, classes et compétences",
    "API REST publique sous /api/v1/* (personnages, races, classes, compétences, groupes)",
    "Application React avec liste, filtres, tri et détail des personnages",
    "Visualisation des stats (barres de progression ou radar chart)",
    "Navigation fluide entre personnages et groupes côté React",
    "Fixtures Doctrine pour les races, classes et compétences de base"
  ],
  role: "Configuration de la base de donnée, développeur backend",
  skills: [
    "PHP / Symfony",
    "React / Vite",
    "API REST",
    "SQLite / Doctrine",
    "Gestion de l'authentification",
    "Upload de fichiers",
    "Travail en équipe",
    "Versioning Git"
  ],
  steps: [
    "Analyse du sujet et modélisation des entités",
    "Mise en place de Symfony et des fixtures",
    "Développement du fullstack Symfony (auth, CRUD, filtres)",
    "Création de l'API REST",
    "Développement de l'application React",
    "Configuration CORS et intégration API",
    "Tests et finitions"
  ],
  images: [screenshot1, screenshot2, screenshot3, screenshot4, screenshot5],
  screenshotSections: [
    {
      title: "Backend Symfony",
      images: [screenshot1, screenshot2, screenshot3, screenshot4]
    },
    {
      title: "Frontend React",
      images: [ screenshot5]
    }
  ]
};

export const Component = ({ onOpenApp }) => {
  return (
    <ProjectLayout
      projectData={projectData}
      addressPath="C:\\Projets\\Forge-de-Heros"
      addressIcon="/icons/folder.webp"
      subtitle="Application fullstack de gestion de personnages D&D"
      headerIcon="/icons/folder.webp"
      onOpenApp={onOpenApp}
      sidebar={
        <ProjectSidebar
          projectData={projectData}
          githubUrl="https://github.com/Por-Tra/Forge-de-Heros"
          technologies={["PHP", "Symfony", "React", "Vite", "SQLite", "Doctrine"]}
        />
      }
    />
  );
};