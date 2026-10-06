

import { ProjectLayout, ProjectSidebar } from '../../../components/ProjectLayout';

// Import des images
import screenshot1 from '../../../assets/Proj-LIBET/1.webp';
import screenshot2 from '../../../assets/Proj-LIBET/2.webp';
import screenshot3 from '../../../assets/Proj-LIBET/3.webp';
import screenshot4 from '../../../assets/Proj-LIBET/4.webp';
import screenshot5 from '../../../assets/Proj-LIBET/5.webp';
import screenshot6 from '../../../assets/Proj-LIBET/6.webp';
import screenshot7 from '../../../assets/Proj-LIBET/7.webp';
import screenshot8 from '../../../assets/Proj-LIBET/8.webp';
import screenshot9 from '../../../assets/Proj-LIBET/9.webp';
import screenshot10 from '../../../assets/Proj-LIBET/10.webp';


export const config = {
  id: 'LIBET-project',
  name: 'LIBET',
  icon: '/icons/folder.webp',
  defaultWidth: 700,
  defaultHeight: 520,
};

const projectData = {
  title: "LIBET",
  description: {
    FR: "Projet universitaire de deuxième année visant à développer un jeu vidéo en 3D à l'aide du moteur Unity. Il s'agit d'un jeu narratif en huis clos dans une maison où l'on incarne Libet, une personne âgée atteinte de la maladie d'Alzheimer. Le joueur doit aider Libet à retrouver ses souvenirs et à comprendre ce qui lui arrive en explorant la maison et en interagissant avec les objets et l'environnement qui s'y trouvent.",
    EN: "Second-year university project to develop a 3D video game with the Unity engine. It is a narrative game set entirely inside a house, where you play as Libet, an elderly person living with Alzheimer's disease. The player must help Libet recover their memories and understand what is happening to them by exploring the house and interacting with the objects and environment inside it.",
    ES: "Proyecto universitario de segundo año cuyo objetivo es desarrollar un videojuego en 3D con el motor Unity. Se trata de un juego narrativo a puerta cerrada en una casa, donde se encarna a Libet, una persona mayor que padece la enfermedad de Alzheimer. El jugador debe ayudar a Libet a recuperar sus recuerdos y a comprender lo que le ocurre explorando la casa e interactuando con los objetos y el entorno que se encuentran en ella."
  },
  languages: ["C#", "Unity"],
  team: { FR: "Travaillé en équipe de 5", EN: "Team of 5", ES: "Trabajo en equipo de 5" },
  date: { FR: "Octobre 2025 - Mars 2026", EN: "October 2025 - March 2026", ES: "Octubre 2025 - Marzo 2026" },
  features: [
    { FR: "Exploration d'environnements 3D réalistes", EN: "Exploration of realistic 3D environments", ES: "Exploración de entornos 3D realistas" },
    { FR: "Mécaniques de puzzle et d'interaction", EN: "Puzzle and interaction mechanics", ES: "Mecánicas de puzles e interacción" },
    { FR: "Système de jauge de santé mentale", EN: "Mental health gauge system", ES: "Sistema de indicador de salud mental" },
    { FR: "Ambiance sonore immersive", EN: "Immersive sound design", ES: "Ambientación sonora inmersiva" },
    { FR: "Narration linéaire", EN: "Linear storytelling", ES: "Narración lineal" },
    { FR: "Système de sauvegarde et de chargement", EN: "Save and load system", ES: "Sistema de guardado y carga" },
    { FR: "Système de note et de journal pour suivre les souvenirs retrouvés", EN: "Notes and journal system to track recovered memories", ES: "Sistema de notas y diario para seguir los recuerdos recuperados" }
  ],
  role: {
    FR: "Développeur du système de quête ainsi que d'autres mécaniques de gameplay.",
    EN: "Developer of the quest system and other gameplay mechanics.",
    ES: "Desarrollador del sistema de misiones y de otras mecánicas de juego."
  },
  skills: [
    "C#",
    "Unity",
    { FR: "Travail en équipe", EN: "Teamwork", ES: "Trabajo en equipo" }
  ],
  steps: [
    { FR: "Recherche et planification du projet", EN: "Project research and planning", ES: "Investigación y planificación del proyecto" },
    { FR: "Veille sur la maladie d'Alzheimer et les expériences des patients", EN: "Research on Alzheimer's disease and patients' experiences", ES: "Documentación sobre la enfermedad de Alzheimer y las experiencias de los pacientes" },
    { FR: "Conception du gameplay et de la narration", EN: "Gameplay and narrative design", ES: "Diseño de la jugabilidad y de la narrativa" },
    { FR: "Développement du jeu en utilisant Unity et C#", EN: "Game development with Unity and C#", ES: "Desarrollo del juego con Unity y C#" },
    { FR: "Tests et itérations pour améliorer le gameplay et l'expérience utilisateur", EN: "Testing and iterating to improve gameplay and user experience", ES: "Pruebas e iteraciones para mejorar la jugabilidad y la experiencia de usuario" },
    { FR: "Finalisation du projet et préparation pour la présentation finale", EN: "Project wrap-up and preparation for the final presentation", ES: "Finalización del proyecto y preparación de la presentación final" }
  ],
  images: [screenshot1, screenshot2, screenshot3, screenshot4, screenshot5, screenshot6, screenshot7, screenshot8, screenshot9, screenshot10],
  screenshotSections: [
    {
      title: { FR: "Environnements", EN: "Environments", ES: "Entornos" },
      images: [screenshot4, screenshot5, screenshot6, screenshot7, screenshot8, screenshot9, screenshot10]
    },
    {
      title: "UI",
      images: [screenshot1, screenshot2, screenshot3]
    }
  ]
};

export const Component = ({ onOpenApp, currentLanguage }) => {
  return (
    <ProjectLayout
      projectData={projectData}
      addressPath={{ FR: "C:\\Projets\\LIBET", EN: "C:\\Projects\\LIBET", ES: "C:\\Proyectos\\LIBET" }}
      addressIcon="/icons/signal.webp"
      subtitle={{ FR: "Jeu vidéo 3D - Unity", EN: "3D video game - Unity", ES: "Videojuego 3D - Unity" }}
      headerIcon="/icons/signal.webp"
      onOpenApp={onOpenApp}
      currentLanguage={currentLanguage}
      sidebar={
        <ProjectSidebar
          projectData={projectData}
          githubUrl="https://github.com/loazur/LIBET"
          technologies={["C#", "Unity"]}
          currentLanguage={currentLanguage}
        />
      }
    />
  );
};
