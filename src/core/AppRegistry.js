/**
 * AppRegistry - Système SOLID pour gérer les applications
 * 
 * Principes appliqués :
 * - Single Responsibility : Le registry gère uniquement l'enregistrement et la récupération
 * - Open/Closed : On peut ajouter des apps sans modifier ce code
 * - Dependency Inversion : Les composants dépendent de l'abstraction (registry), pas des implémentations
 * 
 * Usage pour ajouter une nouvelle app :
 * 1. Créer le fichier dans src/apps/NomApp/index.js
 * 2. Exporter la config et le composant
 * 3. L'importer dans src/apps/index.js
 * 4. C'est tout !
 */

class AppRegistry {
  constructor() {
    this.apps = new Map();
  }

  /**
   * Enregistre une nouvelle application
   * @param {Object} appConfig - Configuration de l'application
   * @param {string} appConfig.id - Identifiant unique (requis)
   * @param {string} appConfig.name - Nom affiché (requis)
   * @param {string} appConfig.icon - Chemin vers l'icône (requis)
   * @param {React.ComponentType} [appConfig.component] - Composant React à afficher
   * @param {string} [appConfig.url] - URL externe (iframe)
   * @param {number} [appConfig.defaultWidth=600] - Largeur par défaut
   * @param {number} [appConfig.defaultHeight=450] - Hauteur par défaut
   * @param {Object} [appConfig.contentStyle] - Styles personnalisés pour le contenu
   * @param {boolean} [appConfig.showOnDesktop=true] - Afficher sur le bureau
   * @param {boolean} [appConfig.showInStartMenu=true] - Afficher dans le menu démarrer
   * @param {number} [appConfig.desktopOrder] - Ordre d'affichage sur le bureau
   */
  register(appConfig) {
    const { id } = appConfig;
    
    if (!id) {
      console.error('[AppRegistry] App must have an id');
      return;
    }

    if (this.apps.has(id)) {
      console.warn(`[AppRegistry] App "${id}" is being overwritten`);
    }

    // Valeurs par défaut
    const app = {
      defaultWidth: 600,
      defaultHeight: 450,
      showOnDesktop: true,
      showInStartMenu: true,
      contentStyle: {},
      desktopOrder: this.apps.size,
      ...appConfig,
    };

    this.apps.set(id, app);
    return this;
  }

  /**
   * Enregistre plusieurs applications en une fois
   * @param {Object[]} apps - Tableau de configurations
   */
  registerAll(apps) {
    apps.forEach(app => this.register(app));
    return this;
  }

  /**
   * Récupère une application par son ID
   * @param {string} id 
   * @returns {Object|null}
   */
  get(id) {
    return this.apps.get(id) || null;
  }

  /**
   * Récupère toutes les applications
   * @returns {Object[]}
   */
  getAll() {
    return Array.from(this.apps.values());
  }

  /**
   * Récupère les apps à afficher sur le bureau
   * @returns {Object[]}
   */
  getDesktopApps() {
    return this.getAll()
      .filter(app => app.showOnDesktop)
      .sort((a, b) => (a.desktopOrder ?? 999) - (b.desktopOrder ?? 999));
  }

  /**
   * Récupère les apps à afficher dans le menu démarrer
   * @returns {Object[]}
   */
  getStartMenuApps() {
    return this.getAll()
      .filter(app => app.showInStartMenu)
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Vérifie si une app existe
   * @param {string} id 
   * @returns {boolean}
   */
  has(id) {
    return this.apps.has(id);
  }

  /**
   * Supprime une application
   * @param {string} id 
   */
  unregister(id) {
    this.apps.delete(id);
    return this;
  }

  /**
   * Vide le registry (utile pour les tests)
   */
  clear() {
    this.apps.clear();
    return this;
  }
}

// Singleton - instance unique partagée
export const appRegistry = new AppRegistry();

export default appRegistry;
