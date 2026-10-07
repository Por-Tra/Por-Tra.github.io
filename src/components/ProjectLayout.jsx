/**
 * Composants réutilisables pour les pages de projets
 * Style Windows XP
 */
import { useState } from 'react';
import XpMenuBar from './XpMenuBar';
import { t } from '../i18n/text';

// Hook et constantes pour le zoom
const ZOOM_LEVELS = [50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 350, 400];
const DEFAULT_ZOOM = 100;

const COPY = {
  address: { FR: 'Adresse', EN: 'Address', ES: 'Direccion' },
  ok: { FR: 'OK', EN: 'OK', ES: 'OK' },
  zoomOut: { FR: 'Zoom arrière', EN: 'Zoom out', ES: 'Alejar' },
  zoomLevel: { FR: 'Niveau de zoom', EN: 'Zoom level', ES: 'Nivel de zoom' },
  zoomIn: { FR: 'Zoom avant', EN: 'Zoom in', ES: 'Acercar' },
  zoomReset: { FR: 'Réinitialiser le zoom', EN: 'Reset zoom', ES: 'Restablecer zoom' },
  project: { FR: 'Projet', EN: 'Project', ES: 'Proyecto' },
  features: { FR: 'fonctionnalités', EN: 'features', ES: 'funcionalidades' },
  projectManagement: { FR: 'Gestion du projet', EN: 'Project management', ES: 'Gestion del proyecto' },
  details: { FR: 'Details', EN: 'Details', ES: 'Detalles' },
  technologies: { FR: 'Technologies', EN: 'Technologies', ES: 'Tecnologias' },
  download: { FR: 'Télécharger (.zip)', EN: 'Download (.zip)', ES: 'Descargar (.zip)' },
  viewGithub: { FR: 'Voir sur GitHub', EN: 'View on GitHub', ES: 'Ver en GitHub' },
  date: { FR: 'Date', EN: 'Date', ES: 'Fecha' },
  team: { FR: 'Équipe', EN: 'Team', ES: 'Equipo' },
  role: { FR: 'Rôle', EN: 'Role', ES: 'Rol' },
  description: { FR: 'Description', EN: 'Description', ES: 'Descripcion' },
  steps: { FR: 'Étapes', EN: 'Steps', ES: 'Pasos' },
  myRole: { FR: 'Mon rôle', EN: 'My role', ES: 'Mi rol' },
  featuresBox: { FR: 'Fonctionnalités', EN: 'Features', ES: 'Funciones' },
  skillsBox: { FR: 'Compétences développées', EN: 'Skills developed', ES: 'Habilidades desarrolladas' },
  screenshots: { FR: 'Captures d\'écran', EN: 'Screenshots', ES: 'Capturas de pantalla' },
  clickToZoom: { FR: 'Cliquez pour agrandir', EN: 'Click to enlarge', ES: 'Haz clic para ampliar' },
  preview: { FR: 'Aperçu', EN: 'Preview', ES: 'Vista previa' },
  viewerName: {
    FR: 'Aperçu des images et des télécopies Windows',
    EN: 'Windows Picture and Fax Viewer',
    ES: 'Visor de imágenes y fax de Windows',
  },
};

/**
 * Hook pour gérer le zoom
 */
export const useZoom = (initialZoom = DEFAULT_ZOOM) => {
  const [zoom, setZoom] = useState(initialZoom);

  const zoomIn = () => {
    setZoom(current => {
      const currentIndex = ZOOM_LEVELS.indexOf(current);
      if (currentIndex < ZOOM_LEVELS.length - 1) {
        return ZOOM_LEVELS[currentIndex + 1];
      }
      return current;
    });
  };

  const zoomOut = () => {
    setZoom(current => {
      const currentIndex = ZOOM_LEVELS.indexOf(current);
      if (currentIndex > 0) {
        return ZOOM_LEVELS[currentIndex - 1];
      }
      return current;
    });
  };

  const resetZoom = () => setZoom(DEFAULT_ZOOM);

  return { zoom, zoomIn, zoomOut, resetZoom };
};

/**
 * Helper pour générer les styles de zoom sur xp-content
 */
