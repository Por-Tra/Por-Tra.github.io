import { memo, Suspense, lazy, useMemo } from 'react';
import appRegistry from './AppRegistry';

/**
 * Composant de chargement par défaut
 */
const LoadingFallback = () => (
  <div className="h-full flex items-center justify-center bg-[#ece9d8]">
    <div className="text-center text-gray-600">
      <div className="animate-pulse text-2xl mb-2">⏳</div>
      <p className="text-sm">Chargement...</p>
    </div>
  </div>
);

/**
 * Contenu par défaut quand aucun composant n'est défini
 */
const DefaultContent = memo(({ title }) => (
  <div className="h-full flex items-center justify-center bg-[#ece9d8] p-4">
    <div className="text-center text-gray-500">
      <p className="text-4xl mb-2">📄</p>
      <p className="font-medium">{title || 'Application'}</p>
      <p className="text-sm mt-1">Contenu non disponible</p>
    </div>
  </div>
));

DefaultContent.displayName = 'DefaultContent';

/**
 * Composant pour afficher une URL dans une iframe
 */
const IframeContent = memo(({ url, title }) => (
  <iframe
    src={url}
    className="w-full h-full border-0"
    title={title}
    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
    loading="lazy"
  />
));

IframeContent.displayName = 'IframeContent';

/**
 * AppContent - Résout et affiche le contenu d'une fenêtre
 * 
 * Principes SOLID :
 * - Single Responsibility : Affiche uniquement le contenu résolu
 * - Open/Closed : Supporte tout composant enregistré sans modification
 * - Liskov Substitution : Tous les composants sont interchangeables
 * 
 * @param {object} window - Données de la fenêtre
 * @param {function} onOpenApp - Callback pour ouvrir une autre application
 */
const AppContent = memo(({ window, onOpenApp, onSetWallpaper, wallpaperUrl }) => {
  const app = useMemo(() => appRegistry.get(window.appId), [window.appId]);
  
  // Cas 1 : URL externe → iframe
  if (window.url) {
    return <IframeContent url={window.url} title={window.title} />;
  }

  // Cas 2 : Pas d'app trouvée
  if (!app) {
    return <DefaultContent title={window.title} />;
  }

  // Cas 3 : App avec composant
  if (app.component) {
    const Component = app.component;
    
    // Style personnalisé du contenu
    const contentStyle = app.contentStyle || {};
    
    // Props additionnelles passées à la fenêtre (ex: imageSrc pour ImageViewer)
    const extraProps = window.extraProps || {};
    
    return (
      <div className="h-full overflow-auto" style={contentStyle}>
        <Suspense fallback={<LoadingFallback />}>
          <Component 
            appId={window.appId} 
            windowId={window.id} 
            onOpenApp={onOpenApp}
            onSetWallpaper={onSetWallpaper}
            currentWallpaper={wallpaperUrl}
            {...extraProps}
          />
        </Suspense>
      </div>
    );
  }

  // Cas 4 : Fallback
  return <DefaultContent title={window.title} />;
});

AppContent.displayName = 'AppContent';

export default AppContent;
