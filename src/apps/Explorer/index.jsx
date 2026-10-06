/**
 * Application: Explorer
 * 
 * Explorateur de fichiers virtuel style Windows XP
 * Synchronisé avec le système de fichiers virtuel
 */
import { useState, useCallback, useMemo, memo } from 'react';
import fileSystem from '../../core/FileSystem';
import XpMenuBar from '../../components/XpMenuBar';
import { useSearchHighlight } from '../../hooks/useSearchHighlight.jsx';
import { t, getAppLabel } from '../../i18n/text';

export const config = {
  id: 'explorer',
  name: 'Poste de travail',
  icon: '/icons/PC.webp',
  defaultWidth: 750,
  defaultHeight: 520,
};

const COPY = {
  back: { FR: 'Précédent', EN: 'Back', ES: 'Anterior' },
  forward: { FR: 'Suivant', EN: 'Forward', ES: 'Siguiente' },
  up: { FR: 'Dossier parent', EN: 'Parent folder', ES: 'Carpeta padre' },
  icons: { FR: 'Icônes', EN: 'Icons', ES: 'Iconos' },
  list: { FR: 'Liste', EN: 'List', ES: 'Lista' },
  details: { FR: 'Détails', EN: 'Details', ES: 'Detalles' },
  address: { FR: 'Adresse', EN: 'Address', ES: 'Dirección' },
  systemTasks: { FR: 'Tâches système', EN: 'System tasks', ES: 'Tareas del sistema' },
  download: { FR: 'Télécharger', EN: 'Download', ES: 'Descargar' },
  open: { FR: 'Ouvrir', EN: 'Open', ES: 'Abrir' },
  otherLocations: { FR: 'Autres emplacements', EN: 'Other locations', ES: 'Otros lugares' },
  desktop: { FR: 'Bureau', EN: 'Desktop', ES: 'Escritorio' },
  myDocuments: { FR: 'Mes Documents', EN: 'My Documents', ES: 'Mis Documentos' },
  myComputer: { FR: 'Poste de travail', EN: 'My Computer', ES: 'Mi Computadora' },
  networkFavorites: { FR: 'Favoris réseau', EN: 'Network Favorites', ES: 'Favoritos de Red' },
  detailsTitle: { FR: 'Détails', EN: 'Details', ES: 'Detalles' },
  name: { FR: 'Nom', EN: 'Name', ES: 'Nombre' },
  size: { FR: 'Taille', EN: 'Size', ES: 'Tamaño' },
  type: { FR: 'Type', EN: 'Type', ES: 'Tipo' },
  modified: { FR: 'Modifié', EN: 'Modified', ES: 'Modificado' },
  modifiedOn: { FR: 'Modifié le', EN: 'Modified', ES: 'Modificado el' },
  emptySearch: { FR: 'Aucun fichier ne correspond à votre recherche', EN: 'No files match your search', ES: 'No hay archivos que coincidan con su búsqueda' },
  emptyFolder: { FR: 'Ce dossier est vide', EN: 'This folder is empty', ES: 'Esta carpeta está vacía' },
  items: { FR: 'objet(s)', EN: 'item(s)', ES: 'elemento(s)' },
  selected: { FR: 'sélectionné', EN: 'selected', ES: 'seleccionado' },
  fileLabel: { FR: 'Fichier', EN: 'File', ES: 'Archivo' },
  unknown: { FR: 'Inconnu', EN: 'Unknown', ES: 'Desconocido' },
  typeFolder: { FR: 'Dossier de fichiers', EN: 'File folder', ES: 'Carpeta de archivos' },
  typeDrive: { FR: 'Disque local', EN: 'Local disk', ES: 'Disco local' },
  typeComputer: { FR: 'Poste de travail', EN: 'My Computer', ES: 'Mi Computadora' },
  typeFile: { FR: 'Fichier', EN: 'File', ES: 'Archivo' },
  typeApp: { FR: 'Raccourci application', EN: 'Application shortcut', ES: 'Acceso directo de aplicación' },
  typeImage: { FR: 'Fichier image', EN: 'Image file', ES: 'Archivo de imagen' },
  typeLink: { FR: 'Raccourci Internet', EN: 'Internet shortcut', ES: 'Acceso directo de Internet' },
  preview: { FR: 'Aperçu', EN: 'Preview', ES: 'Vista previa' },
};