export const getZoomStyle = (zoom) => ({
  transform: `scale(${zoom / 100})`,
  transformOrigin: 'top left',
  width: `${10000 / zoom}%`,
  height: `${10000 / zoom}%`
});

/**
 * Contrôles de zoom
 */
export const ZoomControls = ({ zoom, onZoomIn, onZoomOut, onReset, currentLanguage = 'FR' }) => (
  <div className="xp-zoom-controls">
    <button 
      onClick={onZoomOut}
      className="xp-zoom-btn"
      title={t(COPY.zoomOut, currentLanguage)}
      disabled={zoom <= ZOOM_LEVELS[0]}
    >
      −
    </button>
    <span className="xp-zoom-level" title={t(COPY.zoomLevel, currentLanguage)}>{zoom}%</span>
    <button 
      onClick={onZoomIn}
      className="xp-zoom-btn"
      title={t(COPY.zoomIn, currentLanguage)}
      disabled={zoom >= ZOOM_LEVELS[ZOOM_LEVELS.length - 1]}
    >
      +
    </button>
    <button 
      onClick={onReset}
      className="xp-zoom-btn xp-zoom-reset"
      title={t(COPY.zoomReset, currentLanguage)}
    >
      ⟲
    </button>
  </div>
);

/**
 * Menu Bar - Barre de menu standard avec zoom intégré
 */
export const MenuBar = ({ zoom, onZoomIn, onZoomOut, onReset, showZoom = true, currentLanguage = 'FR' }) => (
  <XpMenuBar
    preset="basic"
    className="xp-menubar xp-menubar-with-zoom"
    itemClassName="xp-menubar-item"
    itemsWrapperClassName="xp-menubar-items"
    useWrapper
    currentLanguage={currentLanguage}
    rightSlot={
      showZoom && zoom ? (
        <ZoomControls
          zoom={zoom}
          onZoomIn={onZoomIn}
          onZoomOut={onZoomOut}
          onReset={onReset}
          currentLanguage={currentLanguage}
        />
      ) : null
    }
  />
);

/**
 * Address Bar - Barre d'adresse
 * @param {string} path - Chemin à afficher
 * @param {string} icon - Icône à afficher (optionnel)
 */
export const AddressBar = ({ path, icon = '/icons/folder.webp', currentLanguage = 'FR' }) => (
  <div className="xp-addressbar">
    <span className="xp-addressbar-label">{t(COPY.address, currentLanguage)}</span>
    <div className="xp-addressbar-input">
      <img src={icon} alt="" className="w-4 h-4" />
      <span>{path}</span>
    </div>
    <button className="xp-addressbar-go">{t(COPY.ok, currentLanguage)}</button>
  </div>
);

/**
 * Status Bar - Barre de statut en bas
 * @param {string} projectTitle - Titre du projet
 * @param {number} featuresCount - Nombre de fonctionnalités
 */
export const StatusBar = ({ projectTitle, featuresCount, currentLanguage = 'FR' }) => (
  <div className="xp-statusbar">
    <span>{t(COPY.project, currentLanguage)}: {projectTitle}</span>
    <span>{featuresCount} {t(COPY.features, currentLanguage)}</span>
  </div>
);

/**
 * Sidebar Box - Boîte de la sidebar
 * @param {string} title - Titre de la boîte
 * @param {string} icon - Icône du titre
 * @param {React.ReactNode} children - Contenu
 */
export const SidebarBox = ({ title, icon = '/icons/questionMark.webp', children }) => (
  <div className="xp-sidebar-box">
    <div className="xp-sidebar-title">
      <img src={icon} alt="" />
      {title}
    </div>
    {children}
  </div>
);

/**
 * Project Sidebar - Sidebar complète pour un projet
 * @param {object} projectData - Données du projet
 * @param {string} downloadFile - Fichier à télécharger (optionnel)
 * @param {string} downloadName - Nom du fichier téléchargé (optionnel)
 * @param {string} githubUrl - URL GitHub (optionnel)
 * @param {React.ReactNode} additionalContent - Contenu additionnel (optionnel)
 */
