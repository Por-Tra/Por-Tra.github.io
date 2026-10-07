

import { ProjectLayout, ProjectSidebar } from '../../../components/ProjectLayout';

import screenshot1 from '../../../assets/Proj-P-AI/1.webp';
import screenshot2 from '../../../assets/Proj-P-AI/2.webp';
import screenshot3 from '../../../assets/Proj-P-AI/logo.webp';


export const config = {
  id: 'Port-AI-project',
  name: 'PORTR-AI',
  icon: '/icons/P-AI-logo.webp',
  defaultWidth: 700,
  defaultHeight: 520,
};

export const projectData = {
  title: "PORTR-AI",
  description: {
    FR: "Projet personnel de développement d'un LLM from scratch, nommé PORTR-AI, utilisant une architecture de transformer. Le LLM est basé sur la même architecture que GPT-2.",
    EN: "Personal project to build an LLM from scratch, called PORTR-AI, using a transformer architecture. The LLM is based on the same architecture as GPT-2.",
    ES: "Proyecto personal de desarrollo de un LLM desde cero, llamado PORTR-AI, basado en una arquitectura transformer. El LLM utiliza la misma arquitectura que GPT-2."
  },
  languages: ["Python"],
  team: { FR: "Travail en solo", EN: "Solo project", ES: "Trabajo individual" },
  date: { FR: "Novembre 2024 - Avril 2026", EN: "November 2024 - April 2026", ES: "Noviembre 2024 - Abril 2026" },
  features: [
    { FR: "Implémentation d'un modèle de transformer avec attention multi-tête", EN: "Implementation of a transformer model with multi-head attention", ES: "Implementación de un modelo transformer con atención multicabeza" },
    { FR: "Entraînement du modèle sur un corpus de textes variés", EN: "Training the model on a diverse text corpus", ES: "Entrenamiento del modelo con un corpus de textos variados" },
    { FR: "Optimisation des performances et de la qualité des réponses générées", EN: "Optimization of performance and generated output quality", ES: "Optimización del rendimiento y de la calidad de las respuestas generadas" }
  ],
  role: { FR: "Développeur principal et unique", EN: "Lead and sole developer", ES: "Desarrollador principal y único" },
  skills: [
    "Python",
    "Machine Learning",
    { FR: "Architecture de transformer", EN: "Transformer architecture", ES: "Arquitectura transformer" },
    { FR: "Entraînement de modèles de langage", EN: "Language model training", ES: "Entrenamiento de modelos de lenguaje" },
    { FR: "Optimisation de modèles", EN: "Model optimization", ES: "Optimización de modelos" },
    {
      FR: "Recherche et veille technologique (presque 1 an de veille sur les avancées en NLP et LLM)",
      EN: "Research and technology watch (almost 1 year following advances in NLP and LLMs)",
      ES: "Investigación y vigilancia tecnológica (casi 1 año siguiendo los avances en NLP y LLM)"
    }
  ],
  steps: [
    { FR: "Recherche et analyse des architectures Transformer", EN: "Research and analysis of Transformer architectures", ES: "Investigación y análisis de las arquitecturas Transformer" },
    { FR: "Collecte des données via web crawler", EN: "Data collection with a web crawler", ES: "Recopilación de datos mediante un web crawler" },
    { FR: "Tokenisation et prétraitement des données", EN: "Tokenization and data preprocessing", ES: "Tokenización y preprocesamiento de los datos" },
    { FR: "Construction du dataset", EN: "Building the dataset", ES: "Construcción del dataset" },
    { FR: "Embeddings et encodage positionnel", EN: "Embeddings and positional encoding", ES: "Embeddings y codificación posicional" },
    "Self-attention",
    "Multi-head attention",
    { FR: "Bloc Transformer", EN: "Transformer block", ES: "Bloque Transformer" },
    { FR: "Modèle GPT complet", EN: "Full GPT model", ES: "Modelo GPT completo" },
    { FR: "Fonction de perte", EN: "Loss function", ES: "Función de pérdida" },
    { FR: "Optimisation", EN: "Optimization", ES: "Optimización" },
    { FR: "Entraînement", EN: "Training", ES: "Entrenamiento" },
    { FR: "Génération de texte", EN: "Text generation", ES: "Generación de texto" },
    { FR: "Optimisations et améliorations", EN: "Optimizations and improvements", ES: "Optimizaciones y mejoras" },
    { FR: "Évaluation", EN: "Evaluation", ES: "Evaluación" },
    { FR: "Passage à l'échelle", EN: "Scaling up", ES: "Escalado" },
  ],
  images: [screenshot1, screenshot2, screenshot3],
    screenshotSections: [
      {
        title: "Logo",
        images: [screenshot3]
      },
      {
        title: { FR: "Courbes d'entraînement et évaluation", EN: "Training curves and evaluation", ES: "Curvas de entrenamiento y evaluación" },
        images: [screenshot1, screenshot2]
      }
    ]
};

export const Component = ({ onOpenApp, currentLanguage }) => {
  return (
    <ProjectLayout
      projectData={projectData}
      addressPath={{ FR: "C:\\Projets\\PORTR-AI", EN: "C:\\Projects\\PORTR-AI", ES: "C:\\Proyectos\\PORTR-AI" }}
      addressIcon="/icons/folder.webp"
      subtitle={{ FR: "LLM from scratch en Python", EN: "LLM from scratch in Python", ES: "LLM desde cero en Python" }}
      headerIcon="/icons/P-AI-logo.webp"
      onOpenApp={onOpenApp}
      currentLanguage={currentLanguage}
      sidebar={
        <ProjectSidebar
          projectData={projectData}
          githubUrl="https://github.com/Por-Tra/Portr-AI"
          technologies={["Python"]}
          currentLanguage={currentLanguage}
        />
      }
    />
  );
};