const NAME_LABELS = {
  'Poste de travail': COPY.myComputer,
  'Bureau': COPY.desktop,
  'Documents': { FR: 'Documents', EN: 'Documents', ES: 'Documentos' },
  'Téléchargements': { FR: 'Téléchargements', EN: 'Downloads', ES: 'Descargas' },
  'Images': { FR: 'Images', EN: 'Pictures', ES: 'Imágenes' },
  'Projets': { FR: 'Projets', EN: 'Projects', ES: 'Proyectos' },
  'Réseau': { FR: 'Réseau', EN: 'Network', ES: 'Red' },
  'Captures': { FR: 'Captures', EN: 'Screenshots', ES: 'Capturas de pantalla' },
  'Disque local (C:)': { FR: 'Disque local (C:)', EN: 'Local Disk (C:)', ES: 'Disco local (C:)' },
  'Wallpapers': { FR: "Fonds d'écran", EN: 'Wallpapers', ES: 'Fondos de pantalla' },
  'Réseau Social Local (RSL)': { FR: 'Réseau Social Local (RSL)', EN: 'Local Social Network (RSL)', ES: 'Red Social Local (RSL)' },
  'Réseau Social Local': { FR: 'Réseau Social Local', EN: 'Local Social Network', ES: 'Red Social Local' },
  'PORTR-AI (LLM from scratch en Python)': { FR: 'PORTR-AI (LLM from scratch en Python)', EN: 'PORTR-AI (LLM from scratch in Python)', ES: 'PORTR-AI (LLM desde cero en Python)' },
  'Application Web (PHP)': { FR: 'Application Web (PHP)', EN: 'Web Application (PHP)', ES: 'Aplicación Web (PHP)' },
  'Application Web de notation': { FR: 'Application Web de notation', EN: 'Grading Web Application', ES: 'Aplicación Web de calificaciones' },
  'Vapeur (javasript)': { FR: 'Vapeur (JavaScript)', EN: 'Vapeur (JavaScript)', ES: 'Vapeur (JavaScript)' },
  'Video Games - make with Unreal Engine and Unity': {
    FR: 'Jeux vidéo - Unreal Engine et Unity',
    EN: 'Video Games - made with Unreal Engine and Unity',
    ES: 'Videojuegos - Unreal Engine y Unity',
  },
};

// Composant pour un élément dans l'explorateur
const FileItem = memo(({ name, label, item, isSelected, viewMode, onSelect, onDoubleClick, highlightText }) => {
  const icon = fileSystem.getIcon(item, name);
  
  if (viewMode === 'icons') {
    return (
      <div
        onClick={() => onSelect(name, item)}
        onDoubleClick={() => onDoubleClick(name, item)}
        className={`xp-file-icon ${isSelected ? 'is-selected' : ''}`}
        style={{ '--icon-src': `url("${icon}")` }}
      >
        <div className="xp-file-icon-image">
          <img src={icon} alt="" draggable={false} />
        </div>
        <span className="xp-file-icon-label">
          {highlightText ? highlightText(label) : label}
        </span>
      </div>
    );
  }
  
  if (viewMode === 'list') {
    return (
      <div
        onClick={() => onSelect(name, item)}
        onDoubleClick={() => onDoubleClick(name, item)}
        className={`xp-file-row ${isSelected ? 'is-selected' : ''}`}
      >
        <img src={icon} alt="" className="w-5 h-5" draggable={false} />
        <span className="text-xs truncate">{highlightText ? highlightText(label) : label}</span>
      </div>
    );
  }
  
  return null;
});

FileItem.displayName = 'FileItem';

// Composant pour la vue détaillée
const DetailsRow = memo(({ name, label, item, typeLabel, isSelected, onSelect, onDoubleClick, highlightText }) => {
  const icon = fileSystem.getIcon(item, name);
  
  return (
    <tr
      onClick={() => onSelect(name, item)}
      onDoubleClick={() => onDoubleClick(name, item)}
      className={`cursor-pointer select-none ${isSelected ? 'bg-[#316ac5] text-white' : ''}`}
    >
      <td className="p-1 flex items-center gap-2">
        <img src={icon} alt="" className="w-4 h-4" draggable={false} />
        <span className="truncate">{highlightText ? highlightText(label) : label}</span>
      </td>
      <td className="p-1">{item.size || '-'}</td>
      <td className="p-1">{typeLabel}</td>
      <td className="p-1">{item.modified || '-'}</td>
    </tr>
  );
});

