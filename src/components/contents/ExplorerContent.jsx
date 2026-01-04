import { useState, useCallback } from 'react';

// Virtual file system structure
const fileSystem = {
  'C:': {
    type: 'drive',
    children: {
      'Mes Documents': {
        type: 'folder',
        children: {
          'Projets': {
            type: 'folder',
            children: {
              'RPG 2D': {
                type: 'folder',
                children: {
                  'main.py': { type: 'file', size: '15 Ko', modified: '2023-05-12' },
                  'game.py': { type: 'file', size: '28 Ko', modified: '2023-05-10' },
                  'sprites': {
                    type: 'folder',
                    children: {
                      'player.png': { type: 'file', size: '45 Ko', modified: '2023-04-20' },
                      'enemy.png': { type: 'file', size: '38 Ko', modified: '2023-04-20' },
                    }
                  },
                  'README.txt': { type: 'file', size: '2 Ko', modified: '2023-05-15' },
                }
              },
              'Soutenance': {
                type: 'folder',
                children: {
                  'index.php': { type: 'file', size: '8 Ko', modified: '2025-10-01' },
                  'style.css': { type: 'file', size: '12 Ko', modified: '2025-09-28' },
                  'database.sql': { type: 'file', size: '5 Ko', modified: '2025-09-15' },
                  'includes': {
                    type: 'folder',
                    children: {
                      'header.php': { type: 'file', size: '3 Ko', modified: '2025-09-20' },
                      'footer.php': { type: 'file', size: '2 Ko', modified: '2025-09-20' },
                    }
                  }
                }
              },
              'Reseau Social': {
                type: 'folder',
                children: {
                  'server.py': { type: 'file', size: '10 Ko', modified: '2024-05-01' },
                  'client.py': { type: 'file', size: '8 Ko', modified: '2024-05-01' },
                  'gui.py': { type: 'file', size: '15 Ko', modified: '2024-04-28' },
                }
              }
            }
          },
          'Images': {
            type: 'folder',
            children: {
              'photo1.jpg': { type: 'file', size: '1.2 Mo', modified: '2024-06-15' },
              'photo2.jpg': { type: 'file', size: '980 Ko', modified: '2024-06-15' },
              'wallpaper.jpg': { type: 'file', size: '2.5 Mo', modified: '2024-01-01' },
            }
          },
          'CV_Lucas.pdf': { type: 'file', size: '156 Ko', modified: '2025-11-01' },
          'notes.txt': { type: 'file', size: '4 Ko', modified: '2025-12-20' },
        }
      },
      'Program Files': {
        type: 'folder',
        children: {
          'Python': {
            type: 'folder',
            children: {
              'python.exe': { type: 'file', size: '45 Ko', modified: '2024-01-01' },
            }
          },
          'Visual Studio Code': {
            type: 'folder',
            children: {
              'Code.exe': { type: 'file', size: '120 Mo', modified: '2024-06-01' },
            }
          },
        }
      },
      'Windows': {
        type: 'folder',
        children: {
          'System32': {
            type: 'folder',
            children: {
              'notepad.exe': { type: 'file', size: '180 Ko', modified: '2001-10-25' },
              'cmd.exe': { type: 'file', size: '240 Ko', modified: '2001-10-25' },
            }
          }
        }
      },
    }
  }
};

const getIconForItem = (item, name) => {
  if (item.type === 'drive') return '/icons/explorer.png';
  if (item.type === 'folder') return '/icons/folder.png';
  
  const ext = name.split('.').pop().toLowerCase();
  switch (ext) {
    case 'py': return '/icons/setting.png';
    case 'php':
    case 'html':
    case 'css':
    case 'js': return '/icons/explorer.png';
    case 'txt':
    case 'pdf': return '/icons/questionMark.png';
    case 'jpg':
    case 'png':
    case 'gif': return '/icons/folder.png';
    case 'exe': return '/icons/setting.png';
    case 'sql': return '/icons/signal.png';
    default: return '/icons/questionMark.png';
  }
};

