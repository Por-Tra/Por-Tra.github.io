/**
 * Composants réutilisables pour les pages de projets
 * Style Windows XP
 */
import { useState } from 'react';

// Hook et constantes pour le zoom
const ZOOM_LEVELS = [50, 75, 100, 125, 150, 175, 200];
const DEFAULT_ZOOM = 100;

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
export const ZoomControls = ({ zoom, onZoomIn, onZoomOut, onReset }) => (
  <div className="xp-zoom-controls">
    <button 
      onClick={onZoomOut}
      className="xp-zoom-btn"
      title="Zoom arrière"
      disabled={zoom <= ZOOM_LEVELS[0]}
    >
      −
    </button>
    <span className="xp-zoom-level" title="Niveau de zoom">{zoom}%</span>
    <button 
      onClick={onZoomIn}
      className="xp-zoom-btn"
      title="Zoom avant"
      disabled={zoom >= ZOOM_LEVELS[ZOOM_LEVELS.length - 1]}
    >
      +
    </button>
    <button 
      onClick={onReset}
      className="xp-zoom-btn xp-zoom-reset"
      title="Réinitialiser le zoom"
    >
      ⟲
    </button>
  </div>
);

/**
 * Menu Bar - Barre de menu standard avec zoom intégré
 */
export const MenuBar = ({ zoom, onZoomIn, onZoomOut, onReset, showZoom = true }) => (
  <div className="xp-menubar xp-menubar-with-zoom">
    <div className="xp-menubar-items">
      <span className="xp-menubar-item">Fichier</span>
      <span className="xp-menubar-item">Édition</span>
      <span className="xp-menubar-item">Affichage</span>
      <span className="xp-menubar-item">?</span>
    </div>
    {showZoom && zoom && (
      <ZoomControls 
        zoom={zoom} 
        onZoomIn={onZoomIn} 
        onZoomOut={onZoomOut}
        onReset={onReset}
      />
    )}
  </div>
);

/**
 * Address Bar - Barre d'adresse
 * @param {string} path - Chemin à afficher
 * @param {string} icon - Icône à afficher (optionnel)
 */
export const AddressBar = ({ path, icon = '/icons/folder.png' }) => (
  <div className="xp-addressbar">
    <span className="xp-addressbar-label">Adresse</span>
    <div className="xp-addressbar-input">
      <img src={icon} alt="" className="w-4 h-4" />
      <span>{path}</span>
    </div>
    <button className="xp-addressbar-go">OK</button>
  </div>
);

/**
 * Status Bar - Barre de statut en bas
 * @param {string} projectTitle - Titre du projet
 * @param {number} featuresCount - Nombre de fonctionnalités
 */
export const StatusBar = ({ projectTitle, featuresCount }) => (
  <div className="xp-statusbar">
    <span>Projet: {projectTitle}</span>
    <span>{featuresCount} fonctionnalités</span>
  </div>
);

/**
 * Sidebar Box - Boîte de la sidebar
 * @param {string} title - Titre de la boîte
 * @param {string} icon - Icône du titre
 * @param {React.ReactNode} children - Contenu
 */