DetailsRow.displayName = 'DetailsRow';

export const Component = ({ onOpenApp, initialPath, currentLanguage = 'FR' }) => {
  const resolvedInitialPath = useMemo(() => {
    const fallbackPath = ['Poste de travail'];
    if (!Array.isArray(initialPath) || initialPath.length === 0) {
      return fallbackPath;
    }
    return fileSystem.getFolder(initialPath) ? initialPath : fallbackPath;
  }, [initialPath]);

  const getDisplayName = useCallback(
    (name, item) => {
      if (NAME_LABELS[name]) return t(NAME_LABELS[name], currentLanguage);
      if (item?.labelFromApp) return getAppLabel(item.appId, name, currentLanguage);
      return name;
    },
    [currentLanguage]
  );

  const getTypeLabel = useCallback((type) => {
    const map = {
      folder: COPY.typeFolder,
      drive: COPY.typeDrive,
      computer: COPY.typeComputer,
      file: COPY.typeFile,
      app: COPY.typeApp,
      image: COPY.typeImage,
      link: COPY.typeLink,
    };
    return t(map[type] ?? COPY.unknown, currentLanguage);
  }, [currentLanguage]);

  const [currentPath, setCurrentPath] = useState(resolvedInitialPath);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewMode, setViewMode] = useState('icons');
  const [history, setHistory] = useState([resolvedInitialPath]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const { query, filterItems, highlightText, isSearching } = useSearchHighlight('explorer');

  // Récupère le contenu du dossier actuel
  const currentFolder = useMemo(() => {
    return fileSystem.getFolder(currentPath);
  }, [currentPath]);

  // Trie les éléments (dossiers d'abord)
  const sortedItems = useMemo(() => {
    const items = currentFolder?.children || {};
    return Object.entries(items).sort((a, b) => {
      const aNavigable = fileSystem.isNavigable(a[1]);
      const bNavigable = fileSystem.isNavigable(b[1]);
      if (aNavigable && !bNavigable) return -1;
      if (!aNavigable && bNavigable) return 1;
      return a[0].localeCompare(b[0]);
    });
  }, [currentFolder]);

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    return filterItems(sortedItems, ([name, item]) => getDisplayName(name, item));
  }, [sortedItems, query, getDisplayName]);

  // Navigation
  const navigateTo = useCallback((path) => {
    setCurrentPath(path);
    setSelectedItem(null);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(path);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const goBack = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(history[historyIndex - 1]);
      setSelectedItem(null);
    }
  }, [history, historyIndex]);

  const goForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(history[historyIndex + 1]);
      setSelectedItem(null);
    }
  }, [history, historyIndex]);

  const goUp = useCallback(() => {
    if (currentPath.length > 1) {
      navigateTo(currentPath.slice(0, -1));
    }
  }, [currentPath, navigateTo]);

  // Gestion du double-clic
  const handleDoubleClick = useCallback((name, item) => {
    // Navigation dans les dossiers
    if (fileSystem.isNavigable(item)) {
      navigateTo([...currentPath, name]);
      return;
    }

    // Ouverture d'une application liée (raccourci ou fichier spécial)
    if (item.appId && onOpenApp) {
      onOpenApp(item.appId);
      return;
    }

    // Ouverture d'une image
    if (item.type === 'image' && item.imageSrc && onOpenApp) {
      onOpenApp('image-viewer', { 
        imageSrc: item.imageSrc, 
        imageName: name,
        windowTitle: `${t(COPY.preview, currentLanguage)} - ${name}`
      });
      return;
    }

    // Ouverture d'un lien externe
    if (item.type === 'link' && item.url) {
      window.open(item.url, '_blank');
      return;
    }

    // Téléchargement de fichier
    if (item.downloadFile) {
      const link = document.createElement('a');
      link.href = item.downloadFile;
      link.download = item.downloadName || name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // Fichier sans action spéciale
    alert(`${t(COPY.fileLabel, currentLanguage)}: ${name}\n${t(COPY.type, currentLanguage)}: ${getTypeLabel(item.type)}\n${t(COPY.size, currentLanguage)}: ${item.size || 'N/A'}`);
  }, [currentPath, navigateTo, onOpenApp]);

  const handleSelect = useCallback((name, item) => {
    setSelectedItem({ name, item });
  }, []);

  // Chemin affiché
  const pathString = currentPath.map(getDisplayName).join(' > ');

  return (
    <div className="h-full bg-white flex flex-col select-none">
      {/* Menu Bar */}
      <XpMenuBar
        preset="explorer"
        className="xp-menubar xp-menubar-explorer"
        currentLanguage={currentLanguage}
      />

      {/* Toolbar */}
      <div className="xp-toolbar">
        <button
          onClick={goBack}
          disabled={historyIndex <= 0}
          className="xp-toolbar-btn"
          title={t(COPY.back, currentLanguage)}
        >
          <img src="/icons/back.webp" alt="" className="xp-toolbar-icon-lg" />
          {t(COPY.back, currentLanguage)}
        </button>
        <button
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
          className="xp-toolbar-btn"
          title={t(COPY.forward, currentLanguage)}
        >
          <img src="/icons/back.webp" alt="" className="xp-toolbar-icon-lg" style={{ transform: 'scaleX(-1)' }} />
        </button>
        <button
          onClick={goUp}
          disabled={currentPath.length <= 1}
          className="xp-toolbar-btn"
          title={t(COPY.up, currentLanguage)}
        >
          <img src="/icons/folder.webp" alt="" className="xp-toolbar-icon-lg" />
        </button>
        <div className="xp-toolbar-separator"></div>
        <button
          onClick={() => setViewMode('icons')}
          className={`xp-toolbar-btn ${viewMode === 'icons' ? 'is-pressed' : ''}`}
          title={t(COPY.icons, currentLanguage)}
        >
          {t(COPY.icons, currentLanguage)}
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`xp-toolbar-btn ${viewMode === 'list' ? 'is-pressed' : ''}`}
          title={t(COPY.list, currentLanguage)}
        >
          {t(COPY.list, currentLanguage)}
        </button>
        <button
          onClick={() => setViewMode('details')}
          className={`xp-toolbar-btn ${viewMode === 'details' ? 'is-pressed' : ''}`}
          title={t(COPY.details, currentLanguage)}
        >
          {t(COPY.details, currentLanguage)}
        </button>
      </div>

      {/* Address Bar */}
      <div className="xp-addressbar">
        <span className="xp-addressbar-label">{t(COPY.address, currentLanguage)}</span>
        <div className="xp-addressbar-input">
          <img src={currentFolder?.icon || '/icons/folder.webp'} alt="" className="w-4 h-4 shrink-0" />
          <span className="truncate">{pathString}</span>
        </div>
        <button className="xp-addressbar-go" type="button">OK</button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Volet des tâches */}
        <div className="xp-sidebar">
          {/* Tâches système (seulement si une action est possible sur la sélection) */}
          {(selectedItem?.item?.downloadFile || selectedItem?.item?.type === 'app') && (
          <div className="xp-sidebar-box">
            <div className="xp-sidebar-title">{t(COPY.systemTasks, currentLanguage)}</div>
            {selectedItem?.item?.downloadFile && (
              <div
                onClick={() => handleDoubleClick(selectedItem.name, selectedItem.item)}
                className="xp-sidebar-link"
              >
                <img src="/icons/folder.webp" alt="" />
                {t(COPY.download, currentLanguage)}
              </div>
            )}
            {selectedItem?.item?.type === 'app' && (
              <div
                onClick={() => handleDoubleClick(selectedItem.name, selectedItem.item)}
                className="xp-sidebar-link"
              >
                <img src={selectedItem.item.icon || '/icons/folder.webp'} alt="" />
                {t(COPY.open, currentLanguage)}
              </div>
            )}
          </div>
          )}

          {/* Autres emplacements */}
          <div className="xp-sidebar-box">
            <div className="xp-sidebar-title">{t(COPY.otherLocations, currentLanguage)}</div>
            <div onClick={() => navigateTo(['Poste de travail', 'Bureau'])} className="xp-sidebar-link">
              <img src="/icons/folder.webp" alt="" />
              {t(COPY.desktop, currentLanguage)}
            </div>
            <div onClick={() => navigateTo(['Poste de travail', 'Documents'])} className="xp-sidebar-link">
              <img src="/icons/note.webp" alt="" />
              {t(COPY.myDocuments, currentLanguage)}
            </div>
            <div onClick={() => navigateTo(['Poste de travail'])} className="xp-sidebar-link">
              <img src="/icons/PC.webp" alt="" />
              {t(COPY.myComputer, currentLanguage)}
            </div>
            <div onClick={() => navigateTo(['Poste de travail', 'Réseau'])} className="xp-sidebar-link">
              <img src="/icons/explorer.webp" alt="" />
              {t(COPY.networkFavorites, currentLanguage)}
            </div>
          </div>

          {/* Détails de l'élément sélectionné */}
          {selectedItem && (
            <div className="xp-sidebar-box">
              <div className="xp-sidebar-title">{t(COPY.detailsTitle, currentLanguage)}</div>
              <div className="xp-sidebar-text">
                <p className="truncate font-bold">{getDisplayName(selectedItem.name, selectedItem.item)}</p>
                <p>{getTypeLabel(selectedItem.item.type)}</p>
                {selectedItem.item.size && <p>{t(COPY.size, currentLanguage)}: {selectedItem.item.size}</p>}
                {selectedItem.item.modified && <p>{t(COPY.modified, currentLanguage)}: {selectedItem.item.modified}</p>}
                {selectedItem.item.description && (
                  <p className="mt-1">{t(selectedItem.item.description, currentLanguage)}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* File List Area */}
        <div 
          className="flex-1 bg-white overflow-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedItem(null);
          }}
        >
          {viewMode === 'icons' && (
            <div className="flex flex-wrap gap-x-2 gap-y-3 p-3 content-start">
              {filteredItems.length > 0 ? (
                filteredItems.map(([name, item]) => (
                  <FileItem
                    key={name}
                    name={name}
                    label={getDisplayName(name, item)}
                    item={item}
                    isSelected={selectedItem?.name === name}
                    viewMode={viewMode}
                    onSelect={handleSelect}
                    onDoubleClick={handleDoubleClick}
                    highlightText={highlightText}
                  />
                ))
              ) : (
                <div className="text-gray-400 text-sm py-4">
                  {isSearching ? t(COPY.emptySearch, currentLanguage) : t(COPY.emptyFolder, currentLanguage)}
                </div>
              )}
            </div>
          )}

          {viewMode === 'list' && (
            <div className="p-2 space-y-0.5">
              {filteredItems.length > 0 ? (
                filteredItems.map(([name, item]) => (
                  <FileItem
                    key={name}
                    name={name}
                    label={getDisplayName(name, item)}
                    item={item}
                    isSelected={selectedItem?.name === name}
                    viewMode={viewMode}
                    onSelect={handleSelect}
                    onDoubleClick={handleDoubleClick}
                    highlightText={highlightText}
                  />
                ))
              ) : (
                <div className="text-gray-400 text-sm py-4">
                  {/* {isSearching ? 'Aucun fichier ne correspond à votre recherche' : 'Ce dossier est vide'} */}
                  {isSearching ? t(COPY.emptySearch, currentLanguage) : t(COPY.emptyFolder, currentLanguage)}
                </div>
              )}
            </div>
          )}

          {viewMode === 'details' && (
            <table className="xp-table">
              <thead className="sticky top-0">
                <tr>
                  <th>{t(COPY.name, currentLanguage)}</th>
                  <th className="w-20">{t(COPY.size, currentLanguage)}</th>
                  <th className="w-32">{t(COPY.type, currentLanguage)}</th>
                  <th className="w-24">{t(COPY.modifiedOn, currentLanguage)}</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length > 0 ? (
                  filteredItems.map(([name, item]) => (
                    <DetailsRow
                      key={name}
                      name={name}
                      label={getDisplayName(name, item)}
                      item={item}
                      typeLabel={getTypeLabel(item.type)}
                      isSelected={selectedItem?.name === name}
                      onSelect={handleSelect}
                      onDoubleClick={handleDoubleClick}
                      highlightText={highlightText}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-400">
                      {isSearching ? t(COPY.emptySearch, currentLanguage) : t(COPY.emptyFolder, currentLanguage)}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {filteredItems.length === 0 && viewMode !== 'icons' && viewMode !== 'list' && viewMode !== 'details' &&
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              {t(COPY.emptyFolder, currentLanguage)}
            </div>
          }
        </div>
      </div>

      {/* Status Bar */}
      <div className="xp-statusbar">
        <span>
          {filteredItems.length} {t(COPY.items, currentLanguage)}
          {selectedItem ? ` • "${getDisplayName(selectedItem.name, selectedItem.item)}" ${t(COPY.selected, currentLanguage)}` : ''}
        </span>
        <span>{pathString}</span>
      </div>
    </div>
  );
};