export const ProjectSidebar = ({ 
  projectData, 
  downloadFile, 
  downloadName,
  githubUrl = 'https://github.com/Por-Tra',
  technologies = [],
  additionalContent,
  currentLanguage = 'FR'
}) => {
  const resolveText = (value) => t(value, currentLanguage);
  return (
    <div className="xp-sidebar">
    {/* Gestion du projet */}
    {(downloadFile || githubUrl) && (
      <SidebarBox title={t(COPY.projectManagement, currentLanguage)} icon="/icons/folder.webp">
        {downloadFile && (
          <a href={downloadFile} download={downloadName} className="xp-sidebar-link">
            <img src="/icons/folder.webp" alt="" />
            {t(COPY.download, currentLanguage)}
          </a>
        )}
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="xp-sidebar-link">
            <img src="/icons/git.webp" alt="" />
            {t(COPY.viewGithub, currentLanguage)}
          </a>
        )}
      </SidebarBox>
    )}

    {/* Détails */}
    <SidebarBox title={t(COPY.details, currentLanguage)} icon="/icons/questionMark.webp">
      <div className="xp-sidebar-text">
        <p><strong>{t(COPY.date, currentLanguage)}:</strong> {resolveText(projectData.date)}</p>
        <p><strong>{t(COPY.team, currentLanguage)}:</strong> {resolveText(projectData.team)}</p>
        {projectData.role && <p><strong>{t(COPY.role, currentLanguage)}:</strong> {resolveText(projectData.role)}</p>}
      </div>
    </SidebarBox>

    {/* Technologies */}
    {technologies.length > 0 && (
      <SidebarBox title={t(COPY.technologies, currentLanguage)} icon="/icons/setting.webp">
        <div className="xp-sidebar-text">
          {technologies.map((tech, i) => (
            <p key={i}>{tech}</p>
          ))}
        </div>
      </SidebarBox>
    )}

    {/* Contenu additionnel */}
    {additionalContent}
  </div>
  );
};

/**
 * Page Header - En-tête de page
 * @param {string} title - Titre du projet
 * @param {string} subtitle - Sous-titre
 * @param {string} icon - Icône
 */
export const PageHeader = ({ title, subtitle, icon = '/icons/folder.webp' }) => (
  <div className="xp-page-header">
    <img src={icon} alt="" className="xp-page-header-icon" />
    <div>
      <h1 className="xp-page-title">{title}</h1>
      <p className="xp-page-subtitle">{subtitle}</p>
    </div>
  </div>
);

/**
 * Description Box - Boîte de description
 * @param {string} description - Description du projet
 */
export const DescriptionBox = ({ description, currentLanguage = 'FR' }) => (
  <div className="xp-box xp-mb-3">
    <div className="xp-box-header">
      <img src="/icons/questionMark.webp" alt="" />
      {t(COPY.description, currentLanguage)}
    </div>
    <div className="xp-box-content">
      <p className="xp-text-gray" style={{ lineHeight: '1.6' }}>
        {description}
      </p>
    </div>
  </div>
);

/**
 * Steps Box - Liste des etapes
 * @param {string[]} steps - Liste des etapes
 */
export const StepsBox = ({ steps, currentLanguage = 'FR' }) => (
  <div className="xp-box xp-mb-3">
    <div className="xp-box-header xp-box-header-green">
      <img src="/icons/setting.webp" alt="" />
      {t(COPY.steps, currentLanguage)}
    </div>
    <div className="xp-box-content">
      <ol className="xp-list">
        {steps.map((step, i) => (
          <li key={i} className="xp-list-item">
            <img src="/icons/note.webp" alt="" />
            {step}
          </li>
        ))}
      </ol>
    </div>
  </div>
);

/**
 * Role Box - Boîte du rôle
 * @param {string} role - Rôle dans le projet
 */
export const RoleBox = ({ role, currentLanguage = 'FR' }) => (
  <div className="xp-tipbox xp-mb-3">
    <img src="/icons/setting.webp" alt="" />
    <div className="xp-tipbox-text">
      <strong>{t(COPY.myRole, currentLanguage)}:</strong> {role}
    </div>
  </div>
);

/**
 * Features Box - Liste des fonctionnalités
 * @param {string[]} features - Liste des fonctionnalités
 */