export const SidebarBox = ({ title, icon = '/icons/questionMark.png', children }) => (
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
  additionalContent
}) => (
  <div className="xp-sidebar">
    {/* Gestion du projet */}
    {(downloadFile || githubUrl) && (
      <SidebarBox title="Gestion du projet" icon="/icons/folder.png">
        {downloadFile && (
          <a href={downloadFile} download={downloadName} className="xp-sidebar-link">
            <img src="/icons/folder.png" alt="" />
            Télécharger (.zip)
          </a>
        )}
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="xp-sidebar-link">
            <img src="/icons/git.png" alt="" />
            Voir sur GitHub
          </a>
        )}
      </SidebarBox>
    )}

    {/* Détails */}
    <SidebarBox title="Détails" icon="/icons/questionMark.png">
      <div className="xp-sidebar-text">
        <p><strong>Date:</strong> {projectData.date}</p>
        <p><strong>Équipe:</strong> {projectData.team}</p>
        {projectData.role && <p><strong>Rôle:</strong> {projectData.role}</p>}
      </div>
    </SidebarBox>

    {/* Technologies */}
    {technologies.length > 0 && (
      <SidebarBox title="Technologies" icon="/icons/setting.png">
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

/**
 * Page Header - En-tête de page
 * @param {string} title - Titre du projet
 * @param {string} subtitle - Sous-titre
 * @param {string} icon - Icône
 */
export const PageHeader = ({ title, subtitle, icon = '/icons/folder.png' }) => (
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
export const DescriptionBox = ({ description }) => (
  <div className="xp-box xp-mb-3">
    <div className="xp-box-header">
      <img src="/icons/questionMark.png" alt="" />
      Description
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
export const StepsBox = ({ steps }) => (
  <div className="xp-box xp-mb-3">
    <div className="xp-box-header xp-box-header-green">
      <img src="/icons/setting.png" alt="" />
      Etapes
    </div>
    <div className="xp-box-content">
      <ol className="xp-list">
        {steps.map((step, i) => (
          <li key={i} className="xp-list-item">
            <img src="/icons/note.png" alt="" />
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
export const RoleBox = ({ role }) => (
  <div className="xp-tipbox xp-mb-3">
    <img src="/icons/setting.png" alt="" />
    <div className="xp-tipbox-text">
      <strong>Mon rôle:</strong> {role}
    </div>
  </div>
);

/**
 * Features Box - Liste des fonctionnalités
 * @param {string[]} features - Liste des fonctionnalités
 */
export const FeaturesBox = ({ features }) => (
  <div className="xp-box xp-mb-3">
    <div className="xp-box-header xp-box-header-green">
      <img src="/icons/folder.png" alt="" />
      Fonctionnalités
    </div>
    <div className="xp-box-content">
      <ul className="xp-list">
        {features.map((feature, i) => (
          <li key={i} className="xp-list-item">
            <img src="/icons/folder.png" alt="" />
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
export const SkillsBox = ({ skills }) => (
  <div className="xp-box xp-mb-3">
    <div className="xp-box-header xp-box-header-cyan">
      <img src="/icons/setting.png" alt="" />
      Compétences développées
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
export const ScreenshotsBox = ({ images, onImageClick, projectTitle = 'Projet' }) => (
  <div className="xp-box">
    <div className="xp-box-header xp-box-header-orange">
      <img src="/icons/explorer.png" alt="" />
      Captures d'écran
    </div>
    <div className="xp-box-content">
      <div className="xp-grid-2" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {images.map((img, i) => (
          <div 
            key={i} 
            className={`xp-screenshot ${onImageClick ? 'xp-screenshot-clickable' : ''}`}
            onClick={() => onImageClick && onImageClick(img, `${projectTitle} - Screenshot ${i + 1}`)}
            title={onImageClick ? "Cliquez pour agrandir" : undefined}
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
export const ScreenshotsSectionsBox = ({ sections, onImageClick, projectTitle = 'Projet' }) => (
  <div className="xp-box">
    <div className="xp-box-header xp-box-header-orange">
      <img src="/icons/explorer.png" alt="" />
      Captures d'ecran
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
                title={onImageClick ? 'Cliquez pour agrandir' : undefined}
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
  addressIcon = '/icons/folder.png',
  subtitle,
  headerIcon = '/icons/folder.png',
  sidebar,
  children,
  onOpenApp
}) => {
  const { zoom, zoomIn, zoomOut, resetZoom } = useZoom();
  
  // Handler pour ouvrir une image dans l'ImageViewer
  const handleImageClick = (imageSrc, imageName) => {
    if (onOpenApp) {
      onOpenApp('image-viewer', {
        imageSrc,
        imageName,
        windowTitle: `Aperçu - ${imageName}`
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
      />
      <AddressBar path={addressPath} icon={addressIcon} />
      
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
            title={projectData.title} 
            subtitle={subtitle} 
            icon={headerIcon} 
          />
          
          <DescriptionBox description={projectData.description} />
          
          {projectData.role && <RoleBox role={projectData.role} />}
          
          <FeaturesBox features={projectData.features} />
          
          <SkillsBox skills={projectData.skills} />

          {projectData.steps && projectData.steps.length > 0 && (
            <StepsBox steps={projectData.steps} />
          )}

          {projectData.screenshotSections && projectData.screenshotSections.length > 0 ? (
            <ScreenshotsSectionsBox
              sections={projectData.screenshotSections}
              onImageClick={handleImageClick}
              projectTitle={projectData.title}
            />
          ) : (
            <ScreenshotsBox
              images={projectData.images}
              onImageClick={handleImageClick}
              projectTitle={projectData.title}
            />
          )}

          {children}
        </div>
      </div>

      <StatusBar 
        projectTitle={projectData.title} 
        featuresCount={projectData.features.length} 
      />
    </div>
  );
};

export default ProjectLayout;
