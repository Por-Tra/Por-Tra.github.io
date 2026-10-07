/**
 * Application: ProjectVapeur
 * 
 * Détails du projet Vapeur - Style Windows XP
 */
import { ProjectLayout, ProjectSidebar } from '../../../components/ProjectLayout';

// Import des images
import screenshot1 from '../../../assets/Proj-Vapeur/1.webp';
import screenshot2 from '../../../assets/Proj-Vapeur/2.webp';
import screenshot3 from '../../../assets/Proj-Vapeur/3.webp';
import screenshot4 from '../../../assets/Proj-Vapeur/4.webp';
import screenshot5 from '../../../assets/Proj-Vapeur/5.webp';

export const config = {
  id: 'vapeur-project',
  name: 'Vapeur',
  icon: '/icons/folder.webp',
  defaultWidth: 700,
  defaultHeight: 520,
};

export const projectData = {
  title: "Vapeur",
  description: {
    FR: "Projet universitaire de deuxième année consistant à créer une petite application web ayant pour but d'être connectée à un serveur via Express.js et une base de données avec Prisma. L'application web est une copie détournée de la fameuse application Steam.",
    EN: "Second-year university project to build a small web application connected to a server with Express.js and to a database with Prisma. The web app is a parody of the famous Steam application.",
    ES: "Proyecto universitario de segundo año que consiste en crear una pequeña aplicación web conectada a un servidor mediante Express.js y a una base de datos con Prisma. La aplicación web es una parodia de la famosa aplicación Steam."
  },
  languages: ["Javascript", "Express.js", "Prisma", "Handlebars"],
  team: { FR: "Travaillé en équipe de 4", EN: "Team of 4", ES: "Trabajo en equipo de 4" },
  date: { FR: "Décembre 2025", EN: "December 2025", ES: "Diciembre 2025" },
  features: [
    { FR: "Afficher la liste des jeux mis en avant sur la page d'accueil", EN: "Display featured games on the home page", ES: "Mostrar la lista de juegos destacados en la página de inicio" },
    { FR: "Afficher la liste de tous les jeux sur une page dédiée", EN: "Display all games on a dedicated page", ES: "Mostrar la lista de todos los juegos en una página dedicada" },
    { FR: "Création d'un jeu", EN: "Create a game", ES: "Creación de un juego" },
    { FR: "Afficher le détail d'un jeu (avec ses infos, son genre et son éditeur)", EN: "Display a game's details (info, genre and publisher)", ES: "Mostrar el detalle de un juego (información, género y editor)" },
    { FR: "Modification d'un jeu (nom, description, date de sortie, genre, éditeur)", EN: "Edit a game (name, description, release date, genre, publisher)", ES: "Modificación de un juego (nombre, descripción, fecha de lanzamiento, género, editor)" },
    { FR: "Suppression d'un jeu", EN: "Delete a game", ES: "Eliminación de un juego" },
    { FR: "Possibilité d'afficher le jeu sur la page d'accueil (mise en avant)", EN: "Option to feature a game on the home page", ES: "Posibilidad de destacar el juego en la página de inicio" },
    { FR: "Afficher la liste des genres sur une page dédiée", EN: "Display all genres on a dedicated page", ES: "Mostrar la lista de géneros en una página dedicada" },
    { FR: "Afficher la liste des jeux d'un genre sur une page dédiée", EN: "Display the games of a genre on a dedicated page", ES: "Mostrar los juegos de un género en una página dedicada" },
    { FR: "Création d'un éditeur", EN: "Create a publisher", ES: "Creación de un editor" },
    { FR: "Afficher la liste des éditeurs sur une page dédiée", EN: "Display all publishers on a dedicated page", ES: "Mostrar la lista de editores en una página dedicada" },
    { FR: "Afficher la liste des jeux d'un éditeur sur une page dédiée", EN: "Display a publisher's games on a dedicated page", ES: "Mostrar los juegos de un editor en una página dedicada" },
    { FR: "Modification d'un éditeur", EN: "Edit a publisher", ES: "Modificación de un editor" },
    { FR: "Suppression d'un éditeur", EN: "Delete a publisher", ES: "Eliminación de un editor" }
  ],
  role: {
    FR: "Ajout d'un jeu dans la bibliothèque, connexion à la base de données, ajout d'un éditeur de jeu",
    EN: "Adding games to the library, database connection, adding game publishers",
    ES: "Añadir juegos a la biblioteca, conexión a la base de datos, añadir editores de juegos"
  },
  skills: [
    "JavaScript",
    "Express.js",
    "Prisma",
    "Handlebars",
    { FR: "Travail en équipe", EN: "Teamwork", ES: "Trabajo en equipo" },
    { FR: "Versioning Git", EN: "Git versioning", ES: "Control de versiones con Git" }
  ],
  steps: [
    { FR: "Analyse et cadrage", EN: "Analysis and scoping", ES: "Análisis y definición del alcance" },
    { FR: "Modélisation de la base", EN: "Database modeling", ES: "Modelado de la base de datos" },
    { FR: "Développement des routes", EN: "Route development", ES: "Desarrollo de las rutas" },
    { FR: "Intégration UI", EN: "UI integration", ES: "Integración de la interfaz" },
    { FR: "Tests et finitions", EN: "Testing and polishing", ES: "Pruebas y acabados" }
  ],
  images: [screenshot1, screenshot2, screenshot3, screenshot4, screenshot5],
  screenshotSections: [
    {
      title: { FR: "Pages et gestion", EN: "Pages and management", ES: "Páginas y gestión" },
      images: [screenshot1, screenshot2, screenshot3, screenshot4, screenshot5]
    }
  ]
};

export const Component = ({ onOpenApp, currentLanguage }) => {
  return (
    <ProjectLayout
      projectData={projectData}
      addressPath={{ FR: "C:\\Projets\\Vapeur", EN: "C:\\Projects\\Vapeur", ES: "C:\\Proyectos\\Vapeur" }}
      addressIcon="/icons/folder.webp"
      subtitle={{
        FR: "Application web connectée à une base de données",
        EN: "Web application connected to a database",
        ES: "Aplicación web conectada a una base de datos"
      }}
      headerIcon="/icons/folder.webp"
      onOpenApp={onOpenApp}
      currentLanguage={currentLanguage}
      sidebar={
        <ProjectSidebar
          projectData={projectData}
          githubUrl="https://github.com/Por-Tra/Projet-Vapeur"
          technologies={["Express.js", "Prisma", "Handlebars"]}
          currentLanguage={currentLanguage}
        />
      }
    />
  );
};