export const FeaturesBox = ({ features, currentLanguage = 'FR' }) => (
  <div className="xp-box xp-mb-3">
    <div className="xp-box-header xp-box-header-green">
      <img src="/icons/folder.webp" alt="" />
      {t(COPY.featuresBox, currentLanguage)}
    </div>
    <div className="xp-box-content">
      <ul className="xp-list">
        {features.map((feature, i) => (
          <li key={i} className="xp-list-item">
            <img src="/icons/folder.webp" alt="" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

/**
 * Skills Box - Compétences développées
 * @param {string[]} skills - Liste des compétences
 */
export const SkillsBox = ({ skills, currentLanguage = 'FR' }) => (
  <div className="xp-box xp-mb-3">
    <div className="xp-box-header xp-box-header-cyan">
      <img src="/icons/setting.webp" alt="" />
      {t(COPY.skillsBox, currentLanguage)}
    </div>
    <div className="xp-box-content">
      <div className="xp-flex" style={{ flexWrap: 'wrap', gap: '4px' }}>
        {skills.map((skill, i) => (
          <span key={i} className="xp-tag">{skill}</span>
        ))}
      </div>
    </div>
  </div>
);

/**
 * Screenshots Box - Galerie de captures d'écran
 * @param {string[]} images - Liste des images
 * @param {function} onImageClick - Callback au clic sur une image (optionnel)
 * @param {string} projectTitle - Titre du projet pour le nom des images
 */
export const ScreenshotsBox = ({ images, onImageClick, projectTitle = 'Projet', currentLanguage = 'FR' }) => (
  <div className="xp-box">
    <div className="xp-box-header xp-box-header-orange">
      <img src="/icons/explorer.webp" alt="" />
      {t(COPY.screenshots, currentLanguage)}
    </div>
    <div className="xp-box-content">
      <div className="xp-grid-2" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {images.map((img, i) => (
          <div 
            key={i} 
            className={`xp-screenshot ${onImageClick ? 'xp-screenshot-clickable' : ''}`}
            onClick={() => onImageClick && onImageClick(img, `${projectTitle} - Screenshot ${i + 1}`)}
            title={onImageClick ? t(COPY.clickToZoom, currentLanguage) : undefined}
          >
            <img src={img} alt={`Screenshot ${i + 1}`} />
          </div>
        ))}
      </div>
    </div>
  </div>
);

/**
 * Screenshots Sections Box - Galerie de captures d'ecran par section
 * @param {{title: string, images: string[]}[]} sections - Sections d'images
 * @param {function} onImageClick - Callback au clic sur une image (optionnel)
 * @param {string} projectTitle - Titre du projet pour le nom des images
 */
export const ScreenshotsSectionsBox = ({ sections, onImageClick, projectTitle = 'Projet', currentLanguage = 'FR' }) => (
  <div className="xp-box">
    <div className="xp-box-header xp-box-header-orange">
      <img src="/icons/image.webp" alt="" />
      {t(COPY.screenshots, currentLanguage)}
    </div>
    <div className="xp-box-content">
      {sections.map((section, sectionIndex) => (
        <div key={`${section.title}-${sectionIndex}`} className="xp-mb-3">
          <div className="xp-text-bold" style={{ marginBottom: '6px' }}>
            {section.title}
          </div>
          <div className="xp-grid-2" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {section.images.map((img, imageIndex) => (
              <div
                key={`${sectionIndex}-${imageIndex}`}
                className={`xp-screenshot ${onImageClick ? 'xp-screenshot-clickable' : ''}`}
                onClick={() =>
                  onImageClick &&
                  onImageClick(
                    img,
                    `${projectTitle} - ${section.title} ${imageIndex + 1}`
                  )
                }
                title={onImageClick ? t(COPY.clickToZoom, currentLanguage) : undefined}
              >
                <img src={img} alt={`Screenshot ${imageIndex + 1}`} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

/**
 * ProjectLayout - Layout complet pour une page de projet
 * Encapsule tous les éléments communs
 * @param {object} projectData - Données du projet
 * @param {string} addressPath - Chemin de la barre d'adresse
 * @param {string} addressIcon - Icône de la barre d'adresse
 * @param {string} subtitle - Sous-titre du projet
 * @param {string} headerIcon - Icône de l'en-tête
 * @param {React.ReactNode} sidebar - Contenu de la sidebar
 * @param {React.ReactNode} children - Contenu principal additionnel
 * @param {function} onOpenApp - Callback pour ouvrir une application (pour ImageViewer)
 */
export const ProjectLayout = ({
  projectData,
  addressPath,
  addressIcon = '/icons/folder.webp',
  subtitle,
  headerIcon = '/icons/folder.webp',
  sidebar,
  children,
  onOpenApp,
  currentLanguage = 'FR'
}) => {
  const { zoom, zoomIn, zoomOut, resetZoom } = useZoom();
  const resolveText = (value) => t(value, currentLanguage);
  const resolvedTitle = resolveText(projectData?.title);
  const resolvedSubtitle = resolveText(subtitle);
  const resolvedDescription = resolveText(projectData?.description);
  const resolvedRole = resolveText(projectData?.role);
  const resolvedAddressPath = resolveText(addressPath);
  const resolvedFeatures = (projectData?.features || []).map((item) => resolveText(item));
  const resolvedSkills = (projectData?.skills || []).map((item) => resolveText(item));
  const resolvedSteps = (projectData?.steps || []).map((item) => resolveText(item));
  const resolvedSections = (projectData?.screenshotSections || []).map((section) => ({
    ...section,
    title: resolveText(section.title),
  }));
  
  // Handler pour ouvrir une image dans l'ImageViewer
  // Toutes les captures de la page, dans l'ordre d'affichage, pour naviguer avec précédent/suivant
  const galleryImages = resolvedSections.length > 0
    ? resolvedSections.flatMap((section) => section.images.map((src, imageIndex) => ({
        src,
        name: `${resolvedTitle} - ${section.title} ${imageIndex + 1}`,
      })))
    : (projectData?.images || []).map((src, imageIndex) => ({
        src,
        name: `${resolvedTitle} - Screenshot ${imageIndex + 1}`,
      }));

  const handleImageClick = (imageSrc, imageName) => {
    if (onOpenApp) {
      const startIndex = Math.max(0, galleryImages.findIndex((image) => image.name === imageName));
      onOpenApp('image-viewer', {
        images: galleryImages,
        startIndex,
        imageSrc,
        imageName,
        windowTitle: `${imageName} - ${t(COPY.viewerName, currentLanguage)}`
      });
    }
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
      <AddressBar path={resolvedAddressPath} icon={addressIcon} currentLanguage={currentLanguage} />
      
      <div 
        className="xp-content xp-content-zoomable"
        style={{ 
          transform: `scale(${zoom / 100})`,
          transformOrigin: 'top left',
          width: `${10000 / zoom}%`,
          height: `${10000 / zoom}%`
        }}
      >
        {sidebar}
        
        <div className="xp-content-main">
          <PageHeader 
            title={resolvedTitle} 
            subtitle={resolvedSubtitle} 
            icon={headerIcon} 
          />
          
          <DescriptionBox description={resolvedDescription} currentLanguage={currentLanguage} />
          
          {projectData.role && <RoleBox role={resolvedRole} currentLanguage={currentLanguage} />}
          
          <FeaturesBox features={resolvedFeatures} currentLanguage={currentLanguage} />
          
          <SkillsBox skills={resolvedSkills} currentLanguage={currentLanguage} />

          {resolvedSteps.length > 0 && (
            <StepsBox steps={resolvedSteps} currentLanguage={currentLanguage} />
          )}

          {resolvedSections.length > 0 ? (
            <ScreenshotsSectionsBox
              sections={resolvedSections}
              onImageClick={handleImageClick}
              projectTitle={resolvedTitle}
              currentLanguage={currentLanguage}
            />
          ) : (
            <ScreenshotsBox
              images={projectData.images}
              onImageClick={handleImageClick}
              projectTitle={resolvedTitle}
              currentLanguage={currentLanguage}
            />
          )}

          {children}
        </div>
      </div>

      <StatusBar 
        projectTitle={resolvedTitle} 
        featuresCount={resolvedFeatures.length} 
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default ProjectLayout;
