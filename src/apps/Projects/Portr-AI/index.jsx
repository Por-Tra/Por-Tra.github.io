

import { ProjectLayout, ProjectSidebar } from '../../../components/ProjectLayout';

import screenshot1 from '../../../assets/Proj-P-AI/1.png';
import screenshot2 from '../../../assets/Proj-P-AI/2.png';
import screenshot3 from '../../../assets/Proj-P-AI/logo.png';


export const config = {
  id: 'Port-AI-project',
  name: 'PORTR-AI',
  icon: '/icons/P-AI-logo.webp',
  defaultWidth: 700,
  defaultHeight: 520,
};

const projectData = {
  title: "PORTR-AI",
  description: "Projet personnel de développement d'un LLM from scratch, nommé PORTR-AI, utilisant une architecture de transformer. Le LLM est basé sur la même architechture que GPT-2.",
  languages: ["Python"],
  team: "Travail en solo",
  date: "Novembre 2024 - avril 2026",
  features: [
    "Implémentation d'un modèle de transformer avec attention multi-tête",
    "Entraînement du modèle sur un corpus de textes variés",
    "Optimisation des performances et de la qualité des réponses générées"
  ],
  role: "Développeur principal et unique",
  skills: [
    "Python",
    "Machine Learning",
    "Architecture de transformer",
    "Entraînement de modèles de langage",
    "Optimisation de modèles",
    "Recherche et veille technologique (presque 1 an de veille sur les avancées en NLP et LLM)"
  ],
  steps: [
    "Recherche et analyse des architectures Transformer",
    "Collecte des données via web crawler",
    "Tokenisation et prétraitement des données",
    "Construction du dataset",
    "Embeddings et encodage positionnel",
    "Self-attention",
    "Multi-head attention",
    "Bloc Transformer",
    "Modèle GPT complet",
    "Fonction de perte",
    "Optimisation",
    "Entraînement",
    "Génération de texte",
    "Optimisations et améliorations",
    "Évaluation",
    "Passage à l'échelle",
  ],
  images: [screenshot1, screenshot2, screenshot3],
    screenshotSections: [
      {
        title: "Logo",
        images: [screenshot3]
      },
      {
        title: "Courbes d'entraînement et évaluation",
        images: [screenshot1, screenshot2]
      }
    ]
};

export const Component = ({ onOpenApp }) => {
  return (
    <ProjectLayout
      projectData={projectData}
      addressPath="C:\\Projets\\PORTR-AI"
      addressIcon="/icons/folder.webp"
      subtitle="LLM from scratch en Python"
      headerIcon="/icons/P-AI-logo.webp"
      onOpenApp={onOpenApp}
      sidebar={
        <ProjectSidebar
          projectData={projectData}
          githubUrl="https://github.com/Por-Tra/Portr-AI"
          technologies={["Python"]}
        />
      }
    />
  );
};