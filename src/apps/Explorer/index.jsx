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

export const config = {
  id: 'explorer',
  name: 'Poste de travail',
  icon: '/icons/PC.ico',
  defaultWidth: 750,
  defaultHeight: 520,
};

// Composant pour un élément dans l'explorateur
const FileItem = memo(({ name, item, isSelected, viewMode, onSelect, onDoubleClick, highlightText }) => {
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
          {highlightText ? highlightText(name) : name}
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
        <span className="text-xs truncate">{highlightText ? highlightText(name) : name}</span>
      </div>
    );
  }
  
  return null;
});

FileItem.displayName = 'FileItem';

// Composant pour la vue détaillée
const DetailsRow = memo(({ name, item, isSelected, index, onSelect, onDoubleClick, highlightText }) => {
  const icon = fileSystem.getIcon(item, name);
  const typeLabels = {
    folder: 'Dossier de fichiers',
    drive: 'Disque local',
    computer: 'Poste de travail',
    file: 'Fichier',
    app: 'Raccourci application',
    image: 'Fichier image',
    link: 'Raccourci Internet'
  };
  
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
        <span className="truncate">{highlightText ? highlightText(name) : name}</span>
      </td>
      <td className="p-1">{item.size || '-'}</td>
      <td className="p-1">{typeLabels[item.type] || 'Inconnu'}</td>
      <td className="p-1">{item.modified || '-'}</td>
    </tr>
  );
});

DetailsRow.displayName = 'DetailsRow';

