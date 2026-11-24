/**
 * Application: Polenofs
 *
 * Projet du stage de 2e année (OPGC, contrat CNRS) - Style Windows XP
 */
import { ProjectLayout, ProjectSidebar } from '../../../components/ProjectLayout';

// Images servies depuis public/
const IMAGE_DIR = '/images/ProjectIMG/Polenofs';
const screenshot1 = `${IMAGE_DIR}/1.webp`;
const screenshot2 = `${IMAGE_DIR}/2.webp`;
const screenshot3 = `${IMAGE_DIR}/3.webp`;
const screenshot4 = `${IMAGE_DIR}/4.webp`;
const screenshot5 = `${IMAGE_DIR}/5.webp`;

export const DOI_URL = 'https://www.opgc.fr/DOI/10.25519/8thq-gy94/index.php';
export const SOURCE_URL = 'https://sourcesup.renater.fr/projects/polenofs';

export const config = {
  id: 'polenofs',
  name: 'Polenofs',
  icon: '/icons/OPGC-icon.webp',
  defaultWidth: 700,
  defaultHeight: 520,
};

export const projectData = {
  title: "Polenofs",
  description: {
    FR: "Projet réalisé pendant mon stage de 2e année de BUT Informatique, à l'OPGC (Observatoire de Physique du Globe de Clermont-Ferrand) sous contrat CNRS. L'objectif était de développer et d'améliorer un workflow d'apprentissage supervisé pour la détection de spores fongiques : récupérer les images holographiques et les données de fluorescence mesurées par l'instrument SwisensPoleno Jupiter, puis les traiter pour entraîner un modèle de deep learning capable de détecter et de classifier les spores fongiques. Le projet a été réalisé avec l'équipe de recherche de l'OPGC et le modèle a été publié avec un DOI.",
    EN: "Project carried out during my 2nd-year Computer Science internship at OPGC (Clermont-Ferrand Observatory of Physics of the Globe) under a CNRS contract. The goal was to develop and improve a supervised learning workflow for fungal spore detection: retrieve the holographic images and fluorescence data measured by the SwisensPoleno Jupiter instrument, then process them to train a deep learning model able to detect and classify fungal spores. The project was carried out with the OPGC research team and the model was published with a DOI.",
    ES: "Proyecto realizado durante mis prácticas de 2.º año de Informática en el OPGC (Observatorio de Física del Globo de Clermont-Ferrand) con un contrato del CNRS. El objetivo era desarrollar y mejorar un flujo de trabajo de aprendizaje supervisado para la detección de esporas fúngicas: recuperar las imágenes holográficas y los datos de fluorescencia medidos por el instrumento SwisensPoleno Jupiter y procesarlos para entrenar un modelo de deep learning capaz de detectar y clasificar esporas fúngicas. El proyecto se llevó a cabo con el equipo de investigación del OPGC y el modelo se publicó con un DOI."
  },
  languages: ["Python", "Machine Learning", "Data Analysis", "Data Visualization", "Data Processing"],
  team: {
    FR: "Équipe de 3, avec 7 membres au total sur la gestion du projet",
    EN: "Team of 3, with 7 members in total for project management",
    ES: "Equipo de 3, con 7 miembros en total para la gestión del proyecto"
  },
  date: {
    FR: "20 avril - 20 juin 2026 (stage de 8 semaines)",
    EN: "April 20 - June 20, 2026 (8-week internship)",
    ES: "20 de abril - 20 de junio de 2026 (prácticas de 8 semanas)"
  },
  features: [
    { FR: "Identifier les spores fongiques récupérées en une journée par l'instrument Poleno", EN: "Identify the fungal spores collected by the Poleno instrument over a day", ES: "Identificar las esporas fúngicas recogidas en un día por el instrumento Poleno" },
    { FR: "Traiter les données de fluorescence pour mesurer la correspondance moyenne avec les données d'entraînement", EN: "Process the fluorescence data to measure the average match with the training data", ES: "Procesar los datos de fluorescencia para medir la correspondencia media con los datos de entrenamiento" },
    { FR: "Créer un modèle de machine learning capable de détecter et de classifier les spores fongiques", EN: "Create a machine learning model able to detect and classify fungal spores", ES: "Crear un modelo de aprendizaje automático capaz de detectar y clasificar esporas fúngicas" },
    { FR: "Créer un workflow d'apprentissage supervisé pour la détection de spores fongiques", EN: "Create a supervised learning workflow for fungal spore detection", ES: "Crear un flujo de trabajo de aprendizaje supervisado para la detección de esporas fúngicas" }
  ],
  role: {
    FR: "Développeur du workflow d'apprentissage supervisé pour la détection de spores fongiques, co-auteur du modèle publié.",
    EN: "Developer of the supervised learning workflow for fungal spore detection, co-author of the published model.",
    ES: "Desarrollador del flujo de trabajo de aprendizaje supervisado para la detección de esporas fúngicas, coautor del modelo publicado."
  },
  skills: [
    "Python",
    "Machine Learning",
    "Data Analysis",
    "Data Visualization",
    "Data Processing",
    { FR: "Méthode Scrum", EN: "Scrum methodology", ES: "Metodología Scrum" },
    { FR: "Travail avec une équipe scientifique", EN: "Working with a scientific team", ES: "Trabajo con un equipo científico" },
  ],
  steps: [
    { FR: "Compréhension du projet initial et du workflow existant", EN: "Understanding the initial project and the existing workflow", ES: "Comprensión del proyecto inicial y del flujo de trabajo existente" },
    { FR: "Ajustement du modèle afin de corriger les erreurs de classification et d'améliorer la précision", EN: "Adjusting the model to fix classification errors and improve accuracy", ES: "Ajuste del modelo para corregir errores de clasificación y mejorar la precisión" },
    { FR: "Ajustement de la normalisation des images et des données de fluorescence pour améliorer la précision du modèle", EN: "Adjusting the normalization of images and fluorescence data to improve model accuracy", ES: "Ajuste de la normalización de imágenes y datos de fluorescencia para mejorar la precisión del modelo" },
    { FR: "Tests sur les données d'apprentissage pour ajuster la précision du modèle", EN: "Testing on training data to tune model accuracy", ES: "Pruebas con los datos de entrenamiento para ajustar la precisión del modelo" },
    { FR: "Ajout de nouvelles spores fongiques pour améliorer la classification et la précision du modèle", EN: "Adding new fungal spores to improve model classification and accuracy", ES: "Añadir nuevas esporas fúngicas para mejorar la clasificación y la precisión del modelo" },
    { FR: "Tests sur des données réelles pour vérifier la précision du modèle", EN: "Testing on real data to check model accuracy", ES: "Pruebas con datos reales para verificar la precisión del modelo" },
    { FR: "Correction des problèmes de normalisation, de surapprentissage et des autres problèmes rencontrés lors des tests sur données réelles", EN: "Fixing normalization issues, overfitting and other problems found while testing on real data", ES: "Corrección de problemas de normalización, sobreajuste y otros problemas encontrados en las pruebas con datos reales" },
    { FR: "Réalisation d'outils de comparaison des résultats entre données d'apprentissage et données réelles", EN: "Building tools to compare results between training data and real data", ES: "Creación de herramientas para comparar resultados entre datos de entrenamiento y datos reales" },
    { FR: "Validation du modèle final et de sa précision sur les données réelles", EN: "Validating the final model and its accuracy on real data", ES: "Validación del modelo final y de su precisión con datos reales" }
  ],
  images: [screenshot1, screenshot2, screenshot3, screenshot4, screenshot5],
  screenshotSections: [
    {
      title: { FR: "Outils d'analyse et de visualisation des données", EN: "Data analysis and visualization tools", ES: "Herramientas de análisis y visualización de datos" },
      images: [screenshot1, screenshot2, screenshot3]
    },
    {
      title: { FR: "Schéma du workflow final", EN: "Final workflow diagram", ES: "Diagrama del flujo de trabajo final" },
      images: [screenshot4]
    },
    {
      title: { FR: "Schéma du modèle", EN: "Model diagram", ES: "Diagrama del modelo" },
      images: [screenshot5]
    }
  ],
};

