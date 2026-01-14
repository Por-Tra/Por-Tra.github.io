/**
 * FileSystem - Système de fichiers virtuel
 * 
 * Gère la structure des fichiers et dossiers de l'explorateur.
 * Se synchronise automatiquement avec le AppRegistry pour le Bureau.
 */

import appRegistry from './AppRegistry';

class FileSystem {
  constructor() {
    this.root = {
      'Poste de travail': {
        type: 'computer',
        icon: '/icons/computer.svg',
        children: {
          'Bureau': {
            type: 'folder',
            icon: '/icons/folder.png',
            special: 'desktop', // Synchronisé avec le bureau
            children: {} // Rempli dynamiquement
          },
          'Documents': {
            type: 'folder',
            icon: '/icons/document.svg',
            children: {
              'Projets': {
                type: 'folder',
                icon: '/icons/folder.png',
                children: {
                  'RPG 2D (Python)': {
                    type: 'app',
                    icon: '/icons/folder.png',
                    appId: 'project-rpg',
                    description: 'Jeu RPG 2D développé en Python avec Pygame',
                    downloadFile: '/assets/RPG2D.zip',
                    downloadName: 'RPG2D.zip'
                  },
                  'Application Web (PHP)': {
                    type: 'app',
                    icon: '/icons/folder.png',
                    appId: 'project-soutenance',
                    description: 'Application web de gestion développée en PHP',
                    downloadFile: '/assets/Soutenance.zip',
                    downloadName: 'Soutenance.zip'
                  },
                  'Chat Réseau (Python)': {
                    type: 'app',
                    icon: '/icons/folder.png',
                    appId: 'project-reseau',
                    description: 'Application de messagerie en réseau local',
                    downloadFile: '/assets/ChatReseau.zip',
                    downloadName: 'ChatReseau.zip'
                  }
                }
              },
              'CV_Lucas.pdf': {
                type: 'file',
                icon: '/icons/document.svg',
                size: '156 Ko',
                modified: '2025-11-01',
                downloadFile: '/assets/CV_Lucas.pdf',
                downloadName: 'CV_Lucas.pdf'
              }
            }
          },
          'Téléchargements': {
            type: 'folder',
            icon: '/icons/folder.png',
            children: {}
          },
          'Images': {
            type: 'folder',
            icon: '/icons/folder.png',
            children: {
              'Captures': {
                type: 'folder',
                icon: '/icons/folder.png',
                children: {
                  'screenshot_rpg.svg': {
                    type: 'image',
                    icon: '/icons/folder.png',
                    imageSrc: '/images/screenshots/rpg.svg',
                    size: '245 Ko',
                    modified: '2024-06-15'
                  },
                  'screenshot_chat.svg': {
                    type: 'image',
                    icon: '/icons/folder.png',
                    imageSrc: '/images/screenshots/chat.svg',
                    size: '180 Ko',
                    modified: '2024-05-20'
                  },
                  'screenshot_web.svg': {
                    type: 'image',
                    icon: '/icons/folder.png',
                    imageSrc: '/images/screenshots/web.svg',
                    size: '320 Ko',
                    modified: '2025-10-01'
                  }
                }
              },
              'Wallpapers': {
                type: 'folder',
                icon: '/icons/folder.png',
                children: {
                  'bliss.svg': {
                    type: 'image',
                    icon: '/icons/folder.png',
                    imageSrc: '/images/wallpapers/bliss.svg',
                    size: '1.2 Mo',
                    modified: '2001-10-25'
                  },
                  'xp_hills.svg': {
                    type: 'image',
                    icon: '/icons/folder.png',
                    imageSrc: '/images/wallpapers/xp_hills.svg',
                    size: '890 Ko',
                    modified: '2001-10-25'
                  }
                }
              }
            }
          },
          'Réseau': {
            type: 'folder',
            icon: '/icons/internet.svg',
            children: {
              'GitHub': {
                type: 'link',
                icon: '/icons/github.svg',
                url: 'https://github.com/lucasomusic',
                description: 'Mon profil GitHub'
              },
              'LinkedIn': {
                type: 'link',
                icon: '/icons/linkedin.svg',
                url: 'https://linkedin.com/in/lucas',
                description: 'Mon profil LinkedIn'
              }
            }
          },
          'Disque local (C:)': {
            type: 'drive',
            icon: '/icons/explorer.png',
            children: {
              'Program Files': {
                type: 'folder',
                icon: '/icons/folder.png',
                children: {
                  'Python 3.11': {
                    type: 'folder',
                    icon: '/icons/folder.png',
                    children: {
                      'python.exe': { type: 'file', icon: '/icons/setting.png', size: '45 Ko', modified: '2024-01-01' }
                    }
                  },
                  'Visual Studio Code': {
                    type: 'folder',
                    icon: '/icons/folder.png',
                    children: {
                      'Code.exe': { type: 'file', icon: '/icons/setting.png', size: '120 Mo', modified: '2024-06-01' }
                    }
                  }
                }
              },
              'Windows': {
                type: 'folder',
                icon: '/icons/folder.png',
                children: {
                  'System32': {
                    type: 'folder',
                    icon: '/icons/folder.png',
                    children: {
                      'notepad.exe': { type: 'file', icon: '/icons/notepad.svg', size: '180 Ko', modified: '2001-10-25' },
                      'cmd.exe': { type: 'file', icon: '/icons/setting.png', size: '240 Ko', modified: '2001-10-25' }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
  }

  /**
   * Récupère le contenu du Bureau depuis le AppRegistry
   */
  getDesktopItems() {
    const desktopApps = appRegistry.getDesktopApps();
    const items = {};
    
    desktopApps.forEach(app => {
      items[app.name] = {
        type: 'app',
        icon: app.icon,
        appId: app.id,
        description: `Application: ${app.name}`
      };
    });
    
    return items;
  }

  /**
   * Navigue vers un chemin et retourne le contenu
   * @param {string[]} path - Tableau représentant le chemin
   * @returns {object|null} - Contenu du dossier ou null si non trouvé
   */
  getFolder(path) {
    if (path.length === 0) {
      return this.root;
    }

    let current = this.root;
    
    for (let i = 0; i < path.length; i++) {
      const part = path[i];
      
      if (i === 0) {
        current = current[part];
      } else {
        current = current?.children?.[part];
      }
      
      if (!current) return null;
      
      // Si c'est le dossier Bureau, injecter les apps dynamiquement
      if (current.special === 'desktop' && i === path.length - 1) {
        return {
          ...current,
          children: this.getDesktopItems()
        };
      }
    }
    
    return current;
  }

  /**
   * Récupère un élément spécifique par son chemin complet
   * @param {string[]} path - Chemin vers l'élément
   * @param {string} name - Nom de l'élément
   * @returns {object|null}
   */
  getItem(path, name) {
    const folder = this.getFolder(path);
    if (!folder?.children) return null;
    return folder.children[name] || null;
  }

  /**
   * Retourne l'icône appropriée pour un type de fichier
   * @param {object} item - L'élément
   * @param {string} name - Nom de l'élément
   * @returns {string} - Chemin de l'icône
   */
  getIcon(item, name) {
    if (item.icon) return item.icon;
    
    if (item.type === 'drive') return '/icons/explorer.png';
    if (item.type === 'folder') return '/icons/folder.png';
    if (item.type === 'computer') return '/icons/computer.svg';
    if (item.type === 'app') return '/icons/setting.png';
    if (item.type === 'image') return '/icons/folder.png';
    if (item.type === 'link') return '/icons/link.png';
    
    // Icône basée sur l'extension
    const ext = name.split('.').pop().toLowerCase();
    const iconMap = {
      'py': '/icons/setting.png',
      'php': '/icons/explorer.png',
      'html': '/icons/explorer.png',
      'css': '/icons/explorer.png',
      'js': '/icons/explorer.png',
      'txt': '/icons/notepad.svg',
      'pdf': '/icons/document.svg',
      'jpg': '/icons/folder.png',
      'jpeg': '/icons/folder.png',
      'png': '/icons/folder.png',
      'gif': '/icons/folder.png',
      'exe': '/icons/setting.png',
      'sql': '/icons/signal.png',
      'zip': '/icons/folder.png'
    };
    
    return iconMap[ext] || '/icons/questionMark.png';
  }

  /**
   * Vérifie si un élément peut contenir des enfants (dossier, lecteur, etc.)
   * @param {object} item
   * @returns {boolean}
   */
  isNavigable(item) {
    return ['folder', 'drive', 'computer'].includes(item.type);
  }
}

// Singleton
const fileSystem = new FileSystem();
export default fileSystem;
