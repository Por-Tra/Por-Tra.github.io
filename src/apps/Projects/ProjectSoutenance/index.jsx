/**
 * Application: ProjectSoutenance
 * 
 * Détails du projet Soutenance - Style Windows XP
 */
import { ProjectLayout, ProjectSidebar } from '../../../components/ProjectLayout';

// Import des images
import screenshot1 from '../../../assets/Proj2/Capture d\'écran 2025-10-07 085609.png';
import screenshot2 from '../../../assets/Proj2/Capture d\'écran 2025-10-07 085646.png';
import screenshot3 from '../../../assets/Proj2/Capture d\'écran 2025-10-07 085653.png';

// Import du fichier de téléchargement
import projectZip from '../../../assets/projet_sql-main.zip';

export const config = {
  id: 'project-soutenance',
  name: 'Projet Soutenance',
  icon: '/icons/folder.png',
  defaultWidth: 700,
  defaultHeight: 550,
};

const projectData = {
  title: "Projet de Soutenance",
  description: "Il s'agit d'un projet universitaire dont le but était de fabriquer une application web pour noter les élèves.",
  languages: ["HTML", "CSS", "PHP", "SQL"],
  team: "11 personnes (par groupe de classe)",
  date: "10 septembre 2025 - 3 octobre 2025",
  features: [
    "Gestion des élèves",
    "Gestion des notes",
    "Gestion des projets",
    "Système d'envoi de mail automatique"
  ],
  role: "Développeur back-end, réalisation de la partie 3.3 et du système d'envoi de mail automatique",
  skills: [
    "HTML",
    "CSS",
    "PHP",
    "SQL",
    "Git",
    "Travail avec une grande équipe"
  ],
  images: [screenshot1, screenshot2, screenshot3]
};

export const Component = ({ onOpenApp }) => {
  return (
    <ProjectLayout
      projectData={projectData}
      addressPath="C:\Projets\Soutenance"
      addressIcon="/icons/folder.png"
      subtitle="Projet universitaire - Application web de notation"
      headerIcon="/icons/folder.png"
      onOpenApp={onOpenApp}
      sidebar={
        <ProjectSidebar
          projectData={projectData}
          downloadFile={projectZip}
          downloadName="projet_soutenance.zip"
          githubUrl="https://github.com/Por-Tra"
          technologies={["HTML", "CSS", "PHP", "SQL"]}
        />
      }
    />
  );
};