const ExplorerContent = () => {
  const [currentPath, setCurrentPath] = useState(['C:']);
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewMode, setViewMode] = useState('icons'); // 'icons', 'list', 'details'
  const [history, setHistory] = useState([['C:']]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const getCurrentFolder = useCallback(() => {
    let current = fileSystem;
    for (let i = 0; i < currentPath.length; i++) {
      const part = currentPath[i];
      if (i === 0) {
        current = current[part];
      } else {
        current = current.children[part];
      }
      if (!current) return null;
    }
    return current;
  }, [currentPath]);

  const navigateTo = useCallback((path) => {
    setCurrentPath(path);
    setSelectedItem(null);
    // Add to history
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

  const handleDoubleClick = useCallback((name, item) => {
    if (item.type === 'folder' || item.type === 'drive') {
      navigateTo([...currentPath, name]);
    } else {
      // File clicked - show alert
      alert(`Ouverture du fichier: ${name}\nType: ${item.type}\nTaille: ${item.size || 'N/A'}`);
    }
  }, [currentPath, navigateTo]);

  const currentFolder = getCurrentFolder();
  const items = currentFolder?.children || (currentPath.length === 0 ? fileSystem : {});
  const pathString = currentPath.join('\\');

  const sortedItems = Object.entries(items).sort((a, b) => {
    // Folders first, then files
    if ((a[1].type === 'folder' || a[1].type === 'drive') && b[1].type === 'file') return -1;
    if (a[1].type === 'file' && (b[1].type === 'folder' || b[1].type === 'drive')) return 1;
    return a[0].localeCompare(b[0]);
  });

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Menu Bar */}
      <div className="bg-gradient-to-b from-[#ece9d8] to-[#d4d0c8] border-b border-[#808080] px-2 py-1 flex gap-4 text-xs">
        <span className="text-gray-600 hover:underline cursor-pointer">Fichier</span>
        <span className="text-gray-600 hover:underline cursor-pointer">Édition</span>
        <span className="text-gray-600 hover:underline cursor-pointer">Affichage</span>
        <span className="text-gray-600 hover:underline cursor-pointer">Favoris</span>
        <span className="text-gray-600 hover:underline cursor-pointer">Outils</span>
        <span className="text-gray-600 hover:underline cursor-pointer">?</span>
      </div>

      {/* Toolbar */}
      <div className="bg-[#ece9d8] border-b border-[#808080] px-2 py-1 flex items-center gap-1">
        <button 
          onClick={goBack}
          disabled={historyIndex <= 0}
          className="xp-button px-2 py-0.5 text-xs flex items-center gap-1 disabled:opacity-50"
        >
          ← Précédent
        </button>
        <button 
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
          className="xp-button px-2 py-0.5 text-xs flex items-center gap-1 disabled:opacity-50"
        >
          Suivant →
        </button>
        <button 
          onClick={goUp}
          disabled={currentPath.length <= 1}
          className="xp-button px-2 py-0.5 text-xs flex items-center gap-1 disabled:opacity-50"
        >
          ↑ Dossier parent
        </button>
        <div className="w-px h-5 bg-[#808080] mx-1"></div>
        <button 
          onClick={() => setViewMode('icons')}
          className={`xp-button px-2 py-0.5 text-xs ${viewMode === 'icons' ? 'bg-[#d0d0d0]' : ''}`}
        >
          Icônes
        </button>
        <button 
          onClick={() => setViewMode('list')}
          className={`xp-button px-2 py-0.5 text-xs ${viewMode === 'list' ? 'bg-[#d0d0d0]' : ''}`}
        >
          Liste
        </button>
        <button 
          onClick={() => setViewMode('details')}
          className={`xp-button px-2 py-0.5 text-xs ${viewMode === 'details' ? 'bg-[#d0d0d0]' : ''}`}
        >
          Détails
        </button>
      </div>

      {/* Address Bar */}
      <div className="bg-[#ece9d8] border-b border-[#808080] px-2 py-1 flex items-center gap-2">
        <span className="text-xs text-gray-600">Adresse</span>
        <div className="flex-1 bg-white border border-[#7f9db9] px-2 py-0.5 text-xs flex items-center gap-1">
          <img src="/icons/folder.png" alt="" className="w-4 h-4" />
          <span>{pathString || 'Poste de travail'}</span>
        </div>
        <button className="xp-button px-2 py-0.5 text-xs">OK</button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-44 bg-gradient-to-b from-[#6b88c4] to-[#4d6eb5] p-2 overflow-y-auto flex-shrink-0">
          <div className="bg-white/90 rounded-lg p-2 mb-2">
            <h3 className="text-[11px] font-bold text-[#215dc6] mb-2">Gestion des fichiers</h3>
            <div className="space-y-1 text-[10px]">
              <div className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer">
                <span>→</span> Créer un dossier
              </div>
              <div className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer">
                <span>→</span> Publier sur le Web
              </div>
              <div className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer">
                <span>→</span> Partager ce dossier
              </div>
            </div>
          </div>

          <div className="bg-white/90 rounded-lg p-2 mb-2">
            <h3 className="text-[11px] font-bold text-[#215dc6] mb-2">Autres emplacements</h3>
            <div className="space-y-1 text-[10px]">
              <div 
                onClick={() => navigateTo(['C:', 'Mes Documents'])}
                className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer"
              >
                <img src="/icons/folder.png" alt="" className="w-3 h-3" />
                Mes Documents
              </div>
              <div 
                onClick={() => navigateTo(['C:'])}
                className="flex items-center gap-1 text-[#215dc6] hover:underline cursor-pointer"
              >
                <img src="/icons/explorer.png" alt="" className="w-3 h-3" />
                Poste de travail
              </div>
            </div>
          </div>

          {selectedItem && (
            <div className="bg-white/90 rounded-lg p-2">
              <h3 className="text-[11px] font-bold text-[#215dc6] mb-2">Détails</h3>
              <div className="text-[10px] text-gray-700 space-y-1">
                <p><strong>Nom:</strong> {selectedItem.name}</p>
                <p><strong>Type:</strong> {selectedItem.item.type === 'folder' ? 'Dossier' : 'Fichier'}</p>
                {selectedItem.item.size && <p><strong>Taille:</strong> {selectedItem.item.size}</p>}
                {selectedItem.item.modified && <p><strong>Modifié:</strong> {selectedItem.item.modified}</p>}
              </div>
            </div>
          )}
        </div>

        {/* File List Area */}
        <div className="flex-1 bg-white overflow-auto p-2">
          {viewMode === 'icons' && (
            <div className="flex flex-wrap gap-4 p-2">
              {sortedItems.map(([name, item]) => (
                <div
                  key={name}
                  onClick={() => setSelectedItem({ name, item })}
                  onDoubleClick={() => handleDoubleClick(name, item)}
                  className={`flex flex-col items-center w-20 p-2 rounded cursor-pointer ${
                    selectedItem?.name === name ? 'bg-[#316ac5] text-white' : 'hover:bg-[#e8f4fc]'
                  }`}
                >
                  <img src={getIconForItem(item, name)} alt="" className="w-10 h-10 mb-1" />
                  <span className={`text-[11px] text-center break-all ${selectedItem?.name === name ? 'text-white' : ''}`}>
                    {name}
                  </span>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'list' && (
            <div className="space-y-0.5">
              {sortedItems.map(([name, item]) => (
                <div
                  key={name}
                  onClick={() => setSelectedItem({ name, item })}
                  onDoubleClick={() => handleDoubleClick(name, item)}
                  className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer ${
                    selectedItem?.name === name ? 'bg-[#316ac5] text-white' : 'hover:bg-[#e8f4fc]'
                  }`}
                >
                  <img src={getIconForItem(item, name)} alt="" className="w-5 h-5" />
                  <span className="text-xs">{name}</span>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'details' && (
            <table className="w-full text-xs">
              <thead className="bg-[#ece9d8] border-b border-[#808080] sticky top-0">
                <tr>
                  <th className="text-left p-1 font-medium">Nom</th>
                  <th className="text-left p-1 font-medium">Taille</th>
                  <th className="text-left p-1 font-medium">Type</th>
                  <th className="text-left p-1 font-medium">Modifié le</th>
                </tr>
              </thead>
              <tbody>
                {sortedItems.map(([name, item], i) => (
                  <tr
                    key={name}
                    onClick={() => setSelectedItem({ name, item })}
                    onDoubleClick={() => handleDoubleClick(name, item)}
                    className={`cursor-pointer ${
                      selectedItem?.name === name 
                        ? 'bg-[#316ac5] text-white' 
                        : i % 2 === 0 ? 'bg-white hover:bg-[#e8f4fc]' : 'bg-[#f5f5f5] hover:bg-[#e8f4fc]'
                    }`}
                  >
                    <td className="p-1 flex items-center gap-2">
                      <img src={getIconForItem(item, name)} alt="" className="w-4 h-4" />
                      {name}
                    </td>
                    <td className="p-1">{item.size || '-'}</td>
                    <td className="p-1">{item.type === 'folder' ? 'Dossier' : 'Fichier'}</td>
                    <td className="p-1">{item.modified || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {sortedItems.length === 0 && (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              Ce dossier est vide
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#ece9d8] border-t border-[#808080] px-2 py-1 text-[10px] text-gray-600 flex justify-between">
        <span>{sortedItems.length} objet(s)</span>
        <span>{pathString}</span>
      </div>
    </div>
  );
};

export default ExplorerContent;
