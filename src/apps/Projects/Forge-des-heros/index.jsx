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
  description: {
    FR: "Projet universitaire de deuxième année consistant à créer une application fullstack de création et gestion de personnages de jeu de rôle, inspirée de l'univers de Donjons & Dragons. Le projet se compose d'une application Symfony (fullstack + API REST) et d'une application React consommant cette API.",
    EN: "Second-year university project to build a fullstack application for creating and managing role-playing game characters, inspired by the Dungeons & Dragons universe. The project consists of a Symfony application (fullstack + REST API) and a React application consuming that API.",
    ES: "Proyecto universitario de segundo año que consiste en crear una aplicación fullstack para crear y gestionar personajes de juegos de rol, inspirada en el universo de Dungeons & Dragons. El proyecto se compone de una aplicación Symfony (fullstack + API REST) y de una aplicación React que consume dicha API."
  },
  languages: ["PHP", "Symfony", "JavaScript", "React", "SQLite"],
  team: { FR: "Travaillé en équipe de 5", EN: "Team of 5", ES: "Trabajo en equipo de 5" },
  date: { FR: "mars 2026 - durée: 1 semaine", EN: "March 2026 - duration: 1 week", ES: "marzo 2026 - duración: 1 semana" },
  features: [
    { FR: "Inscription et connexion avec gestion des rôles (admin automatique pour le premier inscrit)", EN: "Sign-up and login with role management (first registered user becomes admin automatically)", ES: "Registro e inicio de sesión con gestión de roles (el primer usuario registrado es admin automáticamente)" },
    { FR: "CRUD des personnages avec système de stats Point Buy (27 points à répartir entre 8 et 15)", EN: "Character CRUD with a Point Buy stat system (27 points to spread between 8 and 15)", ES: "CRUD de personajes con sistema de estadísticas Point Buy (27 puntos a repartir entre 8 y 15)" },
    { FR: "Calcul automatique des points de vie (dé de vie + modificateur de Constitution)", EN: "Automatic hit point calculation (hit die + Constitution modifier)", ES: "Cálculo automático de los puntos de vida (dado de golpe + modificador de Constitución)" },
    { FR: "Upload d'un avatar pour chaque personnage", EN: "Avatar upload for each character", ES: "Subida de un avatar para cada personaje" },
    { FR: "Gestion des groupes d'aventure (Party) avec taille maximum", EN: "Adventure party management with a maximum size", ES: "Gestión de grupos de aventura (Party) con tamaño máximo" },
    { FR: "Inscription / désinscription de personnages dans des groupes", EN: "Adding / removing characters from parties", ES: "Inscripción / baja de personajes en los grupos" },
    { FR: "Recherche et filtres de personnages par nom, classe et race", EN: "Character search and filters by name, class and race", ES: "Búsqueda y filtros de personajes por nombre, clase y raza" },
    { FR: "Filtre des groupes : complets ou avec places disponibles", EN: "Party filter: full or with open slots", ES: "Filtro de grupos: completos o con plazas disponibles" },
    { FR: "Interface d'administration : gestion des races, classes et compétences", EN: "Admin interface: management of races, classes and skills", ES: "Interfaz de administración: gestión de razas, clases y habilidades" },
    { FR: "API REST publique sous /api/v1/* (personnages, races, classes, compétences, groupes)", EN: "Public REST API under /api/v1/* (characters, races, classes, skills, parties)", ES: "API REST pública en /api/v1/* (personajes, razas, clases, habilidades, grupos)" },
    { FR: "Application React avec liste, filtres, tri et détail des personnages", EN: "React application with character list, filters, sorting and details", ES: "Aplicación React con lista, filtros, ordenación y detalle de los personajes" },
    { FR: "Visualisation des stats (barres de progression ou radar chart)", EN: "Stat visualization (progress bars or radar chart)", ES: "Visualización de estadísticas (barras de progreso o gráfico radar)" },
    { FR: "Navigation fluide entre personnages et groupes côté React", EN: "Smooth navigation between characters and parties on the React side", ES: "Navegación fluida entre personajes y grupos en React" },
    { FR: "Fixtures Doctrine pour les races, classes et compétences de base", EN: "Doctrine fixtures for the base races, classes and skills", ES: "Fixtures de Doctrine para las razas, clases y habilidades básicas" }
  ],
  role: { FR: "Configuration de la base de donnée, développeur backend", EN: "Database setup, backend developer", ES: "Configuración de la base de datos, desarrollador backend" },
  skills: [
    "PHP / Symfony",
    "React / Vite",
    "API REST",
    "SQLite / Doctrine",
    { FR: "Gestion de l'authentification", EN: "Authentication management", ES: "Gestión de la autenticación" },
    { FR: "Upload de fichiers", EN: "File uploads", ES: "Subida de archivos" },
    { FR: "Travail en équipe", EN: "Teamwork", ES: "Trabajo en equipo" },
    { FR: "Versioning Git", EN: "Git versioning", ES: "Control de versiones con Git" }
  ],
  steps: [
    { FR: "Analyse du sujet et modélisation des entités", EN: "Analysis of the brief and entity modeling", ES: "Análisis del enunciado y modelado de las entidades" },
    { FR: "Mise en place de Symfony et des fixtures", EN: "Symfony and fixtures setup", ES: "Puesta en marcha de Symfony y de las fixtures" },
    { FR: "Développement du fullstack Symfony (auth, CRUD, filtres)", EN: "Symfony fullstack development (auth, CRUD, filters)", ES: "Desarrollo fullstack con Symfony (auth, CRUD, filtros)" },
    { FR: "Création de l'API REST", EN: "Building the REST API", ES: "Creación de la API REST" },
    { FR: "Développement de l'application React", EN: "React application development", ES: "Desarrollo de la aplicación React" },
    { FR: "Configuration CORS et intégration API", EN: "CORS configuration and API integration", ES: "Configuración de CORS e integración de la API" },
    { FR: "Tests et finitions", EN: "Testing and polishing", ES: "Pruebas y acabados" }
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

export const Component = ({ onOpenApp, currentLanguage }) => {
  return (
    <ProjectLayout
      projectData={projectData}
      addressPath={{ FR: "C:\\Projets\\Forge-de-Heros", EN: "C:\\Projects\\Forge-de-Heros", ES: "C:\\Proyectos\\Forge-de-Heros" }}
      addressIcon="/icons/folder.webp"
      subtitle={{ FR: "Application fullstack de gestion de personnages D&D", EN: "Fullstack D&D character management application", ES: "Aplicación fullstack de gestión de personajes de D&D" }}
      headerIcon="/icons/folder.webp"
      onOpenApp={onOpenApp}
      currentLanguage={currentLanguage}
      sidebar={
        <ProjectSidebar
          projectData={projectData}
          githubUrl="https://github.com/Por-Tra/Forge-de-Heros"
          technologies={["PHP", "Symfony", "React", "Vite", "SQLite", "Doctrine"]}
          currentLanguage={currentLanguage}
        />
      }
    />
  );
};
