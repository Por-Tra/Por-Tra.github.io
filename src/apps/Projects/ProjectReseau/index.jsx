/**
 * Application: ProjectReseau
 * 
 * Détails du projet Réseau Social Local - Style Windows XP
 */
import { ProjectLayout, ProjectSidebar } from '../../../components/ProjectLayout';

// Import des images
import screenshot1 from '../../../assets/Proj3/1.webp';
import screenshot2 from '../../../assets/Proj3/2.webp';
import screenshot3 from '../../../assets/Proj3/3.webp';

// Import du fichier de téléchargement
import projectZip from '../../../assets/Projet RSL.zip';

export const config = {
  id: 'project-reseau',
  name: 'Réseau Social Local',
  icon: '/icons/folder.webp',
  defaultWidth: 700,
  defaultHeight: 520,
};

const projectData = {
  title: { FR: "Réseau Social Local", EN: "Local Social Network", ES: "Red Social Local" },
  description: {
    FR: "C'est un projet qui a pour but de permettre un échange de messages depuis 2 machines distinctes et avec la possibilité d'héberger le serveur très facilement.",
    EN: "A project designed to let two separate machines exchange messages, with the ability to host the server very easily.",
    ES: "Es un proyecto cuyo objetivo es permitir el intercambio de mensajes entre 2 máquinas distintas, con la posibilidad de alojar el servidor muy fácilmente."
  },
  languages: ["Python"],
  team: { FR: "Travaillé en équipe de 2", EN: "Team of 2", ES: "Trabajo en equipo de 2" },
  date: { FR: "Mars - Mai 2024", EN: "March - May 2024", ES: "Marzo - Mayo 2024" },
  features: [
    { FR: "Échange de messages entre 2 utilisateurs et ordinateurs", EN: "Message exchange between 2 users and computers", ES: "Intercambio de mensajes entre 2 usuarios y ordenadores" },
    { FR: "Historique des messages", EN: "Message history", ES: "Historial de mensajes" },
    { FR: "Hébergement du serveur", EN: "Server hosting", ES: "Alojamiento del servidor" },
    { FR: "Fonctionnel uniquement en réseau local", EN: "Works on local networks only", ES: "Funciona solo en red local" }
  ],
  role: {
    FR: "Synchronisation des messages, interface, gestion du serveur",
    EN: "Message synchronization, interface, server management",
    ES: "Sincronización de mensajes, interfaz, gestión del servidor"
  },
  skills: [
    "Python",
    { FR: "Serveur socket", EN: "Socket server", ES: "Servidor socket" },
    { FR: "Interface graphique", EN: "Graphical user interface", ES: "Interfaz gráfica" },
    { FR: "Bibliothèques Python", EN: "Python libraries", ES: "Bibliotecas de Python" }
  ],
  steps: [
    { FR: "Documentation et recherche sur le fonctionnement des serveurs socket", EN: "Documentation and research on how socket servers work", ES: "Documentación e investigación sobre el funcionamiento de los servidores socket" },
    { FR: "Développement du serveur et du client", EN: "Server and client development", ES: "Desarrollo del servidor y del cliente" },
    { FR: "Ajout d'un historique des messages côté serveur", EN: "Adding a server-side message history", ES: "Añadido de un historial de mensajes en el servidor" },
    { FR: "Ajout de la récupération de l'historique côté client", EN: "Adding client-side history retrieval", ES: "Añadido de la recuperación del historial en el cliente" },
    {
      FR: "Ajout d'un système de multithreading pour permettre au client d'envoyer et de recevoir des messages en même temps et d'avoir plusieurs clients connectés au serveur en même temps",
      EN: "Adding multithreading so the client can send and receive messages at the same time, and so several clients can be connected to the server at once",
      ES: "Añadido de un sistema de multihilo para que el cliente pueda enviar y recibir mensajes al mismo tiempo y para tener varios clientes conectados al servidor simultáneamente"
    },
    { FR: "Développement de l'interface graphique du client", EN: "Client GUI development", ES: "Desarrollo de la interfaz gráfica del cliente" },
    { FR: "Tests et finitions", EN: "Testing and polishing", ES: "Pruebas y acabados" }
  ],
  images: [screenshot1, screenshot2, screenshot3],
  screenshotSections: [
    {
      title: { FR: "Interface et messagerie", EN: "Interface and messaging", ES: "Interfaz y mensajería" },
      images: [screenshot1]
    },
    {
      title: { FR: "Connexion du client au serveur", EN: "Client connecting to the server", ES: "Conexión del cliente al servidor" },
      images: [screenshot2]
    },
    {
      title: {
        FR: "Console du serveur affichant les connexions et les messages",
        EN: "Server console showing connections and messages",
        ES: "Consola del servidor mostrando las conexiones y los mensajes"
      },
      images: [screenshot3]
    }
  ]
};

export const Component = ({ onOpenApp, currentLanguage }) => {
  return (
    <ProjectLayout
      projectData={projectData}
      addressPath={{ FR: "C:\\Projets\\ReseauSocialLocal", EN: "C:\\Projects\\LocalSocialNetwork", ES: "C:\\Proyectos\\RedSocialLocal" }}
      addressIcon="/icons/folder.webp"
      subtitle={{ FR: "Application de messagerie en réseau local", EN: "Local network messaging application", ES: "Aplicación de mensajería en red local" }}
      headerIcon="/icons/signal.webp"
      onOpenApp={onOpenApp}
      currentLanguage={currentLanguage}
      sidebar={
        <ProjectSidebar
          projectData={projectData}
          downloadFile={projectZip}
          downloadName="Projet_RSL.zip"
          githubUrl="https://github.com/Por-Tra"
          technologies={["Socket TCP/IP", "Interface Tkinter"]}
          currentLanguage={currentLanguage}
        />
      }
    />
  );
};
