/**
 * Point d'entrée pour toutes les applications
 * 
 * ========================================
 * COMMENT AJOUTER UNE NOUVELLE APP :
 * ========================================
 * 
 * 1. Créer un dossier dans src/apps/NomDeVotreApp/
 * 2. Créer index.jsx avec la config et le composant
 * 3. Importer et enregistrer ici
 * 
 * Exemple minimal :
 * ```jsx
 * // src/apps/MonApp/index.jsx
 * export const config = {
 *   id: 'mon-app',           // ID unique (requis)
 *   name: 'Mon Application', // Nom affiché (requis)
 *   icon: '/icons/folder.png', // Icône (requis)
 *   defaultWidth: 600,       // Largeur par défaut
 *   defaultHeight: 450,      // Hauteur par défaut
 * };
 * 
 * export const Component = () => (
 *   <div className="h-full p-4 bg-white">
 *     Hello World!
 *   </div>
 * );
 * ```
 * 
 * Puis ici, ajouter :
 * ```js
 * import * as MonApp from './MonApp';
 * // ... dans le tableau apps :
 * { ...MonApp.config, component: MonApp.Component, desktopOrder: X },
 * ```
 * 
 * ========================================
 * OPTIONS DE CONFIGURATION :
 * ========================================
 * 
 * - id: string              → Identifiant unique (REQUIS)
 * - name: string            → Nom affiché (REQUIS)
 * - icon: string            → Chemin vers l'icône (REQUIS)
 * - component: Component    → Composant React à afficher
 * - url: string             → URL externe (ouvre dans iframe)
 * - openExternal: boolean   → Ouvre dans un nouvel onglet (false)
 * - defaultWidth: number    → Largeur par défaut (600)
 * - defaultHeight: number   → Hauteur par défaut (450)
 * - showOnDesktop: boolean  → Afficher sur le bureau (true)
 * - showInStartMenu: boolean → Afficher dans le menu démarrer (true)
 * - desktopOrder: number    → Ordre d'affichage sur le bureau
 * - contentStyle: object    → Styles CSS pour le conteneur
 * 
 */

import appRegistry from '../core/AppRegistry';

// =========================================
// IMPORT DES APPLICATIONS
// =========================================

// Apps principales
import * as Welcome from './Welcome';
import * as About from './About';
import * as Parcours from './Parcours';
import * as Projects from './Projects';
import * as Skills from './Skills';
import * as Contact from './Contact';

// Apps utilitaires
import * as Chess from './Chess';
import * as Explorer from './Explorer';
import * as ImageViewer from './ImageViewer';
import * as ControlPanel from './ControlPanel';
import * as Blank from './utilities/Blank';
import * as Terminal from './Terminal';

// Projets détaillés
import * as ProjectRPG from './Projects/ProjectRPG';
import * as ProjectSoutenance from './Projects/ProjectSoutenance';
import * as ProjectReseau from './Projects/ProjectReseau';
import * as ProjectMycoria from './Projects/ProjectMycoria';
import * as ProjectVapeur from './Projects/ProjectVapeur';

// =========================================
// ENREGISTREMENT DES APPLICATIONS
// L'ordre dans ce tableau = ordre sur le bureau
// =========================================

const apps = [
  // ===== APPS PRINCIPALES (sur le bureau) =====
  { ...Welcome.config, component: Welcome.Component, desktopOrder: 0 },
  { ...About.config, component: About.Component, desktopOrder: 1 },
  { ...Parcours.config, component: Parcours.Component, desktopOrder: 2 },
  { ...Projects.config, component: Projects.Component, desktopOrder: 3 },
  { ...Skills.config, component: Skills.Component, desktopOrder: 4 },
  { ...Contact.config, component: Contact.Component, desktopOrder: 5 },
  
  // ===== LIENS EXTERNES =====
  {
    id: 'github',
    name: 'GitHub',
    icon: '/icons/git.png',
    url: 'https://github.com/Por-Tra',
    openExternal: true,
    defaultWidth: 900,
    defaultHeight: 600,
    desktopOrder: 6,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: '/icons/link.png',
    url: 'https://linkedin.com/in/lucas-contreras-hodapp',
    openExternal: true,
    defaultWidth: 900,
    defaultHeight: 600,
    desktopOrder: 7,
  },
  { ...Terminal.config, component: Terminal.Component, desktopOrder: 8 },
  {
    id : 'google',
    name: 'Explorer',
    icon: '/icons/explorer.png',
    url: 'https://www.google.com',
    openExternal: true,
    defaultWidth: 900,
    defaultHeight: 600,
    desktopOrder: 9,
  },
  
  // ===== UTILITAIRES =====
  { ...Explorer.config, component: Explorer.Component, desktopOrder: 10 },
  { ...ControlPanel.config, component: ControlPanel.Component, desktopOrder: 11 },
  { ...Chess.config, component: Chess.Component, desktopOrder: 12 },
  { 
    ...Blank.config, 
    component: Blank.Component,
    id: 'trash',
    name: 'Corbeille',
    icon: '/icons/trash.png',
    desktopOrder: 13,
  },
  
  // ===== PROJETS (sur le bureau) =====
  { ...ProjectRPG.config, component: ProjectRPG.Component, desktopOrder: 14 },
  { ...ProjectSoutenance.config, component: ProjectSoutenance.Component, desktopOrder: 15 },
  { ...ProjectReseau.config, component: ProjectReseau.Component, desktopOrder: 16 },
  { ...ProjectMycoria.config, component: ProjectMycoria.Component, desktopOrder: 17 },
  { ...ProjectVapeur.config, component: ProjectVapeur.Component, desktopOrder: 18 },
  
  // ===== APPS UTILITAIRES (pas sur le bureau) =====
  { ...ImageViewer.config, component: ImageViewer.Component },
  
  // ===== APPS SYSTÈME (pas sur le bureau) =====
  // { 
  //   ...Blank.config, 
  //   component: Blank.Component,
  //   id: 'settings',
  //   name: 'Paramètres',
  //   icon: '/icons/setting.png',
  //   showOnDesktop: false,
  // },
  // { 
  //   ...Blank.config, 
  //   component: Blank.Component,
  //   id: 'network',
  //   name: 'Connexions réseau',
  //   icon: '/icons/signal.png',
  //   showOnDesktop: false,
  // },
];

// Enregistrement dans le registry
appRegistry.registerAll(apps);

export default appRegistry;
