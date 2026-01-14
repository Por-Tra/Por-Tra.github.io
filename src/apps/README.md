# Architecture SOLID pour les Applications

Ce document explique comment ajouter, modifier et supprimer des applications dans le portfolio.

## 🏗️ Structure des dossiers

```
src/
├── apps/                    # Toutes les applications
│   ├── index.js            # Point d'entrée - Enregistrement des apps
│   ├── Welcome/            # App de bienvenue
│   │   └── index.jsx
│   ├── About/              # Page À propos
│   │   └── index.jsx
│   ├── Projects/           # Liste des projets
│   │   └── index.jsx
│   ├── projects/           # Apps de détail des projets
│   │   ├── index.js
│   │   ├── ProjectRPG/
│   │   ├── ProjectSoutenance/
│   │   └── ProjectReseau/
│   └── utilities/          # Apps utilitaires (Blank, etc.)
│       └── Blank/
├── core/                   # Système central
│   ├── AppRegistry.js      # Gestionnaire d'applications
│   └── AppContent.jsx      # Rendu du contenu des fenêtres
└── components/             # Composants UI (ne pas modifier)
    ├── Desktop.jsx
    ├── Window.jsx
    └── ...
```

## ➕ Ajouter une nouvelle application

### Étape 1 : Créer le dossier de l'app

Créez un nouveau dossier dans `src/apps/` avec le nom de votre application :

```
src/apps/MonApp/
└── index.jsx
```

### Étape 2 : Créer le fichier index.jsx

```jsx
/**
 * Application: MonApp
 * 
 * Description de votre application
 */

// Configuration de l'application (REQUIS)
export const config = {
  id: 'mon-app',              // ID unique (REQUIS)
  name: 'Mon Application',    // Nom affiché (REQUIS)
  icon: '/icons/folder.png',  // Icône (REQUIS)
  defaultWidth: 600,          // Largeur par défaut
  defaultHeight: 450,         // Hauteur par défaut
};

// Composant de l'application (REQUIS)
export const Component = () => {
  return (
    <div className="h-full bg-white p-4">
      <h1>Hello World!</h1>
      <p>Contenu de mon application</p>
    </div>
  );
};
```

### Étape 3 : Enregistrer l'application

Dans `src/apps/index.js`, ajoutez :

```jsx
// Import de l'application
import * as MonApp from './MonApp';

// Dans le tableau apps, ajoutez :
const apps = [
  // ... autres apps
  { ...MonApp.config, component: MonApp.Component, desktopOrder: 15 },
];
```

## ⚙️ Options de configuration

| Option | Type | Requis | Défaut | Description |
|--------|------|--------|--------|-------------|
| `id` | string | ✅ | - | Identifiant unique de l'app |
| `name` | string | ✅ | - | Nom affiché dans l'interface |
| `icon` | string | ✅ | - | Chemin vers l'icône |
| `component` | Component | ❌ | - | Composant React à afficher |
| `url` | string | ❌ | - | URL externe (ouvre dans iframe) |
| `defaultWidth` | number | ❌ | 600 | Largeur par défaut de la fenêtre |
| `defaultHeight` | number | ❌ | 450 | Hauteur par défaut de la fenêtre |
| `showOnDesktop` | boolean | ❌ | true | Afficher l'icône sur le bureau |
| `showInStartMenu` | boolean | ❌ | true | Afficher dans le menu démarrer |
| `desktopOrder` | number | ❌ | auto | Ordre d'affichage sur le bureau |
| `contentStyle` | object | ❌ | {} | Styles CSS personnalisés pour le contenu |

## 📝 Exemples

### Application simple

```jsx
export const config = {
  id: 'hello',
  name: 'Hello World',
  icon: '/icons/note.png',
};

export const Component = () => (
  <div className="h-full flex items-center justify-center bg-white">
    <h1 className="text-2xl">Hello World!</h1>
  </div>
);
```

### Application avec état

```jsx
import { useState } from 'react';

export const config = {
  id: 'counter',
  name: 'Compteur',
  icon: '/icons/setting.png',
  defaultWidth: 300,
  defaultHeight: 200,
};

export const Component = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div className="h-full flex flex-col items-center justify-center bg-white gap-4">
      <p className="text-4xl font-bold">{count}</p>
      <button 
        onClick={() => setCount(c => c + 1)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        +1
      </button>
    </div>
  );
};
```

### Lien externe (iframe)

```jsx
// Pas besoin de composant pour les URLs externes
const apps = [
  {
    id: 'google',
    name: 'Google',
    icon: '/icons/explorer.png',
    url: 'https://google.com',
    defaultWidth: 900,
    defaultHeight: 600,
  },
];
```

### Application cachée (pas sur le bureau)

```jsx
const apps = [
  { 
    ...MonApp.config, 
    component: MonApp.Component,
    showOnDesktop: false,  // N'apparaît pas sur le bureau
    showInStartMenu: true, // Mais visible dans le menu démarrer
  },
];
```

## 🗑️ Supprimer une application

1. Supprimez le dossier de l'app dans `src/apps/`
2. Retirez l'import et l'entrée correspondante dans `src/apps/index.js`

## ✏️ Modifier une application

Modifiez simplement le fichier `index.jsx` de l'application concernée. Les changements seront automatiquement pris en compte.

## 🎨 Styles personnalisés

Vous pouvez utiliser Tailwind CSS dans vos composants. Le contenu de l'app doit remplir tout l'espace disponible avec `h-full`.

### Template de base avec toolbar XP

```jsx
export const Component = () => {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Toolbar style XP */}
      <div className="bg-gradient-to-b from-[#ece9d8] to-[#d4d0c8] border-b border-[#808080] px-2 py-1 flex gap-4 text-xs">
        <span className="text-gray-600 hover:underline cursor-pointer">Fichier</span>
        <span className="text-gray-600 hover:underline cursor-pointer">Édition</span>
        <span className="text-gray-600 hover:underline cursor-pointer">?</span>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 overflow-auto p-4">
        {/* Votre contenu ici */}
      </div>

      {/* Barre de statut */}
      <div className="bg-[#ece9d8] border-t border-[#808080] px-2 py-1 text-[10px] text-gray-600">
        Prêt
      </div>
    </div>
  );
};
```

## 🔧 API du Registry

Le registry est accessible via :

```jsx
import appRegistry from '../core/AppRegistry';

// Récupérer une app par ID
const app = appRegistry.get('mon-app');

// Récupérer toutes les apps
const allApps = appRegistry.getAll();

// Apps du bureau uniquement
const desktopApps = appRegistry.getDesktopApps();

// Apps du menu démarrer
const menuApps = appRegistry.getStartMenuApps();

// Vérifier si une app existe
const exists = appRegistry.has('mon-app');
```

## 🚀 Principes SOLID appliqués

- **S**ingle Responsibility : Chaque app gère uniquement son propre contenu
- **O**pen/Closed : Ajoutez des apps sans modifier le code existant
- **L**iskov Substitution : Toutes les apps sont interchangeables
- **I**nterface Segregation : Config minimale requise, options étendues facultatives
- **D**ependency Inversion : Les composants dépendent du registry, pas des implémentations
