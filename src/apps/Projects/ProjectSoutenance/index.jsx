/**
 * Application: ProjectSoutenance
 * 
 * Détails du projet Soutenance - Style Windows XP
 */
import { ProjectLayout, ProjectSidebar } from '../../../components/ProjectLayout';

// Import des images
import screenshot1 from '../../../assets/Proj2/1.webp';
import screenshot2 from '../../../assets/Proj2/2.webp';
import screenshot3 from '../../../assets/Proj2/2.webp';

// Import du fichier de téléchargement
import projectZip from '../../../assets/projet_sql-main.zip';

export const config = {
  id: 'project-soutenance',
  name: 'Application web de notation',
  icon: '/icons/folder.webp',
  defaultWidth: 700,
  defaultHeight: 550,
};

export const projectData = {
  title: { FR: "Application web de notation", EN: "Grading web application", ES: "Aplicación web de calificaciones" },
  description: {
    FR: "Il s'agit d'un projet universitaire dont le but était de fabriquer une application web pour noter les élèves.",
    EN: "A university project whose goal was to build a web application for grading students.",
    ES: "Se trata de un proyecto universitario cuyo objetivo era crear una aplicación web para calificar a los alumnos."
  },
  languages: ["HTML", "CSS", "PHP", "SQL"],
  team: { FR: "11 personnes (par groupe de classe)", EN: "11 people (one class group)", ES: "11 personas (por grupo de clase)" },
  date: { FR: "10 septembre 2025 - 3 octobre 2025", EN: "September 10, 2025 - October 3, 2025", ES: "10 de septiembre de 2025 - 3 de octubre de 2025" },
  features: [
    { FR: "Gestion des élèves", EN: "Student management", ES: "Gestión de alumnos" },
    { FR: "Gestion des notes", EN: "Grade management", ES: "Gestión de calificaciones" },
    { FR: "Gestion des projets", EN: "Project management", ES: "Gestión de proyectos" },
    { FR: "Système d'envoi de mail automatique", EN: "Automatic email sending system", ES: "Sistema de envío automático de correos" }
  ],
  role: {
    FR: "Développeur back-end, réalisation de la partie 3.3 et du système d'envoi de mail automatique",
    EN: "Back-end developer, in charge of part 3.3 and the automatic email sending system",
    ES: "Desarrollador back-end, encargado de la parte 3.3 y del sistema de envío automático de correos"
  },
  skills: [
    "HTML",
    "CSS",
    "PHP",
    "SQL",
    "Git",
    { FR: "Travail avec une grande équipe", EN: "Working in a large team", ES: "Trabajo en un equipo grande" }
  ],
  steps: [
    { FR: "Mise en place et configuration de l'environnement de développement", EN: "Setting up and configuring the development environment", ES: "Puesta en marcha y configuración del entorno de desarrollo" },
    { FR: "Répartition des tâches et organisation du travail en équipe", EN: "Task distribution and team organization", ES: "Reparto de tareas y organización del trabajo en equipo" },
    { FR: "Création de requêtes SQL pour la gestion des élèves, des notes et des projets", EN: "Writing SQL queries to manage students, grades and projects", ES: "Creación de consultas SQL para la gestión de alumnos, calificaciones y proyectos" },
    {
      FR: "Création de vérifications, cryptage de mot de passe et tokenisation de lien pour sécuriser la base de données",
      EN: "Adding validation, password hashing and link tokenization to secure the database",
      ES: "Creación de verificaciones, cifrado de contraseñas y tokenización de enlaces para proteger la base de datos"
    },
    {
      FR: "Conception des fonctionnalités de l'application web (gestion des élèves, des notes, des projets, envoi de mail automatique)",
      EN: "Designing the web application's features (student, grade and project management, automatic emails)",
      ES: "Diseño de las funcionalidades de la aplicación web (gestión de alumnos, calificaciones, proyectos, envío automático de correos)"
    },
    { FR: "Développement de l'application web en utilisant HTML, CSS et PHP", EN: "Developing the web application with HTML, CSS and PHP", ES: "Desarrollo de la aplicación web con HTML, CSS y PHP" },
    { FR: "Tests et débogage de l'application", EN: "Testing and debugging the application", ES: "Pruebas y depuración de la aplicación" },
    { FR: "Finalisation et préparation de la présentation du projet", EN: "Wrap-up and preparation of the project presentation", ES: "Finalización y preparación de la presentación del proyecto" }
  ],
  images: [screenshot1, screenshot2, screenshot3],
  screenshotSections: [
    {
      title: { FR: "Interface de gestion des élèves", EN: "Student management interface", ES: "Interfaz de gestión de alumnos" },
      images: [screenshot1, screenshot2, screenshot3]
    }
  ]
};

export const Component = ({ onOpenApp, currentLanguage }) => {
  return (
    <ProjectLayout
      projectData={projectData}
      addressPath={{ FR: "C:\\Projets\\Soutenance", EN: "C:\\Projects\\Soutenance", ES: "C:\\Proyectos\\Soutenance" }}
      addressIcon="/icons/folder.webp"
      subtitle={{
        FR: "Projet universitaire - Application web de notation",
        EN: "University project - Grading web application",
        ES: "Proyecto universitario - Aplicación web de calificaciones"
      }}
      headerIcon="/icons/folder.webp"
      onOpenApp={onOpenApp}
      currentLanguage={currentLanguage}
      sidebar={
        <ProjectSidebar
          projectData={projectData}
          downloadFile={projectZip}
          downloadName="projet_soutenance.zip"
          githubUrl="https://github.com/Corentino74/projet_sql"
          technologies={["HTML", "CSS", "PHP", "SQL"]}
          currentLanguage={currentLanguage}
        />
      }
    />
  );
};
