/**
 * Application: Parcours
 *
 * Expérience et formation, présentées comme un dossier de l'Explorateur Windows XP :
 * groupes, tuiles sélectionnables, volet de tâches et détails de l'élément sélectionné.
 */
import { useRef, useState } from 'react';
import { MenuBar, useZoom, getZoomStyle } from '../../components/ProjectLayout';
import { t, getAppLabel } from '../../i18n/text';
import { DOI_URL, SOURCE_URL } from '../Projects/Polenofs';

export const config = {
  id: 'parcours',
  name: 'Mon Parcours',
  icon: '/icons/note.webp',
  defaultWidth: 760,
  defaultHeight: 560,
};

// Formations (la plus récente en premier)
const parcours = [
  {
    id: 1,
    titre: { FR: 'BUT Informatique Graphique', EN: 'Graphic Computing (BUT)', ES: 'Informática Gráfica (BUT)' },
    etablissement: "IUT Clermont Auvergne",
    lieu: "Le Puy-en-Velay",
    periode: "2024 - 2027",
    description: {
      FR: "Formation unique en France spécialisée dans l'informatique appliquée à l'image et le numérique responsable.",
      EN: 'A unique French program focused on computing for imaging and responsible digital practices.',
      ES: 'Un programa único en Francia enfocado en computación para imágenes y prácticas digitales responsables.',
    },
    details: [
      { FR: 'Développement de jeux vidéo et applications 3D', EN: 'Video game development and 3D applications', ES: 'Desarrollo de videojuegos y aplicaciones 3D' },
      { FR: "Programmation graphique et traitement d'images", EN: 'Graphics programming and image processing', ES: 'Programación gráfica y procesamiento de imágenes' },
      { FR: 'Technologies : C++, C#, Java, Python, Unity, Unreal Engine', EN: 'Technologies: C++, C#, Java, Python, Unity, Unreal Engine', ES: 'Tecnologías: C++, C#, Java, Python, Unity, Unreal Engine' },
      { FR: 'Méthodologies agiles et gestion de projet', EN: 'Agile methods and project management', ES: 'Métodos ágiles y gestión de proyectos' },
    ],
    lien: 'https://iut.uca.fr/formations/but-informatique-le-puy',
    enCours: true,
  },
  {
    id: 2,
    titre: { FR: 'BAC Général', EN: 'General Baccalaureate', ES: 'Bachillerato General' },
    etablissement: 'Lycée Marmontel',
    lieu: 'Mauriac',
    adresse: '12 rue du Collège, 15200 Mauriac',
    periode: '2021 - 2024',
    description: {
      FR: 'Baccalauréat général avec spécialités scientifiques et technologiques.',
      EN: 'General baccalaureate with scientific and technological specializations.',
      ES: 'Bachillerato general con especializaciones científicas y tecnológicas.',
    },
    details: [
      { FR: 'Spécialité Mathématiques', EN: 'Mathematics specialization', ES: 'Especialización en Matemáticas' },
      { FR: 'Spécialité Numérique et Sciences Informatiques (NSI)', EN: 'Digital & Computer Science specialization (NSI)', ES: 'Especialización en Digital y Ciencias de la Computación (NSI)' },
      { FR: 'Option Mathématiques Expertes', EN: 'Advanced Mathematics option', ES: 'Opción de Matemáticas Avanzadas' },
    ],
    lien: 'https://lyceepolyvalentmauriac.fr/',
    enCours: false,
  },
];

