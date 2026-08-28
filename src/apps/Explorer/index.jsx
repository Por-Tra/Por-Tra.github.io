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
import { t } from '../../i18n/text';

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
};

// Composant pour un élément dans l'explorateur
const FileItem = memo(({ name, label, item, isSelected, viewMode, onSelect, onDoubleClick, highlightText }) => {
  const icon = fileSystem.getIcon(item, name);
  
  if (viewMode === 'icons') {
    return (
      <div
        onClick={() => onSelect(name, item)}
        onDoubleClick={() => onDoubleClick(name, item)}
        className={`flex flex-col items-center w-20 p-2 rounded cursor-pointer select-none ${
          isSelected ? 'bg-[#316ac5] text-white' : 'hover:bg-[#e8f4fc]'
        }`}
      >
        <img src={icon} alt="" className="w-10 h-10 mb-1" draggable={false} />
        <span className={`text-[11px] text-center break-all line-clamp-2 ${isSelected ? 'text-white' : ''}`}>
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
        className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer select-none ${
          isSelected ? 'bg-[#316ac5] text-white' : 'hover:bg-[#e8f4fc]'
        }`}
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
const DetailsRow = memo(({ name, label, item, typeLabel, isSelected, index, onSelect, onDoubleClick, highlightText }) => {
  const icon = fileSystem.getIcon(item, name);
  
  return (
    <tr
      onClick={() => onSelect(name, item)}
      onDoubleClick={() => onDoubleClick(name, item)}
      className={`cursor-pointer select-none ${
        isSelected 
          ? 'bg-[#316ac5] text-white' 
          : index % 2 === 0 ? 'bg-white hover:bg-[#e8f4fc]' : 'bg-[#f5f5f5] hover:bg-[#e8f4fc]'
      }`}
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
    (name) => t(NAME_LABELS[name] ?? name, currentLanguage),
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
    return filterItems(sortedItems, ([name]) => getDisplayName(name));
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
        className="bg-gradient-to-b from-[#ece9d8] to-[#d4d0c8] border-b border-[#808080] px-2 py-1 flex gap-4 text-xs"
        itemClassName="text-gray-600 hover:underline cursor-pointer"
        currentLanguage={currentLanguage}
      />

      {/* Toolbar */}
      <div className="bg-[#ece9d8] border-b border-[#808080] px-2 py-1 flex items-center gap-1">
        <button 
          onClick={goBack}
          disabled={historyIndex <= 0}
          className="xp-button px-2 py-0.5 text-xs flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          title={t(COPY.back, currentLanguage)}
        >
          <img src="/icons/back.webp" alt="" className="w-3 h-3" />
          {t(COPY.back, currentLanguage)}
        </button>
        <button 
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
          className="xp-button px-2 py-0.5 text-xs flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          title={t(COPY.forward, currentLanguage)}
        >
          {t(COPY.forward, currentLanguage)} <img src="/icons/back.webp" alt="" className="w-3 h-3" style={{ transform: 'scaleX(-1)' }} />
        </button>
        {/* <button 
          onClick={goUp}
          disabled={currentPath.length <= 1}
          className="xp-button px-2 py-0.5 text-xs flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          title={t(COPY.up, currentLanguage)}
        >
          <img src="/icons/back.webp" alt="" className="w-3 h-3" style={{ transform: 'rotate(90deg)' }} />
        </button> */}
        <div className="w-px h-5 bg-[#808080] mx-1"></div>
        <button 
          onClick={() => setViewMode('icons')}
          className={`xp-button px-2 py-0.5 text-xs ${viewMode === 'icons' ? 'bg-[#c0c0c0]' : ''}`}
          title={t(COPY.icons, currentLanguage)}
        >
          ☐
        </button>
        <button 
          onClick={() => setViewMode('list')}
          className={`xp-button px-2 py-0.5 text-xs ${viewMode === 'list' ? 'bg-[#c0c0c0]' : ''}`}
          title={t(COPY.list, currentLanguage)}
        >
          ≡
        </button>
        <button 
          onClick={() => setViewMode('details')}
          className={`xp-button px-2 py-0.5 text-xs ${viewMode === 'details' ? 'bg-[#c0c0c0]' : ''}`}
          title={t(COPY.details, currentLanguage)}
        >
          ⊞
        </button>
      </div>

      {/* Address Bar */}
      <div className="bg-[#ece9d8] border-b border-[#808080] px-2 py-1 flex items-center gap-2">
        <span className="text-xs text-gray-600 shrink-0">{t(COPY.address, currentLanguage)}</span>
        <div className="flex-1 bg-white border border-[#7f9db9] px-2 py-0.5 text-xs flex items-center gap-1 min-w-0">
          <img src={currentFolder?.icon || '/icons/folder.webp'} alt="" className="w-4 h-4 shrink-0" />
          <span className="truncate">{pathString}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-44 bg-gradient-to-b from-[#6b88c4] to-[#4d6eb5] p-2 overflow-y-auto flex-shrink-0">
          {/* Tâches système */}
          <div className="bg-white/90 p-2 mb-2">
            <h3 className="text-[11px] font-bold text-[#215dc6] mb-2">{t(COPY.systemTasks, currentLanguage)}</h3>
            <div className="space-y-1 text-[10px]">
              {selectedItem?.item?.downloadFile && (
                <div 
                  onClick={() => handleDoubleClick(selectedItem.name, selectedItem.item)}
                  className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer"
                >
                  <span></span> {t(COPY.download, currentLanguage)}
                </div>
              )}
              {selectedItem?.item?.type === 'app' && (
                <div 
                  onClick={() => handleDoubleClick(selectedItem.name, selectedItem.item)}
                  className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer"
                >
                  <span></span> {t(COPY.open, currentLanguage)}
                </div>
              )}
            </div>
          </div>

          {/* Raccourcis */}
          <div className="bg-white/90 p-2 mb-2">
            <h3 className="text-[11px] font-bold text-[#215dc6] mb-2">{t(COPY.otherLocations, currentLanguage)}</h3>
            <div className="space-y-1 text-[10px]">
              <div 
                onClick={() => navigateTo(['Poste de travail', 'Bureau'])}
                className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer"
              >
                <img src="/icons/folder.webp" alt="" className="w-3 h-3" />
                {t(COPY.desktop, currentLanguage)}
              </div>
              <div 
                onClick={() => navigateTo(['Poste de travail', 'Documents'])}
                className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer"
              >
                <img src="/icons/folder.webp" alt="" className="w-3 h-3" />
                {t(COPY.myDocuments, currentLanguage)}
              </div>
              <div 
                onClick={() => navigateTo(['Poste de travail'])}
                className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer"
              >
                <img src="/icons/folder.webp" alt="" className="w-3 h-3" />
                {t(COPY.myComputer, currentLanguage)}
              </div>
              <div 
                onClick={() => navigateTo(['Poste de travail', 'Réseau'])}
                className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer"
              >
                <img src="/icons/explorer.webp" alt="" className="w-3 h-3" />
                {t(COPY.networkFavorites, currentLanguage)}
              </div>
            </div>
          </div>

          {/* Détails de l'élément sélectionné */}
          {selectedItem && (
            <div className="bg-white/90 p-2">
              <h3 className="text-[11px] font-bold text-[#215dc6] mb-2">{t(COPY.detailsTitle, currentLanguage)}</h3>
              <div className="text-[10px] text-gray-700 space-y-1">
                <p className="truncate"><strong>{t(COPY.name, currentLanguage)}:</strong> {getDisplayName(selectedItem.name)}</p>
                <p><strong>{t(COPY.type, currentLanguage)}:</strong> {getTypeLabel(selectedItem.item.type)}</p>
                {selectedItem.item.size && <p><strong>{t(COPY.size, currentLanguage)}:</strong> {selectedItem.item.size}</p>}
                {selectedItem.item.modified && <p><strong>{t(COPY.modified, currentLanguage)}:</strong> {selectedItem.item.modified}</p>}
                {selectedItem.item.description && (
                  <p className="text-[9px] text-gray-500 mt-1">{selectedItem.item.description}</p>
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
            <div className="flex flex-wrap gap-2 p-3 content-start">
              {filteredItems.length > 0 ? (
                filteredItems.map(([name, item]) => (
                  <FileItem
                    key={name}
                    name={name}
                    label={getDisplayName(name)}
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
                    label={getDisplayName(name)}
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
            <table className="w-full text-xs">
              <thead className="bg-[#ece9d8] border-b border-[#808080] sticky top-0">
                <tr>
                  <th className="text-left p-1 font-medium">{t(COPY.name, currentLanguage)}</th>
                  <th className="text-left p-1 font-medium w-20">{t(COPY.size, currentLanguage)}</th>
                  <th className="text-left p-1 font-medium w-32">{t(COPY.type, currentLanguage)}</th>
                  <th className="text-left p-1 font-medium w-24">{t(COPY.modifiedOn, currentLanguage)}</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length > 0 ? (
                  filteredItems.map(([name, item], index) => (
                    <DetailsRow
                      key={name}
                      name={name}
                      label={getDisplayName(name)}
                      item={item}
                      typeLabel={getTypeLabel(item.type)}
                      isSelected={selectedItem?.name === name}
                      index={index}
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
      <div className="bg-[#ece9d8] border-t border-[#808080] px-2 py-1 text-[10px] text-gray-600 flex justify-between">
        <span>
          {filteredItems.length} {t(COPY.items, currentLanguage)}
          {selectedItem ? ` • "${getDisplayName(selectedItem.name)}" ${t(COPY.selected, currentLanguage)}` : ''}
        </span>
        <span>{pathString}</span>
      </div>
    </div>
  );
};
