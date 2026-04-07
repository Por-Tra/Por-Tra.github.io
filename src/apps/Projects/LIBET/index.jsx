

import { ProjectLayout, ProjectSidebar } from '../../../components/ProjectLayout';

// Import des images
import screenshot1 from '../../../assets/Proj-LIBET/1.png';
import screenshot2 from '../../../assets/Proj-LIBET/2.png';
import screenshot3 from '../../../assets/Proj-LIBET/3.png';
import screenshot4 from '../../../assets/Proj-LIBET/4.png';
import screenshot5 from '../../../assets/Proj-LIBET/5.png';
import screenshot6 from '../../../assets/Proj-LIBET/6.png';
import screenshot7 from '../../../assets/Proj-LIBET/7.png';
import screenshot8 from '../../../assets/Proj-LIBET/8.png';
import screenshot9 from '../../../assets/Proj-LIBET/9.png';
import screenshot10 from '../../../assets/Proj-LIBET/10.png';


export const config = {
  id: 'LIBET-project',
  name: 'LIBET',
  icon: '/icons/folder.webp',
  defaultWidth: 700,
  defaultHeight: 520,
};

const projectData = {
  title: "LIBET",
  description: "Projet universitaire de deuxième année visant à développer un jeu vidéo en 3D à l'aide du moteur Unity. Il s'agit d'un jeu narratif en huit clos dans une maison où on incarne Libet, une personne agée qui est atteint de la maladie d'Alzheimer. Le joueur doit aider Libet à retrouver ses souvenirs et à comprendre ce qui lui arrive en explorant la maison et en interagissant avec les objets et l'environnement qui s'y trouvent.",
  languages: ["C#", "Unity"],
  team: "Travaillé en équipe de 5",
  date: "octobre 2025 - Mars 2026",
  features: [
    "Exploration d'environnements 3D réalistes",
    "Mécaniques de puzzle et d'interaction",
    "Système de jauge de santé mentale",
    "Ambiance sonore immersive",
    "Narration linéaire",
    "Système de sauvegarde et de chargement",
    "Système de note et de journal pour suivre les souvenirs retrouvés"
  ],
  role: "Développeur du système de quête ainsi que d'autre mécaniques de gameplay.",
  skills: [
    "C#",
    "Unity",
    "Travail en équipe"
  ],
  steps: [
    "Recherche et planification du projet",
    "Veille sur la maladie d'Alzheimer et les expériences des patients",
    "Conception du gameplay et de la narration",
    "Développement du jeu en utilisant Unity et C#",
    "Tests et itérations pour améliorer le gameplay et l'expérience utilisateur",
    "Finalisation du projet et préparation pour la présentation finale"
  ],
  images: [screenshot1, screenshot2, screenshot3, screenshot4, screenshot5, screenshot6, screenshot7, screenshot8, screenshot9, screenshot10],
  screenshotSections: [
    {
      title: "Environnements",
      images: [screenshot4, screenshot5, screenshot6, screenshot7, screenshot8, screenshot9, screenshot10]
    },
    {
      title: "UI",
      images: [screenshot1, screenshot2, screenshot3]
    }
  ]
};

export const Component = ({ onOpenApp }) => {
  return (
    <ProjectLayout
      projectData={projectData}
      addressPath="C:\\Projets\\LIBET"
      addressIcon="/icons/signal.webp"
      subtitle="Jeu vidéo 3D - Unity"
      headerIcon="/icons/signal.webp"
      onOpenApp={onOpenApp}
      sidebar={
        <ProjectSidebar
          projectData={projectData}
          githubUrl="https://github.com/loazur/LIBET"
          technologies={["C#", "Unity"]}
        />
      }
    />
  );
};