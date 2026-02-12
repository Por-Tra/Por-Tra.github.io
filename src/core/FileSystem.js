/**
 * FileSystem - Système de fichiers virtuel
 * 
 * Gère la structure des fichiers et dossiers de l'explorateur.
 * Se synchronise automatiquement avec le AppRegistry pour le Bureau.
 */

import appRegistry from './AppRegistry';

class FileSystem {
  constructor() {
    this.root = 
    {
      'Poste de travail': {
        type: 'computer',
        icon: '/icons/computer.svg',
        children: {
          'Bureau': 
          {
            type: 'folder',
            icon: '/icons/folder.png',
            special: 'desktop', // Synchronisé avec le bureau
            children: {} // Rempli dynamiquement
          },
          'Documents': 
          {
            type: 'folder',
            icon: '/icons/document.svg',
            children: 
            {
              'Projets': 
              {
                type: 'folder',
                icon: '/icons/folder.png',
                children: 
                {
                  'RPG 2D (Python)': 
                  {
                    type: 'app',
                    icon: '/icons/folder.png',
                    appId: 'project-rpg',
                    description: 'Jeu RPG 2D développé en Python avec Pygame',
                    downloadFile: '/assets/RPG2D.zip',
                    downloadName: 'RPG2D.zip'
                  },
                  'Application Web (PHP)': 
                  {
                    type: 'app',
                    icon: '/icons/folder.png',
                    appId: 'project-soutenance',
                    description: 'Application web de gestion développée en PHP',
                    downloadFile: '/assets/Soutenance.zip',
                    downloadName: 'Soutenance.zip'
                  },
                  'Chat Réseau (Python)': 
                  {
                    type: 'app',
                    icon: '/icons/folder.png',
                    appId: 'project-reseau',
                    description: 'Application de messagerie en réseau local',
                    downloadFile: '/assets/ChatReseau.zip',
                    downloadName: 'ChatReseau.zip'
                  }
                }
              },
              'CV_Lucas.pdf': 
              {
                type: 'file',
                icon: '/icons/document.svg',
                size: '156 Ko',
                modified: '2025-11-01',
                downloadFile: '/assets/CV_Lucas.pdf',
                downloadName: 'CV_Lucas.pdf'
              }
            }
          },
          'Téléchargements': 
          {
            type: 'folder',
            icon: '/icons/folder.png',
            children: 
            {
              'The_Elder_Scrolls_2D.zip':
              {
                type: 'file',
                icon: '/icons/folder.png',
                size: '5.2 Mo',
                modified: '2026-02-12',
                downloadFile: '/assets/RPG.zip',
                downloadName: 'RPG.zip'
              },
              'RSL.zip':
              {
                type: 'file',
                icon: '/icons/folder.png',
                size: '1.8 Mo',
                modified: '2026-02-12',
                downloadFile: '/assets/Projet RSL.zip',
                downloadName: 'Projet RSL.zip'
              },
              'Application_Web_Notation.zip':
              {
                type: 'file',
                icon: '/icons/folder.png',
                size: '2.4 Mo',
                modified: '2026-02-12',
                downloadFile: '/assets/projet_sql-main.zip',
                downloadName: 'projet_sql-main.zip'
              }
            }
          },
          'Images': 
          {
            type: 'folder',
            icon: '/icons/folder.png',
            children: 
            {
              'Captures': 
              {
                type: 'folder',
                icon: '/icons/folder.png',
                children: 
                {
                  'The Elder Scrolls 2D':
                  {
                     type: 'folder',
                     icon: '/icons/folder.png',
                     children:
                     {
                        'capture1.png':
                        {
                          type: 'image',
                          icon: '/images/ProjectIMG/Proj1/1.png',
                          imageSrc: '/images/ProjectIMG/Proj1/1.png',
                          size: "209Ko",
                          modified: '2026-02-12'
                        },
                        'capture2.png':
                        {
                          type: 'image',
                          icon: '/images/ProjectIMG/Proj1/2.png',
                          imageSrc: '/images/ProjectIMG/Proj1/2.png',
                          size: "432Ko",
                          modified: '2026-02-12'
                        },
                        'capture3.png':
                        {
                          type: 'image',
                          icon: '/images/ProjectIMG/Proj1/3.png',
                          imageSrc: '/images/ProjectIMG/Proj1/3.png',
                          size: "357Ko",
                          modified: '2026-02-12'
                        }
                     }
                  },
                  'Application Web de notation':
                  {
                    type: 'folder',
                    icon: '/icons/folder.png',
                    children:
                    {
                      'capture1.png':
                      {
                        type: 'image',
                        icon: '/images/ProjectIMG/Proj2/1.png',
                        imageSrc: '/images/ProjectIMG/Proj2/1.png',
                        size: "74.1Ko",
                        modified: '2026-02-12'
                      },
                      'capture2.png':
                      {
                      type: 'image',
                      icon: '/images/ProjectIMG/Proj2/2.png',
                      imageSrc: '/images/ProjectIMG/Proj2/2.png',
                      size: "237Ko",
                      modified: '2026-02-12'
                      },
                      'capture3.png':
                      {
                        type: 'image',
                        icon: '/images/ProjectIMG/Proj2/3.png',
                        imageSrc: '/images/ProjectIMG/Proj2/3.png',
                        size: "211Ko",
                        modified: '2026-02-12'
                      }
                    }
                  },
                  'Réseau Social Local':
                  {
                    type: 'folder',
                    icon: '/icons/folder.png',
                    children:
                    {
                      'capture1.png':
                      {
                        type: 'image',
                        icon: '/images/ProjectIMG/Proj3/1.png',
                        imageSrc: '/images/ProjectIMG/Proj3/1.png',
                        size: "20.4Ko",
                        modified: '2026-02-12'
                      },
                      'capture2.png':
                      {
                        type: 'image',
                        icon: '/images/ProjectIMG/Proj3/2.png',
                        imageSrc: '/images/ProjectIMG/Proj3/2.png',
                        size: "6.49Ko",
                        modified: '2026-02-12'
                      },
                      'capture3.png':
                      {
                        type: 'image',
                        icon: '/images/ProjectIMG/Proj3/3.png',
                        imageSrc: '/images/ProjectIMG/Proj3/3.png',
                        size: "21.8Ko",
                        modified: '2026-02-12'
                      }
                    }
                  },
                  'Mycoria' :
                  {
                    type: 'folder',
                    icon: '/icons/folder.png',
                    children:
                    {
                      'capture1.png':
                      {
                        type: 'image',
                        icon: '/images/ProjectIMG/Proj-Mycoria/1.png',
                        imageSrc: '/images/ProjectIMG/Proj-Mycoria/1.png',
                        size: "1.4Mo",
                        modified: '2026-02-12'
                      },
                      'capture2.png':
                      {
                        type: 'image',
                        icon: '/images/ProjectIMG/Proj-Mycoria/2.png',
                        imageSrc: '/images/ProjectIMG/Proj-Mycoria/2.png',
                        size: "1.3Mo",
                        modified: '2026-02-12'
                      },
                      'capture3.png':
                      {
                        type: 'image',
                        icon: '/images/ProjectIMG/Proj-Mycoria/3.png',
                        imageSrc: '/images/ProjectIMG/Proj-Mycoria/3.png',
                        size: "1.46Mo",
                        modified: '2026-02-12'
                      },
                      'capture4.png':
                      {
                        type: 'image',
                        icon: '/images/ProjectIMG/Proj-Mycoria/4.png',
                        imageSrc: '/images/ProjectIMG/Proj-Mycoria/4.png',
                        size: "1.52Mo",
                        modified: '2026-02-12'
                      },
                      'capture5.png':
                      {
                        type: 'image',
                        icon: '/images/ProjectIMG/Proj-Mycoria/5.png',
                        imageSrc: '/images/ProjectIMG/Proj-Mycoria/5.png',
                        size: "1.38Mo",
                        modified: '2026-02-12'
                      },
                      'capture6.png':
                      {
                        type: 'image',
                        icon: '/images/ProjectIMG/Proj-Mycoria/6.png',
                        imageSrc: '/images/ProjectIMG/Proj-Mycoria/6.png',
                        size: "2.24Mo",
                        modified: '2026-02-12'
                      },
                      'capture7.png':
                      {
                        type: 'image',
                        icon: '/images/ProjectIMG/Proj-Mycoria/7.png',
                        imageSrc: '/images/ProjectIMG/Proj-Mycoria/7.png',
                        size: "2.15Mo",
                        modified: '2026-02-12'
                      },
                      'capture8.png':
                      {
                        type: 'image',
                        icon: '/images/ProjectIMG/Proj-Mycoria/8.png',
                        imageSrc: '/images/ProjectIMG/Proj-Mycoria/8.png',
                        size: "2.67Mo",
                        modified: '2026-02-12'
                      },
                      'capture9.png':
                      {
                        type: 'image',
                        icon: '/images/ProjectIMG/Proj-Mycoria/9.png',
                        imageSrc: '/images/ProjectIMG/Proj-Mycoria/9.png',
                        size: "1.66Mo",
                        modified: '2026-02-12'
                      },
                      'capture10.png':
                      {
                        type: 'image',
                        icon: '/images/ProjectIMG/Proj-Mycoria/10.png',
                        imageSrc: '/images/ProjectIMG/Proj-Mycoria/10.png',
                        size: "1.58Mo",
                        modified: '2026-02-12'
                      },
                      'capture11.png':
                      {
                        type: 'image',
                        icon: '/images/ProjectIMG/Proj-Mycoria/11.png',
                        imageSrc: '/images/ProjectIMG/Proj-Mycoria/11.png',
                        size: "388Ko",
                        modified: '2026-02-12'
                      },
                      'capture12.png':
                      {
                        type: 'image',
                        icon: '/images/ProjectIMG/Proj-Mycoria/12.png',
                        imageSrc: '/images/ProjectIMG/Proj-Mycoria/12.png',
                        size: "454Ko",
                        modified: '2026-02-12'
                      }
                    }
                  },
                  'Vapeur':
                  {
                    type: 'folder',
                    icon: '/icons/folder.png',
                    children:
                    {
                      'capture1.png':
                      {
                        type: 'image',
                        icon: '/images/ProjectIMG/Proj-Vapeur/1.png',
                        imageSrc: '/images/ProjectIMG/Proj-Vapeur/1.png',
                        size: "243Ko",
                        modified: '2026-02-12'
                      },
                      'capture2.png':
                      {
                        type: 'image',
                        icon: '/images/ProjectIMG/Proj-Vapeur/2.png',
                        imageSrc: '/images/ProjectIMG/Proj-Vapeur/2.png',
                        size: "362Ko",
                        modified: '2026-02-12'
                      },
                      'capture3.png':
                      {
                        type: 'image',
                        icon: '/images/ProjectIMG/Proj-Vapeur/3.png',
                        imageSrc: '/images/ProjectIMG/Proj-Vapeur/3.png',
                        size: "263Ko",
                        modified: '2026-02-12'
                      },
                      'capture4.png':
                      {
                        type: 'image',
                        icon: '/images/ProjectIMG/Proj-Vapeur/4.png',
                        imageSrc: '/images/ProjectIMG/Proj-Vapeur/4.png',
                        size: "214Ko",
                        modified: '2026-02-12'
                      },
                      'capture5.png':
                      {
                        type: 'image',
                        icon: '/images/ProjectIMG/Proj-Vapeur/5.png',
                        imageSrc: '/images/ProjectIMG/Proj-Vapeur/5.png',
                        size: "198Ko",
                        modified: '2026-02-12'
                      }

                    }
                  }


                }
              },
              'Wallpapers': 
              {
                type: 'folder',
                icon: '/icons/folder.png',
                children: {
                  'Dog.jpg' :
                  {
                    type: 'image',
                    icon: '/images/wallpapers/dog.jpg',
                    imageSrc: '/images/wallpapers/dog.jpg',
                    size: "329Ko",
                    modified: '2026-02-12'
                  },
                  "Win11Dark.jpg" :
                  {
                    type: 'image',
                    icon: '/images/wallpapers/Win11Dark.jpg',
                    imageSrc: '/images/wallpapers/Win11Dark.jpg',
                    size: "269Ko",
                    modified: '2026-02-12'
                  },
                  'winXPDark.jpeg' :
                  {
                    type: 'image',
                    icon: '/images/wallpapers/winXPDark.jpeg',
                    imageSrc: '/images/wallpapers/winXPDark.jpeg',
                    size: "78.8Ko",
                    modified: '2026-02-12'
                  }
                }
              }
            }
          },
          'Réseau': 
          {
            type: 'folder',
            icon: '/icons/explorer.png',
            children: 
            {
              'GitHub': 
              {
                type: 'link',
                icon: '/icons/github.svg',
                url: 'https://github.com/Por-Tra',
                description: 'Mon profil GitHub'
              },
              'LinkedIn': 
              {
                type: 'link',
                icon: '/icons/linkedin.svg',
                url: 'https://www.linkedin.com/in/lucas-contreras-hodapp/',
                description: 'Mon profil LinkedIn'
              }
            }
          },
          'Disque local (C:)': 
          {
            type: 'drive',
            icon: '/icons/PC.ico',
            children: 
            {
              'Program Files': 
              {
                type: 'folder',
                icon: '/icons/folder.png',
                children: {
                  'Python 3.11': 
                  {
                    type: 'folder',
                    icon: '/icons/folder.png',
                    children: {
                      'python.exe': { type: 'file', icon: '/icons/setting.png', size: '45 Ko', modified: '2024-01-01' }
                    }
                  },
                  'Visual Studio Code': 
                  {
                    type: 'folder',
                    icon: '/icons/folder.png',
                    children: {
                      'Code.exe': 
                      { 
                        type: 'file', 
                        icon: '/icons/setting.png', 
                        size: '120 Mo', 
                        modified: '2024-06-01'
                      }
                    }
                  }
                }
              },
              'Windows': 
              {
                type: 'folder',
                icon: '/icons/folder.png',
                children: 
                {
                  'System32': 
                  {
                    type: 'folder',
                    icon: '/icons/folder.png',
                    children: 
                    {
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