// Expériences professionnelles (la plus récente en premier)
const experiences = [
  {
    id: 'opgc',
    titre: {
      FR: 'Stage - Développeur en apprentissage automatique',
      EN: 'Internship - Machine Learning Developer',
      ES: 'Prácticas - Desarrollador de aprendizaje automático',
    },
    etablissement: 'OPGC - Observatoire de Physique du Globe de Clermont-Ferrand',
    logo: '/icons/OPGC-Clermont.webp',
    contrat: { FR: 'Contrat CNRS', EN: 'CNRS contract', ES: 'Contrato CNRS' },
    lieu: 'Clermont-Ferrand',
    periode: {
      FR: '20 avril 2026 - 20 juin 2026 · 8 semaines',
      EN: 'April 20, 2026 - June 20, 2026 · 8 weeks',
      ES: '20 de abril de 2026 - 20 de junio de 2026 · 8 semanas',
    },
    description: {
      FR: "Stage de 2e année de BUT au sein de l'OPGC, sous contrat CNRS. J'ai fait évoluer un workflow d'apprentissage supervisé (deep learning) qui détecte et classe les spores fongiques à partir des images holographiques et des mesures de fluorescence de l'instrument SwisensPoleno Jupiter.",
      EN: "2nd-year internship at OPGC under a CNRS contract. I improved a supervised (deep) learning workflow that detects and classifies fungal spores from the holographic images and fluorescence measurements of the SwisensPoleno Jupiter instrument.",
      ES: "Prácticas de 2.º año en el OPGC con un contrato del CNRS. Mejoré un flujo de aprendizaje supervisado (deep learning) que detecta y clasifica esporas fúngicas a partir de las imágenes holográficas y las medidas de fluorescencia del instrumento SwisensPoleno Jupiter.",
    },
    details: [
      {
        FR: 'Normalisation des images et des données de fluorescence, correction du surapprentissage',
        EN: 'Normalization of images and fluorescence data, fixing overfitting',
        ES: 'Normalización de imágenes y datos de fluorescencia, corrección del sobreajuste',
      },
      {
        FR: "Outils de comparaison entre les données d'entraînement et les données réelles",
        EN: 'Tools comparing training data with real-world data',
        ES: 'Herramientas de comparación entre los datos de entrenamiento y los datos reales',
      },
      {
        FR: "Co-auteur du modèle publié par l'OPGC et le LaMP (DOI 10.25519/8thq-gy94)",
        EN: 'Co-author of the model published by OPGC and LaMP (DOI 10.25519/8thq-gy94)',
        ES: 'Coautor del modelo publicado por el OPGC y el LaMP (DOI 10.25519/8thq-gy94)',
      },
      {
        FR: 'Python, machine learning, méthode Scrum avec une équipe scientifique',
        EN: 'Python, machine learning, Scrum with a scientific team',
        ES: 'Python, aprendizaje automático, Scrum con un equipo científico',
      },
    ],
    projet: 'polenofs',
    liens: [
      { url: DOI_URL, label: { FR: 'Consulter la publication (DOI)', EN: 'View the publication (DOI)', ES: 'Ver la publicación (DOI)' } },
      { url: SOURCE_URL, label: { FR: 'Code source (SourceSup)', EN: 'Source code (SourceSup)', ES: 'Código fuente (SourceSup)' } },
    ],
  },
];