const LINKS = [
  {
    url: DOI_URL,
    label: { FR: 'Publication du modèle (DOI)', EN: 'Model publication (DOI)', ES: 'Publicación del modelo (DOI)' },
    icon: '/icons/OPGC-icon.webp',
  },
  {
    url: SOURCE_URL,
    label: { FR: 'Code source (SourceSup)', EN: 'Source code (SourceSup)', ES: 'Código fuente (SourceSup)' },
    icon: '/icons/explorer.webp',
  },
];

export const Component = ({ onOpenApp, currentLanguage }) => {
  return (
    <ProjectLayout
      projectData={projectData}
      addressPath={{ FR: "C:\\Projets\\Polenofs", EN: "C:\\Projects\\Polenofs", ES: "C:\\Proyectos\\Polenofs" }}
      addressIcon="/icons/OPGC-icon.webp"
      subtitle={{
        FR: "Workflow d'apprentissage supervisé pour la détection de spores fongiques",
        EN: "Supervised learning workflow for fungal spore detection",
        ES: "Flujo de trabajo de aprendizaje supervisado para la detección de esporas fúngicas"
      }}
      headerIcon="/icons/OPGC-icon.webp"
      onOpenApp={onOpenApp}
      currentLanguage={currentLanguage}
      sidebar={
        <ProjectSidebar
          projectData={projectData}
          githubUrl={null}
          links={LINKS}
          technologies={["Python", "Machine Learning", "Data Analysis", "Data Visualization", "Data Processing"]}
          currentLanguage={currentLanguage}
        />
      }
    />
  );
};
