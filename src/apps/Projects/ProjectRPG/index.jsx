/**
 * Application: ProjectRPG
 * 
 * Détails du projet RPG 2D - Style Windows XP
 */
import { ProjectLayout, ProjectSidebar } from '../../../components/ProjectLayout';

// Import des images
import screenshot1 from '../../../assets/Proj1/TES2D1.webp';
import screenshot2 from '../../../assets/Proj1/TES2D2.webp';
import screenshot3 from '../../../assets/Proj1/TES2D3.webp';

// Import du fichier de téléchargement
import projectZip from '../../../assets/RPG.zip';

export const config = {
  id: 'project-rpg',
  name: 'RPG 2D',
  icon: '/icons/folder.webp',
  defaultWidth: 700,
  defaultHeight: 520,
};

const projectData = {
  title: { FR: "RPG 2D", EN: "2D RPG", ES: "RPG 2D" },
  description: {
    FR: "Ce projet est un projet étudiant qui a été réalisé pendant mes années de lycée. Il s'agit d'un jeu vidéo en 2D de type RPG dans un style Pokémon. Le but du jeu est de parcourir 3 niveaux afin d'éliminer le boss de fin.",
    EN: "This is a student project I built during my high school years. It is a 2D RPG video game in a Pokémon-like style. The goal is to make your way through 3 levels in order to defeat the final boss.",
    ES: "Este es un proyecto estudiantil que realicé durante mis años de instituto. Se trata de un videojuego RPG en 2D al estilo Pokémon. El objetivo del juego es recorrer 3 niveles para derrotar al jefe final."
  },
  languages: ["Python"],
  team: { FR: "Travaillé en équipe de 2", EN: "Team of 2", ES: "Trabajo en equipo de 2" },
  date: "2022-2023",
  features: [
    { FR: "Déplacements", EN: "Movement", ES: "Desplazamientos" },
    { FR: "Changement de niveau", EN: "Level transitions", ES: "Cambio de nivel" },
    { FR: "Animation", EN: "Animation", ES: "Animación" },
    { FR: "Dialogues avec NPC", EN: "Dialogues with NPCs", ES: "Diálogos con NPC" },
    { FR: "Combat", EN: "Combat", ES: "Combate" },
    { FR: "Changement de personnage", EN: "Character switching", ES: "Cambio de personaje" }
  ],
  role: { FR: "Développeur", EN: "Developer", ES: "Desarrollador" },
  skills: [
    "Python",
    { FR: "Utilisation d'un IDE (PyCharm)", EN: "Using an IDE (PyCharm)", ES: "Uso de un IDE (PyCharm)" },
    { FR: "Gestion de bibliothèque", EN: "Library management", ES: "Gestión de bibliotecas" },
    { FR: "Utilisation d'outil de conception de niveau", EN: "Using a level design tool", ES: "Uso de una herramienta de diseño de niveles" }
  ],
  steps: [
    { FR: "Idée et documentation", EN: "Idea and documentation", ES: "Idea y documentación" },
    {
      FR: "Visualisation de tutoriels pour apprendre à utiliser les bibliothèques et avoir les premières bases du jeu (gestion des déplacements, collisions, animations)",
      EN: "Watching tutorials to learn how to use the libraries and lay the first foundations of the game (movement, collisions, animations)",
      ES: "Visualización de tutoriales para aprender a usar las bibliotecas y sentar las primeras bases del juego (desplazamientos, colisiones, animaciones)"
    },
    {
      FR: "Conception du jeu (choix des personnages, niveaux, dialogues, ennemis, boss)",
      EN: "Game design (choice of characters, levels, dialogues, enemies, boss)",
      ES: "Diseño del juego (elección de personajes, niveles, diálogos, enemigos, jefe)"
    },
    {
      FR: "Approfondissement des bases vues lors des tutoriels pour les adapter au projet (animation selon le personnage, dialogues avec les NPC, combat, ajout d'entités...)",
      EN: "Building on the basics from the tutorials to fit the project (per-character animation, NPC dialogues, combat, new entities...)",
      ES: "Profundización de las bases vistas en los tutoriales para adaptarlas al proyecto (animación según el personaje, diálogos con los NPC, combate, nuevas entidades...)"
    },
    { FR: "Conception des niveaux avec Tiled", EN: "Level design with Tiled", ES: "Diseño de niveles con Tiled" },
    { FR: "Tests et finitions", EN: "Testing and polishing", ES: "Pruebas y acabados" },
    { FR: "Présentation du projet", EN: "Project presentation", ES: "Presentación del proyecto" }
  ],
  images: [screenshot1, screenshot2, screenshot3],
  screenshotSections: [
    {
      title: { FR: "Aperçus du jeu", EN: "Game previews", ES: "Vistas del juego" },
      images: [screenshot1, screenshot3]
    },
    {
      title: { FR: "Conception des niveaux avec Tiled", EN: "Level design with Tiled", ES: "Diseño de niveles con Tiled" },
      images: [screenshot2]
    }
  ]
};

export const Component = ({ onOpenApp, currentLanguage }) => {
  return (
    <ProjectLayout
      projectData={projectData}
      addressPath={{ FR: "C:\\Projets\\RPG 2D", EN: "C:\\Projects\\2D RPG", ES: "C:\\Proyectos\\RPG 2D" }}
      addressIcon="/icons/folder.webp"
      subtitle={{ FR: "Projet de jeu vidéo", EN: "Video game project", ES: "Proyecto de videojuego" }}
      headerIcon="/icons/folder.webp"
      onOpenApp={onOpenApp}
      currentLanguage={currentLanguage}
      sidebar={
        <ProjectSidebar
          projectData={projectData}
          downloadFile={projectZip}
          downloadName="RPG.zip"
          githubUrl="https://github.com/Por-Tra"
          technologies={["Python", "Pygame"]}
          currentLanguage={currentLanguage}
        />
      }
    />
  );
};