const COPY = {
  address: { FR: 'Adresse', EN: 'Address', ES: 'Dirección' },
  addressPath: {
    FR: 'C:\\Documents and Settings\\Lucas\\Mon Parcours',
    EN: 'C:\\Documents and Settings\\Lucas\\My Journey',
    ES: 'C:\\Documents and Settings\\Lucas\\Mi Trayectoria',
  },
  go: { FR: 'OK', EN: 'Go', ES: 'Ir' },
  experience: { FR: 'Expérience', EN: 'Experience', ES: 'Experiencia' },
  education: { FR: 'Formation', EN: 'Education', ES: 'Formación' },
  experienceGroup: { FR: 'Expérience professionnelle', EN: 'Work experience', ES: 'Experiencia profesional' },
  educationGroup: { FR: 'Formation', EN: 'Education', ES: 'Formación' },
  myProjects: { FR: 'Mes Projets', EN: 'My Projects', ES: 'Mis Proyectos' },
  tasks: { FR: 'Tâches du parcours', EN: 'Journey tasks', ES: 'Tareas de la trayectoria' },
  viewInternshipProject: {
    FR: 'Voir le projet du stage (Polenofs)',
    EN: 'View the internship project (Polenofs)',
    ES: 'Ver el proyecto de las prácticas (Polenofs)',
  },
  viewPublication: { FR: 'Consulter la publication (DOI)', EN: 'View the publication (DOI)', ES: 'Ver la publicación (DOI)' },
  otherPlaces: { FR: 'Autres emplacements', EN: 'Other places', ES: 'Otros sitios' },
  details: { FR: 'Détails', EN: 'Details', ES: 'Detalles' },
  summary: {
    FR: '1 stage · 2 formations',
    EN: '1 internship · 2 programs',
    ES: '1 prácticas · 2 formaciones',
  },
  currently: { FR: 'Actuellement', EN: 'Currently', ES: 'Actualmente' },
  inProgress: { FR: 'En cours', EN: 'In progress', ES: 'En curso' },
  keyPoints: { FR: 'Points clés', EN: 'Key points', ES: 'Puntos clave' },
  seeProject: { FR: 'Voir le projet réalisé', EN: 'See the project', ES: 'Ver el proyecto realizado' },
  visitSite: { FR: "Visiter le site de l'établissement", EN: "Visit the school's website", ES: 'Visitar el sitio del centro' },
  hint: {
    FR: 'Double-cliquez sur un élément pour ouvrir le projet ou le site associé.',
    EN: 'Double-click an item to open its project or website.',
    ES: 'Haz doble clic en un elemento para abrir su proyecto o sitio.',
  },
  items: { FR: 'élément(s)', EN: 'item(s)', ES: 'elemento(s)' },
  selected: { FR: 'sélectionné', EN: 'selected', ES: 'seleccionado' },
};

/* Icônes de tuile dans le style Luna */
const BriefcaseIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <defs>
      <linearGradient id="cvCase" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#c98b4b" />
        <stop offset="1" stopColor="#7a4a1c" />
      </linearGradient>
    </defs>
    <path d="M17 12a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3h-3v-3h-8v3h-3z" fill="#5c3612" />
    <rect x="5" y="15" width="38" height="26" rx="4" fill="url(#cvCase)" stroke="#4a2a0c" />
    <path d="M5 25h38" stroke="#4a2a0c" strokeWidth="1.5" />
    <rect x="21" y="22" width="6" height="6" rx="1" fill="#f2c94c" stroke="#8a6a10" />
  </svg>
);

const DiplomaIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <defs>
      <linearGradient id="cvPaper" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fffdf2" />
        <stop offset="1" stopColor="#efe3b8" />
      </linearGradient>
    </defs>
    <rect x="6" y="9" width="36" height="26" rx="2" fill="url(#cvPaper)" stroke="#a88c3c" />
    <path d="M12 16h24M12 21h24M12 26h14" stroke="#b9a66a" strokeWidth="1.6" />
    <circle cx="34" cy="31" r="6" fill="#d23d2a" stroke="#8a1f12" />
    <path d="M30 35l-2 9 6-3 6 3-2-9" fill="#d23d2a" stroke="#8a1f12" />
  </svg>
);

const BulletIcon = () => <span className="xp-cv-bullet" aria-hidden="true" />;

