/**
 * Application: ProjectReseau
 * 
 * Détails du projet Réseau Social Local - Style Windows XP
 */
import { ProjectLayout, ProjectSidebar } from '../../../components/ProjectLayout';

// Import des images
import screenshot1 from '../../../assets/Proj3/Capture d\'écran 2025-10-25 192040.png';
import screenshot2 from '../../../assets/Proj3/Capture d\'écran 2025-10-25 192048.png';
import screenshot3 from '../../../assets/Proj3/Capture d\'écran 2025-10-25 192101.png';

// Import du fichier de téléchargement
import projectZip from '../../../assets/Projet RSL.zip';

export const config = {
  id: 'project-reseau',
  name: 'Réseau Social Local',
  icon: '/icons/folder.png',
  defaultWidth: 700,
  defaultHeight: 520,
};

const projectData = {
  title: "Réseau Social Local",
  description: "C'est un projet qui a pour but de permettre un échange de messages depuis 2 machines distinctes et avec la possibilité d'héberger le serveur très facilement.",
  languages: ["Python"],
  team: "Travaillé en équipe de 2",
  date: "Mars - Mai 2024",
  features: [
    "Échange de messages entre 2 utilisateurs et ordinateurs",
    "Historique des messages",
    "Hébergement du serveur",
    "Fonctionnel uniquement en réseau local"
  ],
  role: "Synchronisation des messages, interface, gestion du serveur",
  skills: [
    "Python",
    "Serveur socket",
    "Interface graphique",
    "Bibliothèques Python"
  ],
  steps: [
    "Documentation et recherche sur le fonctionnement des serveurs socket",
    "Développement du serveur et du client",
    "Ajout d'un historique des messages côté serveur",
    "Ajout de la récupération de l'historique côté client",
    "Ajout d'un système de mutlthreading pour permettre au client d'envoyer et de recevoir des messages en même temps et d'aavoir plusieurs clients connectés au serveur en même temps",
    "Développement de l'interface graphique du client",
    "Tests et finitions"
  ],
  images: [screenshot1, screenshot2, screenshot3],
  screenshotSections: [
    {
      title: "Interface et messagerie",
      images: [screenshot1]
    },
    {
      title: "Connexion du client au serveur",
      images: [screenshot2]
    },
    {
      title: "Console du serveur affichant les connexions et les messages",
      images: [screenshot3]
    }
  ]
};

export const Component = ({ onOpenApp }) => {
  return (
    <ProjectLayout
      projectData={projectData}
      addressPath="C:\Projets\ReseauSocialLocal"
      addressIcon="/icons/signal.png"
      subtitle="Application de messagerie en réseau local"
      headerIcon="/icons/signal.png"
      onOpenApp={onOpenApp}
      sidebar={
        <ProjectSidebar
          projectData={projectData}
          downloadFile={projectZip}
          downloadName="Projet_RSL.zip"
          githubUrl="https://github.com/Por-Tra"
          technologies={["Socket TCP/IP", "Interface Tkinter"]}
        />
      }
    />
  );
};