export const Component = ({ onOpenApp }) => {
  const [currentPath, setCurrentPath] = useState(['Poste de travail']);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewMode, setViewMode] = useState('icons');
  const [history, setHistory] = useState([['Poste de travail']]);
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
    return filterItems(sortedItems, ([name]) => name);
  }, [sortedItems, query]);

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

    // Ouverture d'une application
    if (item.type === 'app' && item.appId && onOpenApp) {
      onOpenApp(item.appId);
      return;
    }

    // Ouverture d'une image
    if (item.type === 'image' && item.imageSrc && onOpenApp) {
      onOpenApp('image-viewer', { 
        imageSrc: item.imageSrc, 
        imageName: name,
        windowTitle: `Aperçu - ${name}`
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
    alert(`Fichier: ${name}\nType: ${item.type}\nTaille: ${item.size || 'N/A'}`);
  }, [currentPath, navigateTo, onOpenApp]);

  const handleSelect = useCallback((name, item) => {
    setSelectedItem({ name, item });
  }, []);

  // Chemin affiché
  const pathString = currentPath.join(' > ');

  return (
    <div className="h-full bg-white flex flex-col select-none">
      {/* Menu Bar */}
      <XpMenuBar
        preset="explorer"
        className="bg-gradient-to-b from-[#ece9d8] to-[#d4d0c8] border-b border-[#808080] px-2 py-1 flex gap-4 text-xs"
        itemClassName="text-gray-600 hover:underline cursor-pointer"
      />

      {/* Toolbar */}
      <div className="bg-[#ece9d8] border-b border-[#808080] px-2 py-1 flex items-center gap-1">
        <button 
          onClick={goBack}
          disabled={historyIndex <= 0}
          className="xp-button px-2 py-0.5 text-xs flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Précédent"
        >
          ← Précédent
        </button>
        <button 
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
          className="xp-button px-2 py-0.5 text-xs flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Suivant"
        >
          Suivant →
        </button>
        <button 
          onClick={goUp}
          disabled={currentPath.length <= 1}
          className="xp-button px-2 py-0.5 text-xs flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Dossier parent"
        >
          ↑
        </button>
        <div className="w-px h-5 bg-[#808080] mx-1"></div>
        <button 
          onClick={() => setViewMode('icons')}
          className={`xp-button px-2 py-0.5 text-xs ${viewMode === 'icons' ? 'bg-[#c0c0c0]' : ''}`}
          title="Icônes"
        >
          ☐
        </button>
        <button 
          onClick={() => setViewMode('list')}
          className={`xp-button px-2 py-0.5 text-xs ${viewMode === 'list' ? 'bg-[#c0c0c0]' : ''}`}
          title="Liste"
        >
          ≡
        </button>
        <button 
          onClick={() => setViewMode('details')}
          className={`xp-button px-2 py-0.5 text-xs ${viewMode === 'details' ? 'bg-[#c0c0c0]' : ''}`}
          title="Détails"
        >
          ⊞
        </button>
      </div>

      {/* Address Bar */}
      <div className="bg-[#ece9d8] border-b border-[#808080] px-2 py-1 flex items-center gap-2">
        <span className="text-xs text-gray-600 shrink-0">Adresse</span>
        <div className="flex-1 bg-white border border-[#7f9db9] px-2 py-0.5 text-xs flex items-center gap-1 min-w-0">
          <img src={currentFolder?.icon || '/icons/folder.png'} alt="" className="w-4 h-4 shrink-0" />
          <span className="truncate">{pathString}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-44 bg-gradient-to-b from-[#6b88c4] to-[#4d6eb5] p-2 overflow-y-auto flex-shrink-0">
          {/* Tâches système */}
          <div className="bg-white/90 p-2 mb-2">
            <h3 className="text-[11px] font-bold text-[#215dc6] mb-2">Tâches système</h3>
            <div className="space-y-1 text-[10px]">
              {selectedItem?.item?.downloadFile && (
                <div 
                  onClick={() => handleDoubleClick(selectedItem.name, selectedItem.item)}
                  className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer"
                >
                  <span></span> Télécharger
                </div>
              )}
              {selectedItem?.item?.type === 'app' && (
                <div 
                  onClick={() => handleDoubleClick(selectedItem.name, selectedItem.item)}
                  className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer"
                >
                  <span></span> Ouvrir
                </div>
              )}
            </div>
          </div>

          {/* Raccourcis */}
          <div className="bg-white/90 p-2 mb-2">
            <h3 className="text-[11px] font-bold text-[#215dc6] mb-2">Autres emplacements</h3>
            <div className="space-y-1 text-[10px]">
              <div 
                onClick={() => navigateTo(['Poste de travail', 'Bureau'])}
                className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer"
              >
                <img src="/icons/folder.png" alt="" className="w-3 h-3" />
                Bureau
              </div>
              <div 
                onClick={() => navigateTo(['Poste de travail', 'Documents'])}
                className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer"
              >
                <img src="/icons/document.svg" alt="" className="w-3 h-3" />
                Mes Documents
              </div>
              <div 
                onClick={() => navigateTo(['Poste de travail'])}
                className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer"
              >
                <img src="/icons/computer.svg" alt="" className="w-3 h-3" />
                Poste de travail
              </div>
              <div 
                onClick={() => navigateTo(['Poste de travail', 'Réseau'])}
                className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer"
              >
                <img src="/icons/explorer.png" alt="" className="w-3 h-3" />
                Favoris réseau
              </div>
            </div>
          </div>

          {/* Détails de l'élément sélectionné */}
          {selectedItem && (
            <div className="bg-white/90 p-2">
              <h3 className="text-[11px] font-bold text-[#215dc6] mb-2">Détails</h3>
              <div className="text-[10px] text-gray-700 space-y-1">
                <p className="truncate"><strong>Nom:</strong> {selectedItem.name}</p>
                <p><strong>Type:</strong> {selectedItem.item.type}</p>
                {selectedItem.item.size && <p><strong>Taille:</strong> {selectedItem.item.size}</p>}
                {selectedItem.item.modified && <p><strong>Modifié:</strong> {selectedItem.item.modified}</p>}
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
                  {isSearching ? 'Aucun fichier ne correspond à votre recherche' : 'Ce dossier est vide'}
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
                  {isSearching ? 'Aucun fichier ne correspond à votre recherche' : 'Ce dossier est vide'}
                </div>
              )}
            </div>
          )}

          {viewMode === 'details' && (
            <table className="w-full text-xs">
              <thead className="bg-[#ece9d8] border-b border-[#808080] sticky top-0">
                <tr>
                  <th className="text-left p-1 font-medium">Nom</th>
                  <th className="text-left p-1 font-medium w-20">Taille</th>
                  <th className="text-left p-1 font-medium w-32">Type</th>
                  <th className="text-left p-1 font-medium w-24">Modifié le</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length > 0 ? (
                  filteredItems.map(([name, item], index) => (
                    <DetailsRow
                      key={name}
                      name={name}
                      item={item}
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
                      {isSearching ? 'Aucun fichier ne correspond à votre recherche' : 'Ce dossier est vide'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {filteredItems.length === 0 && viewMode !== 'icons' && viewMode !== 'list' && viewMode !== 'details' &&
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              Ce dossier est vide
            </div>
          }
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#ece9d8] border-t border-[#808080] px-2 py-1 text-[10px] text-gray-600 flex justify-between">
        <span>{filteredItems.length} objet(s){selectedItem ? ` • "${selectedItem.name}" sélectionné` : ''}</span>
        <span>{pathString}</span>
      </div>
    </div>
  );
};