export const Component = ({ currentLanguage, onOpenApp }) => {
  const { zoom, zoomIn, zoomOut, resetZoom } = useZoom();
  const [selectedId, setSelectedId] = useState(null);
  const experienceRef = useRef(null);
  const educationRef = useRef(null);

  const entries = [
    ...experiences.map((item) => ({ ...item, kind: 'experience' })),
    ...parcours.map((item) => ({ ...item, kind: 'education' })),
  ];
  const selected = entries.find((item) => item.id === selectedId);

  // Les sites liés acceptent l'affichage intégré : on les ouvre dans Internet Explorer
  const openLink = (url) => {
    if (onOpenApp) onOpenApp('internet-explorer', { initialUrl: url });
    else globalThis.open(url, '_blank', 'noopener');
  };

  const openEntry = (item) => {
    if (item.projet) onOpenApp?.(item.projet);
    else if (item.lien) openLink(item.lien);
  };

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const renderEntry = (item) => {
    const isSelected = item.id === selectedId;
    return (
      <article
        key={item.id}
        className={`xp-cv-item ${isSelected ? 'is-selected' : ''}`}
        onClick={(event) => {
          event.stopPropagation();
          setSelectedId(item.id);
        }}
        onDoubleClick={() => openEntry(item)}
      >
        <div className="xp-cv-icon">{item.kind === 'experience' ? <BriefcaseIcon /> : <DiplomaIcon />}</div>
        <div className="xp-cv-body">
          <div className="xp-cv-title">
            <span>{t(item.titre, currentLanguage)}</span>
            {item.enCours && <span className="xp-tag xp-tag-yellow">{t(COPY.inProgress, currentLanguage)}</span>}
          </div>
          {item.logo && <img className="xp-cv-logo" src={item.logo} alt={item.etablissement} />}
          <div className="xp-cv-org">
            {item.etablissement}
            {item.contrat && <span className="xp-cv-contract"> · {t(item.contrat, currentLanguage)}</span>}
          </div>
          <div className="xp-cv-meta">
            <span>📅 {t(item.periode, currentLanguage)}</span>
            <span>
              <img src="/icons/location.ico" alt="" className="xp-cv-meta-icon" />
              {item.adresse || item.lieu}
            </span>
          </div>
          <p className="xp-cv-description">{t(item.description, currentLanguage)}</p>

          <div className="xp-cv-points">
            <div className="xp-cv-points-title">{t(COPY.keyPoints, currentLanguage)}</div>
            <ul>
              {item.details.map((detail, index) => (
                <li key={index}>
                  <BulletIcon />
                  {t(detail, currentLanguage)}
                </li>
              ))}
            </ul>
          </div>

          <div className="xp-cv-actions">
            {item.projet && (
              <button type="button" className="xp-cv-action" onClick={() => onOpenApp?.(item.projet)}>
                <img src="/icons/folder.webp" alt="" />
                {t(COPY.seeProject, currentLanguage)}
              </button>
            )}
            {item.liens?.map((link) => (
              <button key={link.url} type="button" className="xp-cv-action" onClick={() => openLink(link.url)}>
                <img src="/icons/explorer.webp" alt="" />
                {t(link.label, currentLanguage)}
              </button>
            ))}
            {item.lien && (
              <button type="button" className="xp-cv-action" onClick={() => openLink(item.lien)}>
                <img src="/icons/explorer.webp" alt="" />
                {t(COPY.visitSite, currentLanguage)}
              </button>
            )}
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="xp-app">
      <MenuBar
        zoom={zoom}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onReset={resetZoom}
        currentLanguage={currentLanguage}
      />

      {/* Barre d'outils : accès direct aux deux groupes */}
      <div className="xp-toolbar">
        <button type="button" className="xp-toolbar-btn" onClick={() => scrollTo(experienceRef)}>
          <span className="xp-cv-toolbar-icon"><BriefcaseIcon /></span>
          {t(COPY.experience, currentLanguage)}
        </button>
        <button type="button" className="xp-toolbar-btn" onClick={() => scrollTo(educationRef)}>
          <span className="xp-cv-toolbar-icon"><DiplomaIcon /></span>
          {t(COPY.education, currentLanguage)}
        </button>
        <div className="xp-toolbar-separator" />
        <button type="button" className="xp-toolbar-btn" onClick={() => onOpenApp?.('projects')}>
          <img src="/icons/folder.webp" alt="" className="xp-toolbar-icon-lg" />
          {t(COPY.myProjects, currentLanguage)}
        </button>
      </div>

      <div className="xp-addressbar">
        <span className="xp-addressbar-label">{t(COPY.address, currentLanguage)}</span>
        <div className="xp-addressbar-input">
          <img src="/icons/note.webp" alt="" className="w-4 h-4" />
          <span>{t(COPY.addressPath, currentLanguage)}</span>
        </div>
        <button type="button" className="xp-addressbar-go">{t(COPY.go, currentLanguage)}</button>
      </div>

      <div className="xp-content xp-content-zoomable" style={getZoomStyle(zoom)}>
        {/* Volet des tâches */}
        <div className="xp-sidebar">
          <div className="xp-sidebar-box">
            <div className="xp-sidebar-title">{t(COPY.tasks, currentLanguage)}</div>
            <div className="xp-sidebar-link" onClick={() => onOpenApp?.('polenofs')}>
              <img src="/icons/OPGC-icon.webp" alt="" />
              {t(COPY.viewInternshipProject, currentLanguage)}
            </div>
            <div className="xp-sidebar-link" onClick={() => openLink(DOI_URL)}>
              <img src="/icons/explorer.webp" alt="" />
              {t(COPY.viewPublication, currentLanguage)}
            </div>
          </div>

          <div className="xp-sidebar-box">
            <div className="xp-sidebar-title">{t(COPY.otherPlaces, currentLanguage)}</div>
            <div className="xp-sidebar-link" onClick={() => onOpenApp?.('projects')}>
              <img src="/icons/folder.webp" alt="" />
              {getAppLabel('projects', 'Mes Projets', currentLanguage)}
            </div>
            <div className="xp-sidebar-link" onClick={() => onOpenApp?.('skills')}>
              <img src="/icons/note.webp" alt="" />
              {getAppLabel('skills', 'Compétences', currentLanguage)}
            </div>
            <div className="xp-sidebar-link" onClick={() => onOpenApp?.('about')}>
              <img src="/icons/note.webp" alt="" />
              {getAppLabel('about', 'À propos', currentLanguage)}
            </div>
            <div className="xp-sidebar-link" onClick={() => onOpenApp?.('contact')}>
              <img src="/icons/message.ico" alt="" />
              {getAppLabel('contact', 'Contact', currentLanguage)}
            </div>
          </div>

          {/* Détails de l'élément sélectionné, comme dans l'Explorateur */}
          <div className="xp-sidebar-box">
            <div className="xp-sidebar-title">{t(COPY.details, currentLanguage)}</div>
            <div className="xp-sidebar-text">
              {selected ? (
                <>
                  <p className="font-bold">{t(selected.titre, currentLanguage)}</p>
                  <p>{selected.etablissement}</p>
                  {selected.contrat && <p>{t(selected.contrat, currentLanguage)}</p>}
                  <p>{t(selected.periode, currentLanguage)}</p>
                  <p>{selected.lieu}</p>
                </>
              ) : (
                <>
                  <p className="font-bold">{getAppLabel('parcours', 'Mon Parcours', currentLanguage)}</p>
                  <p>{t(COPY.summary, currentLanguage)}</p>
                  <p>
                    {t(COPY.currently, currentLanguage)} : {t(parcours[0].titre, currentLanguage)} ({parcours[0].periode})
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Contenu : groupes à la manière de l'Explorateur XP */}
        <div className="xp-content-main xp-cv" onClick={() => setSelectedId(null)}>
          <p className="xp-cv-hint">{t(COPY.hint, currentLanguage)}</p>

          <h2 ref={experienceRef} className="xp-cv-group">{t(COPY.experienceGroup, currentLanguage)}</h2>
          {experiences.map((item) => renderEntry({ ...item, kind: 'experience' }))}

          <h2 ref={educationRef} className="xp-cv-group">{t(COPY.educationGroup, currentLanguage)}</h2>
          {parcours.map((item) => renderEntry({ ...item, kind: 'education' }))}
        </div>
      </div>

      <div className="xp-statusbar">
        <span>
          {entries.length} {t(COPY.items, currentLanguage)}
          {selected ? ` • "${t(selected.titre, currentLanguage)}" ${t(COPY.selected, currentLanguage)}` : ''}
        </span>
        <span>{t(COPY.addressPath, currentLanguage)}</span>
      </div>
    </div>
  );
};
